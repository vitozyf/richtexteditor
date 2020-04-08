import { RtElement, h } from '@component/element';
import { cssPrefix } from '@src/config';

export default class Icon extends RtElement {
  constructor(name: string) {
    // super('i', `${cssPrefix}-toolbar-icon iconfont ${name}`);
    super('i', `${cssPrefix}-toolbar-icon icon`);
    this.setHtml(`<svg class="icon" aria-hidden="true">
			<use xlink:href="#${name}"></use>
		</svg>`);
    this.active(true);
  }
}
