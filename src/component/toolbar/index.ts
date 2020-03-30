import { RtElement } from '@component/element';
import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import Icon from '@component/toolbar/icon';
import DataProxy from '@component/dataproxy';
import { getData } from '@utils/index';

export default class ToolBar {
  el: RtElement;
  toolbarBtns: Array<Icon>;
  data: DataProxy;

  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-toolbar`);

    const toolbarBtn = h('button', `${cssPrefix}-toolbar-btncontainer`);

    this.init();

    const { toolbars } = this.data.options;
    this.toolbarBtns = (<Array<string>>toolbars).map(name => {
      return new Icon(toolbarBtn, name);
    });

    this.el.children(toolbarBtn);

    targetEl.children(this.el);
  }

  init() {
    this.el.on('click', (event: Event) => {
      const aCommandName = getData(event.target, 'aCommandName');
      if (aCommandName) {
        this.formatDoc(<ICommandName>aCommandName);
      }
    });
  }

  formatDoc(aCommandName: ICommandName, sValue: any = null) {
    console.log(aCommandName);
    document.execCommand(aCommandName, false, sValue);
    // this.el.focus();
  }

  //    saveSelection() { // 保存当前Range对象
  //     let selection = window.getSelection();
  //     if(selection.rangeCount > 0){
  //         return sel.getRangeAt(0);
  //     }
  //     return null;
  // };
  // let selectedRange = saveSelection();
  //  restoreSelection() {
  //     let selection = window.getSelection();
  //     if (selectedRange) {
  //         selection.removeAllRanges();  // 清空所有 Range 对象
  //         selection.addRange(selectedRange); // 恢复保存的 Range
  //     }
  // }
}
