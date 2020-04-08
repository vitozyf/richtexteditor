import { RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
interface IInputProps {
  border?: boolean;
  className?: string;
  placeholder?: string;
}
export default class Input extends RtElement {
  constructor(props: IInputProps = {}) {
    const { border, className } = props;
    let InputClassName = `${cssPrefix}-input`;
    if (border) {
      InputClassName += `${cssPrefix}-input-border`;
    }
    if (className) {
      InputClassName += className;
    }
    super('input', InputClassName);
  }
}
