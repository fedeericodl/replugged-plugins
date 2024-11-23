import ReadStateStore from "@common/stores/ReadStateStore";
import classNames from "classnames";
import type React from "react";
import { common, components } from "replugged";
import { cfg } from "../settings";
import type { MessagesProps } from "../types";
import DoubleDownArrow from "./DoubleDownArrow";

import "./JumpToTopBar.css";

const {
  i18n: { intl, t: discordT },
  messages,
} = common;
const { Clickable, ErrorBoundary, Loader: Spinner } = components;

type JumpToTopBarProps = Pick<MessagesProps, "channel" | "messages" | "unreadCount">;

function JumpToTopBar(props: JumpToTopBarProps): React.ReactElement | null {
  const { channel, messages: channelMessages, unreadCount } = props;
  const { jumpTargetId, loadingMore } = channelMessages;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const unreadMessageId = ReadStateStore?.getOldestUnreadMessageId(channel.id) ?? "0";

  const jumpTargetIsFirstMessage = jumpTargetId === channel.id;
  const jumpTargetIsUnreadMessage = jumpTargetId === unreadMessageId;
  const canShow =
    // @ts-expect-error discord-types is terribly outdated
    channelMessages.hasFetched && channelMessages.hasMoreBefore && !channel.isForumPost();

  const align = cfg.get("align");

  return canShow ? (
    <div
      className={classNames(
        "jumpToFirstMessage-container",
        { containerMarginTop: unreadCount > 0 },
        { [align]: align },
      )}>
      <Clickable
        aria-label={intl.string(discordT.JUMP_TO_TOP)}
        className="jumpToFirstMessage-navigator"
        onClick={() => {
          const jumpToUnread = cfg.get("jumpToUnread");
          const messageIdUnread = jumpTargetIsUnreadMessage ? channel.id : unreadMessageId;
          const messageId = jumpToUnread ? messageIdUnread : channel.id;

          void messages.jumpToMessage({
            channelId: channel.id,
            messageId,
          });
        }}>
        <div className="jumpToFirstMessage-button">
          {loadingMore && (jumpTargetIsFirstMessage || jumpTargetIsUnreadMessage) ? (
            <Spinner
              type={Spinner.Type.SPINNING_CIRCLE}
              className="jumpToFirstMessage-jumpSpinner"
            />
          ) : (
            <DoubleDownArrow className="jumpToFirstMessage-icon" />
          )}
        </div>
      </Clickable>
    </div>
  ) : null;
}

export default (props: JumpToTopBarProps): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<></>}>
      <JumpToTopBar {...props} />
    </ErrorBoundary>
  );
};
