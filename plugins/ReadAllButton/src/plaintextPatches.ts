import type { PlaintextPatch } from "replugged/types";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.ReadAllButton")`;

export default [
  {
    find: "guildsnav",
    replacements: [
      {
        match: /isCurrentUserGuest.{25,100}?\(\w+\.Fragment,{children:\[.+?\),/,
        replace: `$&${pluginExports}?._renderReadAllButton(),`,
      },
    ],
  },
] as PlaintextPatch[];
