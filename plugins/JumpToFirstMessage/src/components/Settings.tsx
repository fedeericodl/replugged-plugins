import type React from "react";
import { common, components, util } from "replugged";
import t from "../i18n/en-US.messages";
import { cfg } from "../settings";

const {
  i18n: { intl, t: discordT },
} = common;
const { SelectItem, SwitchItem } = components;

export default (): React.ReactElement => {
  const threadsOnly = util.useSetting(cfg, "threadsOnly");
  const jumpToUnread = util.useSetting(cfg, "jumpToUnread");
  const align = util.useSetting(cfg, "align");

  return (
    <>
      <SwitchItem
        {...threadsOnly}
        note={intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_THREADS_ONLY_NOTE)}>
        {intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_THREADS_ONLY_TITLE)}
      </SwitchItem>
      <SwitchItem
        {...jumpToUnread}
        note={intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_JUMP_TO_UNREAD_NOTE)}>
        {intl.string(discordT.JUMP_TO_LAST_UNREAD_MESSAGE)}
      </SwitchItem>
      <SelectItem
        {...align}
        note={intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_NOTE)}
        options={[
          { label: intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_LEFT), value: "left" },
          { label: intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_CENTER), value: "center" },
          { label: intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_RIGHT), value: "right" },
        ]}>
        {intl.string(t.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_TITLE)}
      </SelectItem>
    </>
  );
};
