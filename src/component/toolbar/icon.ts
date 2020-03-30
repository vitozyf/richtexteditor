import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import { t } from '@src/locale/locale';

export default class Icon {
  el: RtElement;
  constructor(target: RtElement, name: string) {
    this.el = h('i', `${cssPrefix}-toolbar-icon iconfont ${name}`);
    this.el.setAttr({
      title: t(`toolbar.${name}`),
      'data-aCommandName': name
    });
    target.children(this.el);
  }
}
