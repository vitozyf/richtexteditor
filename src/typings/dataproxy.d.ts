interface IOptionView {
  width: () => number | number;
  height: () => number | number;
}

declare interface IOption {
  view?: IOptionView;
  style?: {
    bgcolor?: string;
    color?: string;
    border?: boolean;
    borderWidth?: number;
    borderColor?: string;
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
    };
  };
}
