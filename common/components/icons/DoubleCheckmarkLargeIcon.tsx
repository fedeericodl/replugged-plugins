import type { DefaultIconProps } from "@common/types/components";
import type React from "react";
import { webpack } from "replugged";

export type DoubleCheckmarkLargeIconType = React.FC<DefaultIconProps>;

const components = await webpack.waitForProps<
  Record<"DoubleCheckmarkLargeIcon", DoubleCheckmarkLargeIconType>
>("DoubleCheckmarkLargeIcon");

export default components.DoubleCheckmarkLargeIcon;
