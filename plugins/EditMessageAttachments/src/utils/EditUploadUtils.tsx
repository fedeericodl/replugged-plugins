import UploadAttachmentActionCreators from "@common/actions/UploadAttachmentActionCreators";
import type { CloudUpload as CloudUploadType } from "@common/lib/uploader/CloudUpload";
import CloudUploader from "@common/lib/uploader/CloudUploader";
import UploadAttachmentStore, { DraftType } from "@common/stores/UploadAttachmentStore";
import type { Message } from "discord-types/general";
import { common } from "replugged";
import type { EditedMessageData } from "../types";

const { constants, fluxDispatcher: Dispatcher, messages } = common;

export function uploadNewFiles(
  data: EditedMessageData,
  originalFunction: (response: Record<string, unknown>) => void,
): void {
  const files = UploadAttachmentStore.getUploads(data.channelId, DraftType.EditedChannelMessage);
  const message = messages.getMessage(data.channelId, data.messageId);
  _uploadFiles(data, message, files, originalFunction);
}

function _uploadFiles(
  data: EditedMessageData,
  message: Message | undefined,
  files: CloudUploadType[],
  originalFunction?: (response: Record<string, unknown>) => void,
): void {
  const { channelId, messageId } = data;

  const url = (constants.Endpoints.MESSAGE as (channelId: string, messageId: string) => string)(
    channelId,
    messageId,
  );
  const cloudUploader = new CloudUploader(url, "PATCH");

  function runOriginalFunction(response: Record<string, unknown>): void {
    const patchedResponse = { body: response };
    if (originalFunction) originalFunction(patchedResponse);
  }

  cloudUploader.on("start", (file) => {
    Dispatcher.dispatch({
      type: "UPLOAD_START",
      channelId,
      file,
      message,
      uploader: cloudUploader,
    });
  });
  cloudUploader.on("progress", (file) => {
    Dispatcher.dispatch({
      type: "UPLOAD_PROGRESS",
      channelId,
      file,
    });
  });
  cloudUploader.on("error", (file, __, response: Record<string, unknown>) => {
    Dispatcher.dispatch({
      type: "UPLOAD_FAIL",
      channelId,
      file,
      messageRecord: message,
    });

    runOriginalFunction(response);
  });
  cloudUploader.on("complete", (file, response: Record<string, unknown>) => {
    Dispatcher.dispatch({
      type: "UPLOAD_COMPLETE",
      channelId,
      file,
      aborted: cloudUploader._aborted,
    });

    runOriginalFunction(response);
  });

  void cloudUploader.uploadFiles(
    files,
    { ...data, attachments: message?.attachments },
    { addFilesTo: "attachments" },
  );

  UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
}
