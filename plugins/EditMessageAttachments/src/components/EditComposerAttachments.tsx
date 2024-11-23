import UploadAttachmentActionCreators, {
  type UploadAttachmentAddFilesPayload,
} from "@common/actions/UploadAttachmentActionCreators";
import Popout, { PopoutAlign, PopoutPositions } from "@common/components/Popout";
import PermissionStore from "@common/stores/PermissionStore";
import UploadAttachmentStore, { DraftType } from "@common/stores/UploadAttachmentStore";
import type { Channel, Message } from "discord-types/general";
import { common, components } from "replugged";
import { MAX_UPLOAD_COUNT } from "../constants";
import t from "../i18n/en-US.messages";
import ComposerAttachmentPopout from "./ComposerAttachmentPopout";

import "./EditComposerAttachments.css";

const {
  constants,
  flux: Flux,
  fluxDispatcher: Dispatcher,
  i18n: { intl },
  React,
} = common;
const { ErrorBoundary } = components;

interface EditComposerAttachmentsProps {
  channel: Channel;
  message: Message;
}

function EditComposerAttachments(props: EditComposerAttachmentsProps): React.ReactElement | null {
  const { channel, message } = props;

  const channelId = channel.id;

  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const showFn = (action: UploadAttachmentAddFilesPayload): void => {
      if (action.draftType === DraftType.EditedChannelMessage) setShouldShow(true);
    };

    Dispatcher.subscribe<UploadAttachmentAddFilesPayload>("UPLOAD_ATTACHMENT_ADD_FILES", showFn);
    return () =>
      Dispatcher.unsubscribe<UploadAttachmentAddFilesPayload>(
        "UPLOAD_ATTACHMENT_ADD_FILES",
        showFn,
      );
  });

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () =>
    UploadAttachmentStore.getUploadCount(channelId, DraftType.EditedChannelMessage),
  );

  const attachmentsCount = message.attachments.length;

  if (uploadsCount + attachmentsCount > MAX_UPLOAD_COUNT)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);

  const canAttach = Flux.useStateFromStores(
    [PermissionStore],
    () =>
      channel.isPrivate() ||
      (PermissionStore.can(constants.Permissions!.ATTACH_FILES, channel) &&
        PermissionStore.can(constants.Permissions!.SEND_MESSAGES, channel)),
  );
  if (!canAttach) return null;

  return (
    <Popout
      renderPopout={() => (
        <ComposerAttachmentPopout channelId={channelId} attachmentsCount={attachmentsCount} />
      )}
      position={PopoutPositions.TOP}
      align={PopoutAlign.RIGHT}
      shouldShow={shouldShow}
      onRequestClose={() => setShouldShow(false)}
      ignoreModalClicks>
      {(props) => (
        <a
          {...props}
          onClick={() => setShouldShow(!shouldShow)}
          className="editMessageAttachments-attachmentsCount">
          {intl.formatToPlainString(t.EDITMESSAGEATTACHMENTS_COUNT_ATTACHMENTS, {
            count: (uploadsCount + attachmentsCount).toString(),
          })}
        </a>
      )}
    </Popout>
  );
}

export default (props: EditComposerAttachmentsProps): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<></>}>
      <EditComposerAttachments {...props} />
    </ErrorBoundary>
  );
};
