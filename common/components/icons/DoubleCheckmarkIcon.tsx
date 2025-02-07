import type { IconType } from "@common/types/components";
import { common, webpack } from "replugged";

const { components } = common;

export default webpack.getFunctionBySource<IconType>(components, "M16.7 8.7a1 1 0 0 0-1.4-1.4")!;
