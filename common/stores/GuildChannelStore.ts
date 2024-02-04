import type { Channel } from "discord-types/general";
import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

interface ChannelListItem {
  channel: Channel;
  comparator: number;
}

type ChannelType = "SELECTABLE" | "VOCAL" | "4";

interface ChannelList {
  ["4"]: ChannelListItem[];
  count: number;
  id: string;
  SELECTABLE: ChannelListItem[];
  VOCAL: ChannelListItem[];
}
export declare class GuildChannelStore extends Flux.Store {
  public getAllGuilds: () => Record<string, ChannelList>;
  public getChannels: (guildId: string | null) => ChannelList;
  public getDefaultChannel: (
    guildId: string | null,
    isVocal?: boolean,
    permission?: bigint,
  ) => Channel | null;
  public getDirectoryChannelIds: (guildId: string) => string[];
  public getFirstChannel: (
    guildId: string | null,
    predicate: ChannelListItem[]["find"],
    isVocal?: boolean,
  ) => Channel | null;
  public getFirstChannelOfType: (
    guildId: string | null,
    predicate: ChannelListItem[]["find"],
    type: ChannelType,
  ) => Channel | null;
  public getSelectableChannelIds: (guildId: string | null) => string[];
  public getSelectableChannels: (guildId: string | null) => ChannelListItem[];
  public getSFWDefaultChannel: (
    guildId: string | null,
    isVocal?: boolean,
    permission?: bigint,
  ) => Channel | null;
  public getTextChannelNameDisambiguations: (
    guildId: string | null,
  ) => Record<string, Extract<Channel, "id" | "name">>;
  public getVocalChannelIds: (guildId: string | null) => string[];
  public hasCategories: (guildId: string | null) => boolean;
  public hasChannels: (guildId: string | null) => boolean;
  public hasElevatedPermissions: (guildId: string) => boolean;
  public hasSelectableChannel: (guildId: string | null, channelId: string) => boolean;
}

export default webpack.getByStoreName<GuildChannelStore>("GuildChannelStore")!;
