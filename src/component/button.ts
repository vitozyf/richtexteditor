import { RtElement, h } from '@component/element';
import { cssPrefix } from '@src/config';
import { t } from '@locale/locale';
export default class Button extends RtElement {
  constructor(
    title: string | Array<RtElement>,
    type: 'text' | 'main',
    className?: string
  ) {
    super('button', `${cssPrefix}-button ${type} ${className}`);
    if (typeof title === 'string') {
      this.setHtml(t(`button.${title}`));
    } else {
      this.children(...title);
    }
  }
}
