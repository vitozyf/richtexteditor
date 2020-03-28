import { h, ReElement } from '@component/element';
import { cssPrefix } from '@src/config';
// import Row from '@component/row';
import DataProxy from '@component/dataproxy';
import Iframe from '@component/iframe';
export default class Editor extends Iframe {
  el: ReElement;
  data: DataProxy;
  // row: Row;
  constructor(targetEl: ReElement, data: DataProxy) {
    super(targetEl);
    this.data = data;
    this.el = h('div', `${cssPrefix}-editor`);

    // this.initStyle();
    // this.row = new Row(this.el);
    // targetEl.children(this.el);
  }

  // initStyle(){
  // 	const {IOptionView<>view} = this.data.options;
  // 	this.el.setCss({
  // 		width: `${view.width}px`
  // 	})
  // }
}
