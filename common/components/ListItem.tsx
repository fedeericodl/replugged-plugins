import type React from "react";
import { webpack } from "replugged";

export type ListItemType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithChildren> & React.RefAttributes<unknown>
>;

export default await webpack
  .waitForModule<ListItemType>(webpack.filters.bySource(".listItem,ref:"))
  .then((mod) => Object.values(mod).find((x) => typeof x?.render === "function")!);
