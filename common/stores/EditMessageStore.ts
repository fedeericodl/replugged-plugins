import type { RichValue } from "@common/types";
import type { Message } from "discord-types/general";
import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

export declare class EditMessageStore extends Flux.Store {
  public getEditActionSource: (channelId: string) => string | undefined;
  public getEditingMessage: (channelId: string) => Message | null;
  public getEditingMessageId: (channelId: string) => string | undefined;
  public getEditingRichValue: (channelId: string) => RichValue[] | undefined;
  public getEditingTextValue: (channelId: string) => string | undefined;
  public isEditing: (channelId: string, messageId: string) => boolean;
  public isEditingAny: (channelId: string) => boolean;
}

export default webpack.getByStoreName<EditMessageStore>("EditMessageStore")!;
