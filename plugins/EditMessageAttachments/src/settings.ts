import { settings } from "replugged";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Settings = {
  clearOnCancel?: boolean;
};

const defaultSettings = {
  clearOnCancel: true,
} satisfies Partial<Settings>;

export const cfg = settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.EditMessageAttachments",
  defaultSettings,
);
