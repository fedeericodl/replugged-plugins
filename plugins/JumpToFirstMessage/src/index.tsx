import type React from "react";
import { i18n } from "replugged";
import JumpToTopBar from "./components/JumpToTopBar";
import Settings from "./components/Settings";
import { cfg } from "./settings";
import type { MessagesProps } from "./types";

let stopped = false;

export function _renderJumpToTopBar(props: MessagesProps): React.ReactNode {
  const { channel, messages, unreadCount } = props;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!channel || !messages) return null;

  const threadsOnly = cfg.get("threadsOnly");
  if (threadsOnly && !channel.isThread()) return null;

  return stopped ? null : (
    <JumpToTopBar channel={channel} messages={messages} unreadCount={unreadCount} />
  );
}

export { cfg, Settings };

export function start(): void {
  void i18n.addRepluggedStrings();

  stopped = false;
}

export function stop(): void {
  stopped = true;
}
