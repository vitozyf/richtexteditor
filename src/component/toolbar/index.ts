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
import Font from './font';

import DataProxy from '@component/dataproxy';
import { getData } from '@utils/index';
import IconItem from '@src/component/toolbar/icon_item';

export default class ToolBar {
  el: RtElement;
  toolbarBtns: Array<any>;
  data: DataProxy;
  formatBlockEl?: IconItem;
  createLinkEl?: IconItem;
  fontEl?: Font;

  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-toolbar`);

    const toolbarBtn = h('button', `${cssPrefix}-toolbar-btncontainer`);

    this.init();

    const toolbars = this.data.options.toolbars;

    this.toolbarBtns = [
      toolbars?.includes('clear') && new Clear(),
      toolbars?.includes('print') && new Print(),
      toolbars?.includes('undo') && new Undo(),
      toolbars?.includes('redo') && new Redo(),
      toolbars?.includes('bold') && new Bold(),
      toolbars?.includes('italic') && new Italic(),
      toolbars?.includes('underline') && new Underline(),
      toolbars?.includes('strikeThrough') && new StrikeThrough(),
      toolbars?.includes('justifyLeft') && new JustifyLeft(),
      toolbars?.includes('justifyRight') && new JustifyRight(),
      toolbars?.includes('justifyCenter') && new JustifyCenter(),
      toolbars?.includes('justifyFull') && new JustifyFull(),
      toolbars?.includes('insertOrderedList') && new InsertOrderedList(),
      toolbars?.includes('insertUnorderedList') && new InsertUnorderedList(),
      toolbars?.includes('removeFormat') && new RemoveFormat(),
      toolbars?.includes('formatBlock') &&
        (this.formatBlockEl = new FormatBlock()),
      toolbars?.includes('indent') && new Indent(),
      toolbars?.includes('outdent') && new Outdent(),
      toolbars?.includes('createLink') &&
        (this.createLinkEl = new CreateLink()),
      toolbars?.includes('unlink') && new Unlink(),
      toolbars?.includes('selectAll') && new SelectAll(),
      toolbars?.includes('cut') && new Cut(),
      toolbars?.includes('copy') && new Copy(),
      toolbars?.includes('superscript') && new Superscript(),
      toolbars?.includes('subscript') && new Subscript(),
      (this.fontEl = new Font(this.data))
    ];

    this.toolbarBtns.forEach(it => {
      toolbarBtn.child(it.el);
    });

    this.el.children(toolbarBtn);

    targetEl.children(this.el);
  }

  init() {
    this.el.on('click', (event: Event) => {
      const aCommandName = getData(event.target, 'aCommandName');
      let aCommandValue: any = null;
      switch (aCommandName) {
        case 'formatBlock':
          aCommandValue = this.formatBlockEl?.value;
          break;
        case 'createLink':
          aCommandValue = this.createLinkEl?.value;
          break;
        default:
          break;
      }
      if (aCommandName) {
        this.formatDoc(<ICommandName>aCommandName, aCommandValue);
      }
    });
  }

  formatDoc(aCommandName: ICommandName, sValue?: string) {
    document.execCommand(aCommandName, false, sValue);
  }

  // saveSelection() { // 保存当前Range对象
  //     let selection = window.getSelection();
  //     if(selection.rangeCount > 0){
  //         return sel.getRangeAt(0);
  //     }
  //     return null;
  // };
  // let selectedRange = saveSelection();
  // restoreSelection() {
  //     let selection = window.getSelection();
  //     if (selectedRange) {
  //         selection.removeAllRanges();  // 清空所有 Range 对象
  //         selection.addRange(selectedRange); // 恢复保存的 Range
  //     }
  // }
}
