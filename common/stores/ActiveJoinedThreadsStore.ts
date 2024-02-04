import type { Channel } from "discord-types/general";
import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

interface ActiveJoinedThread {
  channel: Channel;
  joinTimestamp: number;
}

export declare class ActiveJoinedThreadsStore extends Flux.Store {
  public computeAllActiveJoinedThreads: (guildId: string) => Channel[];
  public getActiveJoinedRelevantThreadsForGuild: (
    guildId: string,
  ) => Record<string, Record<string, ActiveJoinedThread>>;
  public getActiveJoinedRelevantThreadsForParent: (
    guildId: string,
    channelId: string,
  ) => Record<string, ActiveJoinedThread>;
  public getActiveJoinedThreadsForGuild: (
    guildId: string,
  ) => Record<string, Record<string, ActiveJoinedThread>>;
  public getActiveJoinedThreadsForParent: (
    guildId: string,
    channelId: string,
  ) => Record<string, ActiveJoinedThread>;
  public getActiveJoinedUnreadThreadsForGuild: (
    guildId: string,
  ) => Record<string, Record<string, ActiveJoinedThread>>;
  public getActiveJoinedUnreadThreadsForParent: (
    guildId: string,
    channelId: string,
  ) => Record<string, ActiveJoinedThread>;
  public getActiveThreadCount: (guildId: string, channelId: string) => number;
  public getActiveUnjoinedThreadsForGuild: (
    guildId: string,
  ) => Record<string, Record<string, Channel>>;
  public getActiveUnjoinedThreadsForParent: (
    guildId: string,
    channelId: string,
  ) => Record<string, Channel>;
  public getActiveUnjoinedUnreadThreadsForGuild: (
    guildId: string,
  ) => Record<string, Record<string, Channel>>;
  public getActiveUnjoinedUnreadThreadsForParent: (
    guildId: string,
    channelId: string,
  ) => Record<string, Channel>;
  public getNewThreadCount: (guildId: string, channelId: string) => number;
  public getNewThreadCountsForGuild: (guildId: string) => Record<string, number>;
  public hasActiveJoinedUnreadThreads: (guildId: string, channelId: string) => boolean;
}

export default webpack.getByStoreName<ActiveJoinedThreadsStore>("ActiveJoinedThreadsStore")!;
