import { RtElement } from '@component/element';
import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import Clear from './clear';
import Print from './print';
import Undo from './undo';
import Redo from './redo';
import Bold from './bold';
import Italic from './italic';
import Underline from './underline';
import StrikeThrough from './strikeThrough';
import JustifyLeft from './justifyLeft';
import JustifyRight from './justifyRight';
import JustifyCenter from './justifyCenter';
import JustifyFull from './justifyFull';
import InsertOrderedList from './insertOrderedList';
import InsertUnorderedList from './insertUnorderedList';
import RemoveFormat from './removeFormat';
import FormatBlock from './formatBlock';
import Indent from './indent';
import Outdent from './outdent';
import CreateLink from './createLink';
import Unlink from './unlink';
import SelectAll from './selectAll';
import Cut from './cut';
import Copy from './copy';
import Superscript from './superscript';
import Subscript from './subscript';

import DataProxy from '@component/dataproxy';
import { getData } from '@utils/index';

export default class ToolBar {
  el: RtElement;
  toolbarBtns: Array<any>;
  data: DataProxy;

  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-toolbar`);

    const toolbarBtn = h('button', `${cssPrefix}-toolbar-btncontainer`);

    this.init();

    this.toolbarBtns = [
      new Clear(),
      new Print(),
      new Undo(),
      new Redo(),
      new Bold(),
      new Italic(),
      new Underline(),
      new StrikeThrough(),
      new JustifyLeft(),
      new JustifyRight(),
      new JustifyCenter(),
      new JustifyFull(),
      new InsertOrderedList(),
      new InsertUnorderedList(),
      new RemoveFormat(),
      new FormatBlock(),
      new Indent(),
      new Outdent(),
      new CreateLink(),
      new Unlink(),
      new SelectAll(),
      new Cut(),
      new Copy(),
      new Superscript(),
      new Subscript()
    ];

    this.toolbarBtns.forEach(it => {
      if (Array.isArray(it)) {
        it.forEach(i => {
          toolbarBtn.child(i.el);
        });
      } else {
        toolbarBtn.child(it.el);
      }
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
    document.execCommand(aCommandName, false, sValue);
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
