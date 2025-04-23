import { settings } from "replugged";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Settings = {
  askConfirm?: boolean;
  blacklist?: string[];
  markChannels?: boolean;
  markDMs?: boolean;
  markGuildEvents?: boolean;
  markMuted?: boolean;
  markOnboardingQuestions?: boolean;
  text?: boolean;
  toasts?: boolean;
};

const defaultSettings = {
  askConfirm: false,
  blacklist: [],
  markChannels: true,
  markDMs: true,
  markGuildEvents: true,
  markMuted: true,
  markOnboardingQuestions: true,
  text: false,
  toasts: true,
} satisfies Partial<Settings>;

export const cfg = settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.ReadAllButton",
  defaultSettings,
);
