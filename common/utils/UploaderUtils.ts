import type { DraftType } from "@common/stores/UploadAttachmentStore";
import type { Channel } from "discord-types/general";
import { webpack } from "replugged";

interface PromptToUploadOptions {
  isClip?: boolean;
  isThumbnail?: boolean;
  requireConfirm?: boolean;
  showLargeMessageDialog?: boolean;
}

interface UploaderUtils {
  promptToUpload: (
    files: FileList | null,
    channel: Channel,
    draftType: DraftType,
    options?: PromptToUploadOptions,
  ) => boolean;
  showUploadFileSizeExceededError: (channel: Channel, files: FileList | null) => boolean;
}

const mod = await webpack.waitForModule(webpack.filters.bySource(/MAX_SIZE_ERROR,\w+mimetypes/));

export default {
  promptToUpload: webpack.getFunctionBySource(
    mod,
    "Unexpected mismatch between files and file metadata",
  ),
  showUploadFileSizeExceededError: webpack.getFunctionBySource(
    mod,
    ".UPLOAD_ATTACHMENT_MAX_SIZE_ERROR",
  ),
} as UploaderUtils;
