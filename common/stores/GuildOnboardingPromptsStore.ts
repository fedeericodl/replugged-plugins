import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

enum OnboardingPromptTypes {
  MULTIPLE_CHOICE,
  DROPDOWN,
}

interface OnboardingPrompt {
  disabled: boolean | undefined;
  hasNewAnswers: boolean;
  id: string;
  isNew: boolean;
  isOnboarding: boolean;
  options: OnboardingPromptOption[];
  required: boolean;
  singleSelect: boolean;
  title: string;
  type: OnboardingPromptTypes;
}

interface OnboardingPromptOption {
  channelIds: string[];
  description: string;
  emoji: { id: string | null; name: string; animated: boolean };
  id: string;
  isUnseen: boolean;
  roleIds: string[];
  title: string;
}

export declare class GuildOnboardingPromptsStore extends Flux.Store {
  public ackIdForGuild: (guildId: string) => string;
  public getDefaultChannelIds: (guildId: string) => string[];
  public getEnabled: (guildId: string) => boolean;
  public getEnabledOnboardingPrompts: (guildId: string) => OnboardingPrompt[];
  public getOnboardingPrompt: (onboardingPromptId: string) => OnboardingPrompt;
  public getOnboardingPrompts: (guildId: string) => OnboardingPrompt[];
  public getOnboardingPromptsForOnboarding: (guildId: string) => OnboardingPrompt[];
  public getOnboardingResponses: (guildId: string) => string[];
  public getOnboardingResponsesForPrompt: (guildId: string, onboardingPromptId: string) => string[];
  public getPendingResponseOptions: () => void;
  public getSelectedOptions: (guildId: string) => OnboardingPromptOption[];
  public isAdvancedMode: (guildId: string) => boolean;
  public isLoading: () => boolean;
  public lastFetchedAt: (guildId: string) => number;
  public shouldFetchPrompts: (guildId: string, time?: number) => boolean;
}

export default webpack.getByStoreName<GuildOnboardingPromptsStore>("GuildOnboardingPromptsStore")!;
