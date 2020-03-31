import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import { t } from '@src/locale/locale';

export default class Icon extends RtElement {
  constructor(name: string) {
    super('i', `${cssPrefix}-toolbar-icon iconfont ${name}`);
    this.setAttr({
      'data-aCommandName': name
    });
  }
}
