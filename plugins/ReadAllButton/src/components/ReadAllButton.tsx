import ButtonListItem from "@common/components/ButtonListItem";
import DoubleCheckmarkIcon from "@common/components/icons/DoubleCheckmarkIcon";
import { common, components } from "replugged";
import { showClearedToast } from "..";
import t from "../i18n/en-US.messages";
import { cfg } from "../settings";
import { markDMsAsRead, markGuildAsRead } from "../utils/MarkAsReadUtils";
import ReadAllButtonContextMenu from "./ReadAllButtonContextMenu";

import "./ReadAllButton.css";

const {
  contextMenu,
  i18n: { intl, t: discordT },
  React,
  modal,
  toast,
} = common;
const { ErrorBoundary, Text } = components;

const IconText = (): React.ReactElement => (
  <Text.Eyebrow className="readAllButton-buttonText">
    {intl.string(t.READALLBUTTON_READ_ALL)}
  </Text.Eyebrow>
);

function ReadAllButton(): React.ReactElement {
  const useText = cfg.get("text");

  const handleClick = React.useCallback(async () => {
    if (cfg.get("askConfirm")) {
      if (
        !(await modal.confirm({
          title: intl.string(discordT.MARK_ALL_AS_READ),
          body: intl.string(t.READALLBUTTON_MARK_ALL_READ_DESCRIPTION),
        }))
      )
        return;
    }

    try {
      markGuildAsRead();
      if (cfg.get("markDMs")) markDMsAsRead();
      showClearedToast();
    } catch (err) {
      toast.toast(intl.string(t.READALLBUTTON_ERROR_GENERIC_TOAST), toast.Kind.FAILURE);
      console.error(err);
    }
  }, []);

  return (
    <ButtonListItem
      id="read-all-button"
      className="readAllButton-button"
      onClick={handleClick}
      onContextMenu={(event) => contextMenu.open(event, ReadAllButtonContextMenu)}
      tooltip={intl.string(t.READALLBUTTON_READ_ALL)}
      // Kinda a hack, ButtonListItem is not meant to be used like this
      icon={useText ? IconText : DoubleCheckmarkIcon}
      showPill={false}
    />
  );
}

export default (): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<></>}>
      <ReadAllButton />
    </ErrorBoundary>
  );
};
