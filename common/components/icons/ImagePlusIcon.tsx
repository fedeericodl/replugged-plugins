import type { DefaultIconProps } from "@common/types/components";
import type React from "react";
import { webpack } from "replugged";

export type ImagePlusIconType = React.FC<DefaultIconProps>;

const components =
  await webpack.waitForProps<Record<"ImagePlusIcon", ImagePlusIconType>>("ImagePlusIcon");

export default components.ImagePlusIcon;
