import FileInput, { type FileInput as FileInputType } from "@common/components/FileInput";
import ImagePlusIcon from "@common/components/icons/ImagePlusIcon";
import ChannelStore from "@common/stores/ChannelStore";
import UploadAttachmentStore, { DraftType } from "@common/stores/UploadAttachmentStore";
import UploaderUtils from "@common/utils/UploaderUtils";
import { common, components } from "replugged";
import { logger } from "..";
import { MAX_UPLOAD_COUNT } from "../constants";

import "./ComposerUploadButton.css";
import type { DragEvent } from "react";

const { flux: Flux, i18n, modal, React } = common;
const { Clickable } = components;

interface ComposerUploadButtonProps {
  attachmentsCount: number;
  channelId: string;
}

export default (props: ComposerUploadButtonProps): React.ReactElement | null => {
  const { attachmentsCount, channelId } = props;

  const ref = React.useRef<(FileInputType & Element) | null>(null);

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () =>
    UploadAttachmentStore.getUploadCount(channelId, DraftType.EditedChannelMessage),
  );

  const channel = Flux.useStateFromStores(
    [ChannelStore],
    () => ChannelStore.getChannel(channelId),
    [channelId],
  );
  const [dragHover, setDragHover] = React.useState(false);
  const dndRef = React.useRef<HTMLSpanElement | null>(null);
  const dragover = React.useCallback(() => {
    setDragHover(true);
  }, []);
  const dragleave = React.useCallback(() => {
    setDragHover(false);
  }, []);
  const drop = React.useCallback((event: React.DragEvent<HTMLSpanElement>) => {
    setDragHover(false);
    if (!channel) return;
    const count = event?.dataTransfer?.files?.length ?? 0;
    if (attachmentsCount + count + uploadsCount > MAX_UPLOAD_COUNT) {
      modal.alert({
        title: i18n.Messages.ATTACHMENT_TOO_MANY_ERROR_TITLE,
        body: i18n.Messages.ATTACHMENT_TOO_MANY_ERROR_MESSAGE.format({
          limit: MAX_UPLOAD_COUNT,
        }),
      });
      return;
    }

    UploaderUtils.promptToUpload(
      event?.dataTransfer?.files,
      channel,
      DraftType.EditedChannelMessage,
      {
        requireConfirm: true,
        showLargeMessageDialog: false,
      },
    );
  }, []);

  React.useEffect(() => {
    if (!dndRef.current) return;
    dndRef.current.addEventListener("dragover", dragover, false);
    dndRef.current.addEventListener("dragleave", dragleave, false);
    dndRef.current.addEventListener("drop", drop, false);
    return () => {
      if (!dndRef.current) return;
      dndRef.current.removeEventListener("dragover", dragover, false);
      dndRef.current.removeEventListener("dragleave", dragleave, false);
      dndRef.current.removeEventListener("drop", drop, false);
    };
  }, []);

  if (!channel) {
    logger.error("Channel is null", channelId);
    return null;
  }

  return (
    <span ref={dndRef} className={dragHover ? "editMessageAttachments-uploadInput-dragHover" : ""}>
      <Clickable
        className="editMessageAttachments-uploadInput"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (ref.current) ref.current.activateUploadDialogue();
          }
        }}>
        <FileInput
          ref={ref}
          onChange={(event) => {
            const count = event.currentTarget.files?.length ?? 0;
            if (attachmentsCount + count + uploadsCount > MAX_UPLOAD_COUNT) {
              modal.alert({
                title: i18n.Messages.ATTACHMENT_TOO_MANY_ERROR_TITLE,
                body: i18n.Messages.ATTACHMENT_TOO_MANY_ERROR_MESSAGE.format({
                  limit: MAX_UPLOAD_COUNT,
                }),
              });
              return;
            }

            UploaderUtils.promptToUpload(
              event.currentTarget.files,
              channel,
              DraftType.EditedChannelMessage,
              {
                requireConfirm: true,
                showLargeMessageDialog: false,
              },
            );

            event.currentTarget.value = "";
          }}
          disabled={attachmentsCount + uploadsCount >= MAX_UPLOAD_COUNT}
          multiple={channel.rateLimitPerUser <= 0}
          tabIndex={-1}
          aria-hidden
        />
        <ImagePlusIcon
          className="editMessageAttachments-uploadIcon"
          color="currentColor"
          width={28}
          height={28}
        />
      </Clickable>
    </span>
  );
};
