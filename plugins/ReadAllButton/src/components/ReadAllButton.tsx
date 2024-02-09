import ListItemTooltip from "@common/components/ListItemTooltip";
import DoubleCheckmark from "@common/components/icons/DoubleCheckmark";
import classNames from "classnames";
import { common, components, webpack } from "replugged";
import { showClearedToast } from "..";
import { cfg } from "../settings";
import { markDMsAsRead, markGuildAsRead } from "../utils/MarkAsReadUtils";
import ReadAllButtonContextMenu from "./ReadAllButtonContextMenu";

import "./ReadAllButton.css";

const { contextMenu, i18n, React, modal, toast } = common;
const { Clickable, ErrorBoundary, Text } = components;

const classes =
  await webpack.waitForProps<Record<"listItem" | "unavailableBadge", string>>("unavailableBadge");

function ReadAllButton(): React.ReactElement {
  const [selected, setSelected] = React.useState(false);

  const useText = cfg.get("text");
  const useRoundButton = cfg.get("roundButton");

  const handleClick = React.useCallback(async () => {
    if (cfg.get("askConfirm")) {
      if (
        !(await modal.confirm({
          title: i18n.Messages.MARK_ALL_AS_READ,
          body: i18n.Messages.READALLBUTTON_MARK_ALL_READ_DESCRIPTION,
        }))
      )
        return;
    }

    try {
      markGuildAsRead();
      if (cfg.get("markDMs")) markDMsAsRead();
      showClearedToast();
    } catch (err) {
      toast.toast(i18n.Messages.READALLBUTTON_ERROR_GENERIC_TOAST, toast.Kind.FAILURE);
      console.error(err);
    }
  }, []);

  return (
    <div className={classes.listItem}>
      <ListItemTooltip text={i18n.Messages.READALLBUTTON_READ_ALL} shouldShow={!useText}>
        <Clickable
          aria-label={i18n.Messages.READALLBUTTON_READ_ALL}
          className={classNames("readAllButton", { selected }, { round: useRoundButton })}
          onClick={handleClick}
          onMouseEnter={() => setSelected(true)}
          onMouseLeave={() => setSelected(false)}
          onContextMenu={(event) => contextMenu.open(event, ReadAllButtonContextMenu)}>
          {useText ? (
            <Text.Eyebrow className="readAllButton-buttonText">
              {i18n.Messages.READALLBUTTON_READ_ALL}
            </Text.Eyebrow>
          ) : (
            <DoubleCheckmark width={24} height={24} />
          )}
        </Clickable>
      </ListItemTooltip>
    </div>
  );
}

export default (): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<></>}>
      <ReadAllButton />
    </ErrorBoundary>
  );
};
