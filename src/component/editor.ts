import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';
export default class Editor {
  el: RtElement;
  data: DataProxy;
  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-editor`);
    this.init();
    targetEl.children(this.el);
  }

  private init() {
    const { data } = this;
    this.el
      .setCss({
        minHeight: '200px',
        outline: 'none',
        padding: '10px 5px',
        fontSize: `${data.options.style?.font?.size}px`
      })
      .setAttr({
        contenteditable: true
      });
  }
  // formatDoc(aCommandName: ICommandName, sValue: any) {
  //   // if (!this.validateMode(aCommandName)) { return; }
  //   document.execCommand(aCommandName, false, sValue);
  //   this.el.focus();
  // }
  //  validateMode (aCommandName: ICommandName) {
  // 	if (!document.getElementById("rte-mode-" + rId.exec(oDoc.id)[0]).checked) { return true; }
  // 	alert("Uncheck \u00AB" + sModeLabel + "\u00BB.");
  // 	oDoc.focus();
  // 	return false;
  // }
}
