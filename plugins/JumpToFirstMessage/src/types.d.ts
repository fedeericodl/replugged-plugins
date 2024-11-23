import type { UploaderBaseFile } from "@common/lib/uploader/UploaderBase";
import type { Channel, Message } from "discord-types/general";
import type { ChannelMessages } from "replugged/dist/renderer/modules/common/messages";

type ChannelStreamTypes =
  | "MESSAGE"
  | "MESSAGE_GROUP_BLOCKED"
  | "MESSAGE_GROUP_IGNORED"
  | "MESSAGE_GROUP_SPAMMER"
  | "THREAD_STARTER_MESSAGE"
  | "DIVIDER"
  | "JUMP_TARGET"
  | "FORUM_POST_ACTION_BAR"
  | "MESSAGE_GROUP"
  | "DIVIDER_TIME_STAMP"
  | "DIVIDER_NEW_MESSAGES";

interface ChannelStream {
  content?: string | Message;
  contentKey?: string;
  flashKey?: string;
  groupId?: string;
  isSummaryDivider?: boolean;
  jumpTarget?: boolean;
  key?: string;
  type: ChannelStreamTypes;
  unreadId?: string;
}

export interface MessagesProps {
  canChat?: boolean;
  channel: Channel;
  channelStream: ChannelStream[];
  className?: string;
  editingMessageId: string | undefined;
  filterAfterTimestamp: number | undefined;
  fontSize: number;
  hasUnreads: boolean;
  hideSummaries?: boolean;
  jumpBarClassName?: string;
  keyboardModeEnabled: boolean;
  messageDisplayCompact: boolean;
  messageGroupSpacing: number;
  messages: ChannelMessages;
  permissionVersion?: number;
  scrollerClassName?: string;
  showingQuarantineBanner: boolean;
  showNewMessagesBar: boolean;
  unreadCount: number;
  uploads: UploaderBaseFile[];
}
