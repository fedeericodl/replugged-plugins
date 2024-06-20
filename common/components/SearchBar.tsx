import type React from "react";
import { webpack } from "replugged";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  autoComplete?: boolean;
  disabled?: boolean;
  hideSearchIcon?: boolean;
  iconClassName?: string;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
  isLoading?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  onClear?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  query?: string;
  size?: string;
}

export declare class SearchBar extends React.PureComponent<SearchBarProps> {
  public inputRef: React.RefObject<HTMLInputElement>;
  public containerRef: React.RefObject<HTMLDivElement>;
  public handleOnChange: React.ChangeEventHandler<HTMLInputElement>;

  public focus: () => void;
  public blur: () => void;
}

export type SearchBarType = typeof SearchBar & {
  defaultProps: SearchBarProps;
  Sizes: Record<"SMALL" | "MEDIUM" | "LARGE", string>;
};

const searchBarRgx = /inputProps:\w+,hideSearchIcon/;

export default await webpack
  .waitForModule(webpack.filters.bySource(searchBarRgx))
  .then((mod) => webpack.getFunctionBySource<SearchBarType>(mod, searchBarRgx)!);
