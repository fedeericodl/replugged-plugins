import type React from "react";
import { common, components, util } from "replugged";
import t from "../i18n/en-US.messages";
import { cfg } from "../settings";

const {
  i18n: { intl },
} = common;
const { SwitchItem } = components;

export default (): React.ReactElement => {
  const clearOnCancel = util.useSetting(cfg, "clearOnCancel");

  return (
    <SwitchItem {...clearOnCancel}>
      {intl.string(t.EDITMESSAGEATTACHMENTS_SETTINGS_CLEAR_ON_CANCEL_TITLE)}
    </SwitchItem>
  );
};
