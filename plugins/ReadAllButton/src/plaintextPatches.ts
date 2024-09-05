import type { PlaintextPatch } from "replugged/types";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.ReadAllButton")`;

export default [
  {
    find: ".GUILDS_BAR_A11Y_LABEL",
    replacements: [
      {
        match: /onScroll:\w+\.handleScroll,children:\[.+?\),/,
        replace: `$&${pluginExports}?._renderReadAllButton(),`,
      },
    ],
  },
] as PlaintextPatch[];
