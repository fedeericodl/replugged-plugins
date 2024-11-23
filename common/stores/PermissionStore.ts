import type { Channel, Guild, Role, User } from "discord-types/general";
import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

interface GuildPermissionProps {
  canAccessMembersPage: boolean;
  canManageBans: boolean;
  canManageChannels: boolean;
  canManageGuild: boolean;
  canManageGuildExpressions: boolean;
  canManageNicknames: boolean;
  canManageRoles: boolean;
  canManageWebhooks: boolean;
  canViewAuditLog: boolean;
  canViewAuditLogV2: boolean;
  canViewGuildAnalytics: boolean;
  guild: Guild;
  isGuildAdmin: boolean;
  isOwner: boolean;
  isOwnerWithRequiredMfaLevel: boolean;
}

interface PartialChannelContext {
  channelId?: string;
}

interface PartialGuildContext {
  guildId?: string;
}

type Context = Channel | Guild | PartialChannelContext | PartialGuildContext;

export declare class PermissionStore extends Flux.Store {
  public can: (
    permission: bigint,
    context: Context,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => boolean;
  public canAccessGuildSettings: (guild: Guild) => boolean;
  public canAccessMemberSafetyPage: (guild: Guild) => boolean;
  public canBasicChannel: (
    permissions: number,
    channel: Channel,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => boolean;
  public canImpersonateRole: (guild: Guild, role: Role) => boolean;
  public canManageUser: (permission: bigint, otherUser: User | string, guild: Guild) => boolean;
  public canWithPartialContext: (
    permission: bigint,
    context: PartialChannelContext | PartialGuildContext,
  ) => boolean;
  public computeBasicPermissions: (channel: Channel) => number;
  public computePermissions: (
    context: Context,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => bigint;
  public getChannelPermissions: (channel: Channel) => bigint;
  public getChannelsVersion: () => number;
  public getGuildPermissionProps: (guild: Guild) => GuildPermissionProps;
  public getGuildPermissions: (guild: Guild) => bigint;
  public getGuildVersion: (guildId: string) => number;
  public getHighestRole: (guild: Guild) => Role | null;
  public isRoleHigher: (guild: Guild, firstRole: Role | null, secondRole: Role | null) => boolean;
}

export default webpack.getByStoreName<PermissionStore>("PermissionStore")!;
