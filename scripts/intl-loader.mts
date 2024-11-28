import {
  MessageDefinitionsTransformer,
  findAllMessagesFiles,
  getLocaleFromTranslationsFileName,
  isMessageDefinitionsFile,
  isMessageTranslationsFile,
  precompileFileForLocale,
  processAllMessagesFiles,
  processDefinitionsFile,
  processTranslationsFile,
} from "@discord/intl-loader-core";
import type { Plugin } from "esbuild";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";

const FILE_PATH_SEPARATOR_MATCH = /[\\\\\\/]/g;
const INTL_MESSAGES_REGEXP = /\.messages\.(js|json|jsona)$/;

export function makePosixRelativePath(source: string, file: string): string {
  return `./${relative(dirname(source), file).replace(FILE_PATH_SEPARATOR_MATCH, posix.sep)}`;
}

function getPluginName(filePath: string): string | null {
  const parts = filePath.split(sep);
  const pluginsIndex = parts.indexOf("plugins");
  if (pluginsIndex !== -1 && pluginsIndex + 1 < parts.length) {
    return parts[pluginsIndex + 1];
  }
  return null;
}

let hasInitializedAllDefinitions = false;
let messageKeys: Map<string, Record<string, string>> = new Map();

/**
 * Rewritten for esbuild. 1:1 copy of the original plugin, adapted for Replugged (doesn't hash keys).
 * @link https://github.com/discord/discord-intl
 * @copyright 2024 Discord, Inc.
 * @license MIT
 */
export default {
  name: "intlLoader",
  setup(build) {
    build.onLoad({ filter: INTL_MESSAGES_REGEXP }, (args) => {
      const sourcePath = args.path;
      const source = readFileSync(sourcePath, "utf-8");
      const forceTranslation = args.suffix === "?forceTranslation";

      let i18nPath = dirname(sourcePath);
      while (i18nPath && !existsSync(join(i18nPath, "translations"))) {
        const parentDir = dirname(i18nPath);
        if (parentDir === i18nPath) break;
        i18nPath = parentDir;
      }

      const pluginName = getPluginName(sourcePath);
      if (!pluginName) {
        throw new Error("Could not determine plugin name from file path");
      }

      if (!hasInitializedAllDefinitions) {
        processAllMessagesFiles(findAllMessagesFiles([i18nPath]));
        hasInitializedAllDefinitions = true;
      }

      if (isMessageDefinitionsFile(sourcePath) && !forceTranslation) {
        const result = processDefinitionsFile(sourcePath, source, { locale: "en-US" });

        result.translationsLocaleMap[result.locale] = `${sourcePath}?forceTranslation`;
        for (const locale in result.translationsLocaleMap) {
          result.translationsLocaleMap[locale] = makePosixRelativePath(
            sourcePath,
            result.translationsLocaleMap[locale] ?? "",
          );
        }

        if (pluginName && !messageKeys.has(pluginName)) {
          messageKeys.set(pluginName, result.messageKeys);
        }

        const transformedOutput = new MessageDefinitionsTransformer({
          messageKeys: Object.fromEntries(
            Object.entries(result.messageKeys).map(([, key]) => [key, key]),
          ),
          localeMap: result.translationsLocaleMap,
          defaultLocale: result.locale,
          getTranslationImport: (importPath) => `import("${importPath}")`,
          debug: false,
          preGenerateBinds: false,
          getPrelude: () => `import {webpack} from 'replugged';`,
        }).getOutput();

        return {
          contents: transformedOutput.replace(
            /require\('@discord\/intl'\);/,
            "await webpack.waitForProps('createLoader','IntlManager');",
          ),
          loader: "js",
        };
      } else {
        const locale = forceTranslation ? "en-US" : getLocaleFromTranslationsFileName(sourcePath);
        if (isMessageTranslationsFile(sourcePath)) {
          processTranslationsFile(sourcePath, source, { locale });
        } else if (forceTranslation) {
        } else {
          throw new Error(
            "Expected a translation file or the `forceTranslation` query parameter on this import, but none was found",
          );
        }

        // eslint-disable-next-line no-undefined
        const compiledResult = precompileFileForLocale(sourcePath, locale, undefined, {
          format: 1,
          bundleSecrets: false,
        });
        const patchedResult = compiledResult
          ? Object.fromEntries(
              Object.entries(JSON.parse(compiledResult?.toString() ?? "{}")).map(
                ([hash, string]) => [messageKeys.get(pluginName)?.[hash] ?? "undefined", string],
              ),
            )
          : {};

        return {
          contents: `export default JSON.parse(\`${JSON.stringify(patchedResult).replace(/\\/g, "\\\\")}\`)`,
          loader: "js",
        };
      }
    });
  },
} as Plugin;
