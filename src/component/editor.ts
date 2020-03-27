import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import { ReElement } from '@component/element';
import Row from '@component/row';
import DataProxy from '@component/dataproxy';

export default class Editor {
  el: ReElement;
  data: DataProxy;
  row: Row;
  constructor(targetEl: ReElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-editor`);
    this.row = new Row(this.el);

    targetEl.children(this.el);
  }
}
