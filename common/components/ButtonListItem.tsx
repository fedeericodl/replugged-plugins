import type React from "react";
import { webpack } from "replugged";

interface IconProps {
  className?: string;
  color?: string;
}

interface LowerBadgeSize {
  width?: number;
  height?: number;
}

interface ButtonListItemProps {
  id: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
  icon?: React.ElementType<IconProps>;
  selected?: boolean;
  tooltip?: string;
  upperBadge?: React.ReactNode;
  lowerBadge?: React.ReactNode;
  lowerBadgeSize?: LowerBadgeSize;
  showPill?: boolean;
  className?: string;
  "aria-label"?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

export type ButtonListItemType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithChildren<ButtonListItemProps>> & React.RefAttributes<unknown>
>;

export default await webpack.waitForModule<ButtonListItemType>(
  webpack.filters.bySource(/lowerBadgeSize:\w+,showPill:\w+=!0/),
);
