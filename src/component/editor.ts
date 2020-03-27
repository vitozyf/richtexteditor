import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import { ReElement } from '@component/element';
import DataProxy from '@component/dataproxy';

export default class Editor {
  el: ReElement;
  data: DataProxy;
  constructor(targetEl: ReElement, data: DataProxy) {
    this.data = data;
    this.el = h('textarea', `${cssPrefix}-editor`);
    targetEl.children(this.el);
  }
}
