import type { IconType } from "@common/types/components";
import { common, webpack } from "replugged";

const { components } = common;

export default webpack.getFunctionBySource<IconType>(components, "M2 5a3 3 0 0 1 3-3h14a3")!;
