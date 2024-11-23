import { settings } from "replugged";

interface Settings {
  align: string;
  jumpToUnread: boolean;
  threadsOnly: boolean;
}

const defaultSettings = {
  align: "right",
  jumpToUnread: false,
  threadsOnly: true,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.JumpToFirstMessage",
  defaultSettings,
);
