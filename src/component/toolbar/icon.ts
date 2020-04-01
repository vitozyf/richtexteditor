import { RtElement } from '@component/element';
import { cssPrefix } from '@src/config';

export default class Icon extends RtElement {
  constructor(name: string) {
    super('i', `${cssPrefix}-toolbar-icon iconfont ${name}`);
    this.active(true);
    this.setAttr({
      'data-aCommandName': name
    });
  }
}
