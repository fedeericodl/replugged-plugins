import UploadAttachmentActionCreators from "@common/actions/UploadAttachmentActionCreators";
import EditMessageStore from "@common/stores/EditMessageStore";
import UploadAttachmentStore, { DraftType } from "@common/stores/UploadAttachmentStore";
import type { MessageEditorProps } from "@common/types";
import UploaderUtils from "@common/utils/UploaderUtils";
import type React from "react";
import { Injector, Logger, common, i18n, webpack } from "replugged";
import EditComposerAttachments from "./components/EditComposerAttachments";
import Settings from "./components/Settings";
import translations from "./i18n";
import { cfg } from "./settings";
import type { ChannelTextAreaContainerType, ChatInputType, EditedMessageData } from "./types";
import { uploadNewFiles } from "./utils/EditUploadUtils";

const { messages } = common;

let stopped = false;

export const logger = new Logger("Plugin", "EditMessageAttachments");
export const inject = new Injector();

export function _renderEditComposerAttachments(props: MessageEditorProps): React.ReactNode {
  const { channel, message } = props;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!channel || !message) return null;

  return stopped ? null : <EditComposerAttachments channel={channel} message={message} />;
}

export function _checkIsInEditor(channelId: string): boolean {
  if (!channelId) return false;
  return stopped ? false : EditMessageStore.isEditingAny(channelId);
}

export function _checkHasUploads(channelId: string): boolean {
  if (!channelId) return false;

  const uploadCount = UploadAttachmentStore.getUploadCount(
    channelId,
    DraftType.EditedChannelMessage,
  );
  return stopped ? false : uploadCount > 0;
}

export function _clearUploads(channelId: string): void {
  if (!cfg.get("clearOnCancel")) return;
  if (channelId && !stopped)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
}

export function _patchEditMessageAction(
  data: EditedMessageData,
  originalFunction: (response: Record<string, unknown>) => void,
): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!data) return;
  uploadNewFiles(data, originalFunction);
}

async function patchChannelTextAreaContainer(): Promise<void> {
  const ChannelTextAreaContainer = await webpack.waitForModule<ChannelTextAreaContainerType>(
    webpack.filters.bySource(/renderApplicationCommandIcon:\w+,pendingReply:\w+/),
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!ChannelTextAreaContainer) {
    logger.error("Failed to find ChannelTextAreaContainer");
    return;
  }

  // Enable sending an empty message and pasting files while editing
  inject.before(ChannelTextAreaContainer.type, "render", ([props]) => {
    // We don't need to listen to store changes, it re-renders pretty much constantly
    const isEditing = EditMessageStore.isEditingAny(props.channel.id);
    if (isEditing && props.type.submit && props.type.analyticsName === "edit") {
      props.type.submit.allowEmptyMessage = true;
      props.promptToUpload ||= UploaderUtils.promptToUpload;
    }
  });
}

function patchStartEditMessageAction(): void {
  inject.after(messages, "startEditMessage", ([channelId]) => {
    if (!cfg.get("clearOnCancel")) return;
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
  });
}

async function patchEditChatInputType(stop?: boolean): Promise<void> {
  const mod = await webpack.waitForModule<Record<string, Record<string, ChatInputType>>>(
    webpack.filters.bySource(`analyticsName:"edit"`),
  );
  const ChatInputTypes = Object.values(mod).find((v) => "EDIT" in v);
  if (!ChatInputTypes) {
    logger.error("Failed to find ChatInputTypes");
    return;
  }

  ChatInputTypes.EDIT.drafts.type = stop
    ? DraftType.ChannelMessage
    : DraftType.EditedChannelMessage;
}

export { Settings, cfg };

export async function start(): Promise<void> {
  i18n.loadAllStrings(translations);

  await patchChannelTextAreaContainer();
  patchStartEditMessageAction();
  await patchEditChatInputType();

  stopped = false;
}

export async function stop(): Promise<void> {
  inject.uninjectAll();
  await patchEditChatInputType(true);

  stopped = true;
}
