import type { Channel, Guild } from "discord-types/general";
import { webpack } from "replugged";

interface ChannelSummariesExperiment {
  canGuildUseConversationSummaries: (guild: Guild, checkIfIsEnabled?: boolean) => boolean;
  canSeeChannelSummaries: (
    channel: Channel,
    ignoreChannelSettings?: boolean,
    checkIfIsEnabled?: boolean,
  ) => boolean;
  channelEligibleForSummaries: (channel: Channel) => boolean;
  useChannelSummariesExperiment: (
    channel: Channel,
    track?: boolean,
    ignoreChannelSettings?: boolean,
  ) => boolean;
}

const mod = await webpack.waitForModule(
  webpack.filters.bySource(/\.hasFeature\(\w+\.\w+\.SUMMARIES_ENABLED_GA\)/),
);

export default {
  canGuildUseConversationSummaries: webpack.getFunctionBySource(mod, "SUMMARIES_ENABLED_BY_USER"),
  canSeeChannelSummaries: webpack.getFunctionBySource(mod, "SUMMARIES_DISABLED"),
  channelEligibleForSummaries: webpack.getFunctionBySource(mod, /return \w\(\w,!/),
  useChannelSummariesExperiment: webpack.getFunctionBySource(
    mod,
    /arguments\[2];return \w+\(\w+,\w+\)/,
  ),
} as ChannelSummariesExperiment;
