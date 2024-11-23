import type React from "react";
import { common, i18n } from "replugged";
import ReadAllButton from "./components/ReadAllButton";
import Settings from "./components/Settings";
import t from "./i18n/en-US.messages";
import { cfg } from "./settings";

const {
  i18n: { intl },
  toast,
} = common;

let stopped = false;

export function _renderReadAllButton(): React.ReactNode {
  return stopped ? null : <ReadAllButton />;
}

export function showClearedToast(readTypeString?: string): void {
  if (!cfg.get("toasts")) return;

  const message = readTypeString
    ? intl.formatToPlainString(t.READALLBUTTON_CLEARED_TOAST, { type: readTypeString })
    : intl.string(t.READALLBUTTON_CLEARED_EVERYTHING_TOAST);
  toast.toast(message, toast.Kind.SUCCESS);
}

export { cfg, Settings };

export function start(): void {
  void i18n.addRepluggedStrings();

  stopped = false;
}

export function stop(): void {
  stopped = true;
}
