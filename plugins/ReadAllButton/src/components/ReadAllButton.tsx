import ListItem from "@common/components/ListItem";
import ListItemTooltip from "@common/components/ListItemTooltip";
import DoubleCheckmarkIcon from "@common/components/icons/DoubleCheckmarkIcon";
import classNames from "classnames";
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
const { Clickable, ErrorBoundary, Text } = components;

function ReadAllButton(): React.ReactElement {
  const [selected, setSelected] = React.useState(false);

  const useText = cfg.get("text");
  const useRoundButton = cfg.get("roundButton");

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
    <ListItem>
      <ListItemTooltip text={intl.string(t.READALLBUTTON_READ_ALL)} shouldShow={!useText}>
        <Clickable
          aria-label={intl.string(t.READALLBUTTON_READ_ALL)}
          className={classNames("readAllButton", { selected }, { round: useRoundButton })}
          onClick={handleClick}
          onMouseEnter={() => setSelected(true)}
          onMouseLeave={() => setSelected(false)}
          onContextMenu={(event) => contextMenu.open(event, ReadAllButtonContextMenu)}>
          {useText ? (
            <Text.Eyebrow className="readAllButton-buttonText">
              {intl.string(t.READALLBUTTON_READ_ALL)}
            </Text.Eyebrow>
          ) : (
            <DoubleCheckmarkIcon color="currentColor" />
          )}
        </Clickable>
      </ListItemTooltip>
    </ListItem>
  );
}

export default (): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<></>}>
      <ReadAllButton />
    </ErrorBoundary>
  );
};
