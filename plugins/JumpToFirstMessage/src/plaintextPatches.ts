import type { PlaintextPatch } from "replugged/types";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.JumpToFirstMessage")`;

export default [
  {
    find: "navigationDescription",
    replacements: [
      {
        match: /(group-spacing.+?children:\[)/,
        replace: (_, prefix) => `${prefix}${pluginExports}?._renderJumpToTopBar(arguments[0]),`,
      },
    ],
  },
] as PlaintextPatch[];
