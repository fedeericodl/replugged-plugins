import type { CloudUpload } from "@common/lib/uploader/CloudUpload";
import type { DraftType } from "@common/stores/UploadAttachmentStore";
import type React from "react";
import { webpack } from "replugged";

export enum AttachmentListItemSizes {
  SMALL,
  MEDIUM,
}

interface ClipMetadata {
  applicationId?: string;
  applicationName: string;
  clipMethod: "auto" | "manual";
  editMetadata?: {
    applicationAudio: boolean;
    end: number;
    start: number;
    voiceAudio: boolean;
  };
  filepath: string;
  gameName?: string;
  id: string;
  length: number;
  name?: string;
  thumbnail: string;
  users: string[];
  version?: number;
}

interface ChannelAttachmentUploadProps {
  canEdit?: boolean;
  channelId: string;
  clip?: ClipMetadata;
  draftType: DraftType;
  hideFileName?: boolean;
  keyboardModeEnabled?: boolean;
  label?: string;
  size?: AttachmentListItemSizes;
  upload: CloudUpload;
}

export type ChannelAttachmentUploadType = React.FC<ChannelAttachmentUploadProps>;

const channelAttachmentUploadStr = ".filenameContainer";

export default await webpack
  .waitForModule(webpack.filters.bySource(channelAttachmentUploadStr))
  .then(
    (mod) =>
      webpack.getFunctionBySource<ChannelAttachmentUploadType>(mod, channelAttachmentUploadStr)!,
  );
