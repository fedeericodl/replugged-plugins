import type { DefaultIconProps } from "@common/types/components";
import type React from "react";
import { webpack } from "replugged";

export type DoubleCheckmarkIconType = React.FC<DefaultIconProps>;

const components =
  await webpack.waitForProps<Record<"DoubleCheckmarkIcon", DoubleCheckmarkIconType>>(
    "DoubleCheckmarkIcon",
  );

export default components.DoubleCheckmarkIcon;
