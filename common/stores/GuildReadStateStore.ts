import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

interface GuildReadState {
  mentionCount: number;
  mentionCounts: Record<string, number>;
  ncMentionCount: number;
  sentinel: number;
  unread: boolean;
  unreadByType: Record<number, boolean>;
  unreadChannelId: string | null;
}

interface Snapshot {
  data: { guilds: Record<string, GuildReadState>; unreadGuilds: string[] };
  version: number;
}

export declare class GuildReadStateStore extends Flux.SnapshotStore<Snapshot> {
  public getGuildChangeSentinel: (guildId: string) => number;
  public getGuildHasUnreadIgnoreMuted: (guildId: string) => boolean;
  public getMentionCount: (guildId: string) => number;
  public getMentionCountForChannels: (guildId: string, channelIds: string[]) => void;
  public getMutableGuildReadState: (guildId: string) => GuildReadState;
  public getMutableGuildStates: () => Record<string, GuildReadState>;
  public getMutableUnreadGuilds: () => Set<string>;
  public getPrivateChannelMentionCount: () => number;
  public getStoreChangeSentinel: () => number;
  public getTotalMentionCount: (guildId: string) => number;
  public getTotalNotificationsMentionCount: (guildId: string) => number;
  public hasAnyUnread: () => boolean;
  public hasUnread: (guildId: string) => boolean;
  public loadCache: () => void;
  public takeSnapshot: () => Snapshot;
}

export default webpack.getByStoreName<GuildReadStateStore>("GuildReadStateStore")!;
