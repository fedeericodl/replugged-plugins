import { defineMessages } from "@discord/intl";

export const meta = {
  translationsPath: "./translations",
  secret: false,
  translate: true,
};

export default defineMessages({
  READALLBUTTON_CLEARED_EVERYTHING_TOAST: "Cleared everything!",
  READALLBUTTON_CLEARED_TOAST: "Cleared {type}!",
  READALLBUTTON_ERROR_GENERIC_TOAST: "Something went wrong!",
  READALLBUTTON_MARK_ALL_READ_DESCRIPTION:
    "This will mark everything as read. Are you sure you want to continue?",
  READALLBUTTON_READ_ALL: "Read All",
  READALLBUTTON_READ_TYPE_DM: "Direct Messages",
  READALLBUTTON_READ_TYPE_GUILD_CHANNEL: "Channels",
  READALLBUTTON_READ_TYPE_GUILD_EVENT: "Events",
  READALLBUTTON_READ_TYPE_GUILD_ONBOARDING_QUESTION: "Onboarding Questions",
  READALLBUTTON_READ_TYPE_MUTED_GUILD: "Muted Servers",
  READALLBUTTON_SETTINGS_ASK_CONFIRM_TITLE: "Ask for confirmation before marking as read",
  READALLBUTTON_SETTINGS_DISPLAY_TEXT_NOTE: "Disables the tooltip as well.",
  READALLBUTTON_SETTINGS_DISPLAY_TEXT_TITLE: "Display text instead of an icon",
  READALLBUTTON_SETTINGS_EDIT_BLACKLIST: "Edit Blacklist",
  READALLBUTTON_SETTINGS_SERVER_BLACKLIST_NOTE: "{count} servers won't get marked as read.",
  READALLBUTTON_SETTINGS_SERVER_BLACKLIST_TITLE: "Server Blacklist",
  READALLBUTTON_SETTINGS_SHOW_TOAST_TITLE: "Show a confirmation toast",
});
