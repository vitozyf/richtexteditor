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
import FontSize from './font_size';
import BackColor from './back_color';

import DataProxy from '@component/dataproxy';
import Selection from '@core/selection';

function inTo(this: ToolBar, name: string) {
  const toolbars = this.data.options.toolbars;
  return toolbars?.includes(name);
}

export default class ToolBar {
  el: RtElement;
  toolbarBtns: Array<any>;
  data: DataProxy;
  selection: Selection;
  fontEl?: Font;
  fontSizeEl?: FontSize;
  createLinkEl?: CreateLink;

  constructor(data: DataProxy, selection: Selection) {
    this.data = data;
    this.selection = selection;
    this.el = h('div', `${cssPrefix}-toolbar`);
    const toolbarBtn = h('button', `${cssPrefix}-toolbar-btncontainer`);

    this.toolbarBtns = [
      inTo.call(this, 'clear') && new Clear(),
      inTo.call(this, 'print') && new Print(),
      inTo.call(this, 'undo') && new Undo(),
      inTo.call(this, 'redo') && new Redo(),
      inTo.call(this, 'bold') && new Bold(),
      inTo.call(this, 'italic') && new Italic(),
      inTo.call(this, 'underline') && new Underline(),
      inTo.call(this, 'strikeThrough') && new StrikeThrough(),
      inTo.call(this, 'justifyLeft') && new JustifyLeft(),
      inTo.call(this, 'justifyRight') && new JustifyRight(),
      inTo.call(this, 'justifyCenter') && new JustifyCenter(),
      inTo.call(this, 'justifyFull') && new JustifyFull(),
      inTo.call(this, 'insertOrderedList') && new InsertOrderedList(),
      inTo.call(this, 'insertUnorderedList') && new InsertUnorderedList(),
      inTo.call(this, 'removeFormat') && new RemoveFormat(),
      inTo.call(this, 'formatBlock') && new FormatBlock(),
      inTo.call(this, 'indent') && new Indent(),
      inTo.call(this, 'outdent') && new Outdent(),
      inTo.call(this, 'createLink') && (this.createLinkEl = new CreateLink()),
      inTo.call(this, 'unlink') && new Unlink(),
      inTo.call(this, 'selectAll') && new SelectAll(),
      inTo.call(this, 'cut') && new Cut(),
      inTo.call(this, 'copy') && new Copy(),
      inTo.call(this, 'superscript') && new Superscript(),
      inTo.call(this, 'subscript') && new Subscript(),
      inTo.call(this, 'fontName') && (this.fontEl = new Font(this.data)),
      inTo.call(this, 'fontSize') &&
        (this.fontSizeEl = new FontSize(this.data)),
      inTo.call(this, 'backColor') && new BackColor(this.data)
    ];

    this.toolbarBtns.forEach(it => {
      toolbarBtn.child(it.el);
      if (it) {
        it.change = (...args: Array<any>) => {
          this.change(...args);
        };
      }
    });

    this.el.on('click', () => {
      this.selection.saveRange();
    });

    this.el.children(toolbarBtn);
  }

  change(...args: Array<any>) {}

  saveRange() {}

  // Execute the given command.
  formatDoc(aCommandName: ICommandName, sValue?: string) {
    document.execCommand(aCommandName, false, sValue);
  }

  // 文档在当前状态下是否可以执行给定的命令。
  queryCommandEnabled(aCommandName: ICommandName) {
    return document.queryCommandEnabled(aCommandName);
  }

  // 检测当前选定的内容是否处于不确定的状态。
  queryCommandIndeterm(aCommandName: ICommandName) {
    return document.queryCommandIndeterm(aCommandName);
  }

  // 检测给出的命令是否已在当前选择的内容上执行
  queryCommandState(aCommandName: ICommandName) {
    return document.queryCommandState(aCommandName);
  }

  // 检测给定命令操作的当前文档、范围或选定内容的当前值。
  queryCommandValue(aCommandName: ICommandName) {
    return document.queryCommandValue(aCommandName);
  }
}
