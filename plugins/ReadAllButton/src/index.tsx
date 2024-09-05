import type React from "react";
import { common, i18n } from "replugged";
import ReadAllButton from "./components/ReadAllButton";
import Settings from "./components/Settings";
import translations from "./i18n";
import { cfg } from "./settings";

const {
  i18n: { Messages },
  toast,
} = common;

let stopped = false;

export function _renderReadAllButton(): React.ReactNode {
  return stopped ? null : <ReadAllButton />;
}

export function showClearedToast(readTypeString?: string): void {
  if (!cfg.get("toasts")) return;

  const message = readTypeString
    ? Messages.READALLBUTTON_CLEARED_TOAST.format({ type: readTypeString })
    : Messages.READALLBUTTON_CLEARED_EVERYTHING_TOAST;
  toast.toast(message, toast.Kind.SUCCESS);
}

export { Settings, cfg };

export function start(): void {
  i18n.loadAllStrings(translations);

  stopped = false;
}

export function stop(): void {
  stopped = true;
}
