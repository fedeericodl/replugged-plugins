import type { PlaintextPatch } from "replugged/types";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.EditMessageAttachments")`;

export default [
  {
    // Patch the MessageEditor component
    find: "this.onClickSave",
    replacements: [
      {
        // Render the EditComposerAttachments component
        match: /(\.operations,children:)((?:[^}]*?})\))/,
        replace: (_, prefix, ogChild) =>
          `${prefix}[${ogChild},${pluginExports}._renderEditComposerAttachments(this.props)]`,
      },
      {
        // Enable saving if there are new uploads
        match: /(\w\.content!==this\.props\.message\.content&&(.+?\)))/,
        replace: (_, prefix, ogFn) =>
          `${pluginExports}._checkHasUploads(this.props.channel.id)?${ogFn}:${prefix}`,
      },
      {
        // Enable saving if there are new uploads but content length is 0
        match: /(validateEdit:.{1,50}?)(0===\w.length)/,
        replace: (_, prefix, ogCheck) =>
          `${prefix}!${pluginExports}._checkHasUploads(this.props.channel.id)&&${ogCheck}`,
      },
      {
        // Clear the upload queue when canceling
        match: /(onCancel:\(\)=>)(.+?\))/,
        replace: (_, prefix, ogFn) =>
          `${prefix}{${pluginExports}._clearUploads(this.props.channel.id);${ogFn}}`,
      },
    ],
  },
  {
    // Upload files while editing
    find: 'type:"MESSAGE_EDIT_FAILED_AUTOMOD"',
    replacements: [
      {
        match: /((\w)={channelId.+?};)(\w+\.\w+\.enqueue\(.+?(\w+=>(?:[^}]*?}){5}\)})\))/s,
        replace: (_, prefix1, variable, prefix2, ogFn) =>
          `${prefix1}${pluginExports}._checkHasUploads(${variable}?.channelId)?${pluginExports}._patchEditMessageAction(${variable},${ogFn}):${prefix2}`,
      },
    ],
  },
  {
    // Enable pasting files while editing
    find: /renderApplicationCommandIcon:\w+,pendingReply:\w+/,
    replacements: [
      {
        match: /canPasteFiles:(\w+)/,
        replace: (_, variable) =>
          `canPasteFiles:${variable}||${pluginExports}._checkIsInEditor(arguments[0].channel.id)`,
      },
    ],
  },
  {
    find: "showLargeMessageDialog:!1",
    replacements: [
      {
        match: /onDrop:/,
        replace: () => `channelId:arguments[0].channel.id,onDrop:`,
      },
    ],
  },
  {
    find: "this.state.isOverZone",
    replacements: [
      {
        match: /!this.preventUnwantedDrop/g,
        replace: (suffix) => `${pluginExports}._checkIsInEditor(this.props.channelId) || ${suffix}`,
      },
    ],
  },
] as PlaintextPatch[];
