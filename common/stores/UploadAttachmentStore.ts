import type { CloudUpload } from "@common/types";
import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

export enum DraftType {
  /** Custom DraftType for EditMessageAttachments. Negative value to avoid possible conflicts. */
  EditedChannelMessage = -1,

  ChannelMessage,
  ThreadSettings,
  FirstThreadMessage,
  ApplicationLauncherCommand,
}

export declare class UploadAttachmentStore extends Flux.Store {
  public findUpload: (
    channelId: string,
    draftType: DraftType,
    finder: CloudUpload[]["find"],
  ) => CloudUpload | undefined;
  public getFirstUpload: (channelId: string, draftType: DraftType) => CloudUpload | null;
  public getUpload: (
    channelId: string,
    uploadId: string,
    draftType: DraftType,
  ) => CloudUpload | undefined;
  public getUploadCount: (channelId: string, draftType: DraftType) => number;
  public getUploads: (channelId: string, draftType: DraftType) => CloudUpload[];
  public hasAdditionalUploads: (channelId: string, draftType: DraftType) => boolean;
}

export default webpack.getByStoreName<UploadAttachmentStore>("UploadAttachmentStore")!;
