import type React from "react";
import { common, components } from "replugged";
import { showClearedToast } from "..";
import t from "../i18n/en-US.messages";
import {
  getFilteredGuildIds,
  markDMsAsRead,
  readChannels,
  readEvents,
  readOnboardingQuestions,
} from "../utils/MarkAsReadUtils";

const {
  contextMenu,
  i18n: { intl },
} = common;
const { ContextMenu: Menu } = components;

export default (): React.ReactElement => {
  const guildIds = getFilteredGuildIds();

  return (
    <Menu.ContextMenu navId="readallbutton-context" onClose={contextMenu.close}>
      <Menu.MenuItem
        id="direct-messages"
        label={intl.string(t.READALLBUTTON_READ_TYPE_DM)}
        action={() => {
          markDMsAsRead();
          showClearedToast(intl.string(t.READALLBUTTON_READ_TYPE_DM));
        }}
      />
      <Menu.MenuItem
        id="guild-channels"
        label={intl.string(t.READALLBUTTON_READ_TYPE_GUILD_CHANNEL)}
        action={() => {
          readChannels(guildIds);
          showClearedToast(intl.string(t.READALLBUTTON_READ_TYPE_GUILD_CHANNEL));
        }}
      />
      <Menu.MenuItem
        id="guild-events"
        label={intl.string(t.READALLBUTTON_READ_TYPE_GUILD_EVENT)}
        action={() => {
          readEvents(guildIds);
          showClearedToast(intl.string(t.READALLBUTTON_READ_TYPE_GUILD_EVENT));
        }}
      />
      <Menu.MenuItem
        id="guild-onboarding-questions"
        label={intl.string(t.READALLBUTTON_READ_TYPE_GUILD_ONBOARDING_QUESTION)}
        action={() => {
          readOnboardingQuestions(guildIds);
          showClearedToast(intl.string(t.READALLBUTTON_READ_TYPE_GUILD_ONBOARDING_QUESTION));
        }}
      />
    </Menu.ContextMenu>
  );
};
