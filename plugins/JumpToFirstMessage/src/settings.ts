import { settings } from "replugged";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Settings = {
  align: string;
  jumpToUnread: boolean;
  threadsOnly: boolean;
};

const defaultSettings = {
  align: "right",
  jumpToUnread: false,
  threadsOnly: true,
} satisfies Partial<Settings>;

export const cfg = settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.JumpToFirstMessage",
  defaultSettings,
);
