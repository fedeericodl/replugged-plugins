import type { Margins } from "@common/types";
import type React from "react";
import { common, components, util, webpack } from "replugged";
import t from "../i18n/en-US.messages";
import { cfg } from "../settings";
import ServerBlacklistModal from "./ServerBlacklistModal";

import "./Settings.css";

const {
  i18n: { intl, t: discordT },
  modal,
} = common;
const { Button, Checkbox, ErrorBoundary, Flex, FormItem, SwitchItem, Text } = components;

enum ReadType {
  DM,
  GUILD_CHANNEL,
  GUILD_EVENT,
  GUILD_ONBOARDING_QUESTION,
  MUTED_GUILD,
}

const MarginsClasses = await webpack.waitForProps<Record<Margins, string>>("marginBottom20");

interface ReadListCheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: ReadType;
  value: boolean;
}

function ReadListCheckbox(props: ReadListCheckboxProps): React.ReactElement {
  const { type, ...setting } = props;
  const { onChange, value } = setting;
  let header = "";

  switch (type) {
    case ReadType.DM:
      header = intl.string(t.READALLBUTTON_READ_TYPE_DM);
      break;
    case ReadType.GUILD_CHANNEL:
      header = intl.string(t.READALLBUTTON_READ_TYPE_GUILD_CHANNEL);
      break;
    case ReadType.GUILD_EVENT:
      header = intl.string(t.READALLBUTTON_READ_TYPE_GUILD_EVENT);
      break;
    case ReadType.GUILD_ONBOARDING_QUESTION:
      header = intl.string(t.READALLBUTTON_READ_TYPE_GUILD_ONBOARDING_QUESTION);
      break;
    case ReadType.MUTED_GUILD:
      header = intl.string(t.READALLBUTTON_READ_TYPE_MUTED_GUILD);
      break;
  }

  return (
    <div className="readAllButton-listContainer">
      <Text color="header-primary" variant="heading-sm/semibold">
        {header}
      </Text>
      <Checkbox
        value={value}
        onChange={onChange}
        type={Checkbox.Types.INVERTED}
        className="readAllButton-listCheckbox"
      />
    </div>
  );
}

export default (): React.ReactElement => {
  const markMuted = util.useSetting(cfg, "markMuted");
  const markChannels = util.useSetting(cfg, "markChannels");
  const markDMs = util.useSetting(cfg, "markDMs");
  const markGuildEvents = util.useSetting(cfg, "markGuildEvents");
  const markOnboardingQuestions = util.useSetting(cfg, "markOnboardingQuestions");
  const useText = util.useSetting(cfg, "text");
  const showConfirm = util.useSetting(cfg, "askConfirm");
  const showToasts = util.useSetting(cfg, "toasts");

  return (
    <>
      <FormItem
        title={intl.string(t.READALLBUTTON_SETTINGS_SERVER_BLACKLIST_TITLE)}
        // TODO: blacklist length doesn't update
        note={intl.formatToPlainString(t.READALLBUTTON_SETTINGS_SERVER_BLACKLIST_NOTE, {
          count: cfg.get("blacklist").length,
        })}
        className={MarginsClasses.marginBottom20}
        divider>
        <Button
          onClick={() =>
            modal.openModal((props) => (
              <ErrorBoundary>
                <ServerBlacklistModal {...props} />
              </ErrorBoundary>
            ))
          }
          size={Button.Sizes.SMALL}>
          {intl.string(t.READALLBUTTON_SETTINGS_EDIT_BLACKLIST)}
        </Button>
      </FormItem>
      <FormItem
        title={intl.string(discordT.MARK_AS_READ)}
        className={MarginsClasses.marginBottom20}
        divider>
        <Flex direction={Flex.Direction.VERTICAL}>
          <ReadListCheckbox {...markMuted} type={ReadType.MUTED_GUILD} />
          <ReadListCheckbox {...markChannels} type={ReadType.GUILD_CHANNEL} />
          <ReadListCheckbox {...markDMs} type={ReadType.DM} />
          <ReadListCheckbox {...markGuildEvents} type={ReadType.GUILD_EVENT} />
          <ReadListCheckbox
            {...markOnboardingQuestions}
            type={ReadType.GUILD_ONBOARDING_QUESTION}
          />
        </Flex>
      </FormItem>
      <FormItem title={intl.string(discordT.APPEARANCE)}>
        <SwitchItem {...useText} note={intl.string(t.READALLBUTTON_SETTINGS_DISPLAY_TEXT_NOTE)}>
          {intl.string(t.READALLBUTTON_SETTINGS_DISPLAY_TEXT_TITLE)}
        </SwitchItem>
      </FormItem>
      <FormItem title={intl.string(discordT.OTHER)}>
        <SwitchItem {...showConfirm}>
          {intl.string(t.READALLBUTTON_SETTINGS_ASK_CONFIRM_TITLE)}
        </SwitchItem>
        <SwitchItem {...showToasts}>
          {intl.string(t.READALLBUTTON_SETTINGS_SHOW_TOAST_TITLE)}
        </SwitchItem>
      </FormItem>
    </>
  );
};
