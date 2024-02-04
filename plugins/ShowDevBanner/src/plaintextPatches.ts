import type { PlaintextPatch } from "replugged/types";

export default [
  {
    find: "isHideDevBanner",
    replacements: [
      {
        match: "window.GLOBAL_ENV.RELEASE_CHANNEL",
        replace: '"staging"',
      },
    ],
  },
] as PlaintextPatch[];
