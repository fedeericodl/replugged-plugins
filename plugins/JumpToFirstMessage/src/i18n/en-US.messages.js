import { defineMessages } from "@discord/intl";

export const meta = {
  translationsPath: "./translations",
  secret: false,
  translate: true,
};

export default defineMessages({
  JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_CENTER: "Center",
  JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_LEFT: "Left",
  JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_NOTE:
    "The horizontal alignment of the button in the channels.",
  JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_RIGHT: "Right",
  JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_TITLE: "Button Alignment",
  JUMPTOFIRSTMESSAGE_SETTINGS_JUMP_TO_UNREAD_NOTE:
    "Will jump to the last unread message, if available, before jumping to the first message of the channel.",
  JUMPTOFIRSTMESSAGE_SETTINGS_THREADS_ONLY_NOTE:
    "Whether to display the button in threads only. It's recommended to leave this option enabled.",
  JUMPTOFIRSTMESSAGE_SETTINGS_THREADS_ONLY_TITLE: "Only show in threads",
});
