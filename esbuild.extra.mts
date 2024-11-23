import type { BuildOptions } from "esbuild";
import intlLoader from "./scripts/intl-loader.mjs";
import intlTypeGenerator from "./scripts/intl-type-generator.mjs";

export default ({ plugins, ...config }: BuildOptions) => {
  return {
    ...config,
    plugins: [...(plugins ?? []), intlTypeGenerator, intlLoader],
  };
};
