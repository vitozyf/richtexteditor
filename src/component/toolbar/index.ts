import { ReElement } from '@component/element';
import { h } from '@component/element';
import { cssPrefix } from '@src/config';

export default class ToolBar {
  el: ReElement;
  constructor(targetEl: ReElement) {
    this.el = h('div', `${cssPrefix}-toolbar`);
    targetEl.children(this.el);
  }
}
