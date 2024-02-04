import type { Channel, Message } from "discord-types/general";
import type React from "react";

interface Emoji {
  allNamesString: string;
  animated?: boolean;
  available?: boolean;
  guildId: string;
  id: string;
  managed?: boolean;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  require_colons?: boolean;
  roles?: string[];
  url: string;
}

interface ParsedMessage {
  content: string;
  invalidEmojis?: Emoji[];
  tts?: boolean;
  validNonShortcutEmojis: Emoji[];
}

interface ValidateEditOptions {
  channel: Channel;
  value: string;
}

interface ValidateEditResponse {
  failureReason?: string;
  valid: boolean;
}

export interface RichValue {
  children: Array<{ text: string }>;
  type: string;
}

interface MessageEditorInnerProps {
  message: Message;
  onChange: (unknown: null, value: string, richValue: RichValue[]) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  onSubmit: (value: string) => void;
  richValue: RichValue[];
  textValue: string;
}

export interface MessageEditorProps {
  channel: Channel;
  children: (props: MessageEditorInnerProps) => React.ReactElement;
  className?: string;
  message: Message;
  onCancel: (channelId: string, response?: Record<string, unknown>) => void;
  onChange: (channelId: string, value: string, richValue: RichValue[]) => void;
  onConfirmDelete: (channel: Channel, message: Message, showContextMenuHint?: boolean) => void;
  richValue: RichValue[];
  saveMessage: (channelId: string, messageId: string, message: ParsedMessage) => Promise<void>;
  textValue: string;
  validateEdit: (options: ValidateEditOptions) => ValidateEditResponse;
}
