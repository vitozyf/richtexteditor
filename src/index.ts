import { h } from '@component/element';
import Editor from '@component/editor';
import DataProxy from '@component/dataproxy';
import { cssPrefix, entityName } from '@src/config';
import ToolBar from '@component/ToolBar';
import { locale } from '@src/locale/locale';

import '@assets/index.scss';

class Rteditor {
  editor: Editor;
  data: DataProxy;
  toolBar: ToolBar;

  constructor(selectors: HTMLElement | string, options: IOption = {}) {
    this.data = new DataProxy(entityName, options);

    let targetEl: HTMLElement;
    if (typeof selectors === 'string') {
      targetEl = <HTMLElement>document.querySelector(selectors);
    } else {
      targetEl = <HTMLElement>selectors;
    }
    const rootEl = h('div', `${cssPrefix}`);
    targetEl.appendChild(rootEl.el);

    this.toolBar = new ToolBar(rootEl);
    this.editor = new Editor(rootEl, this.data);
  }
}

const rteditor = (el: HTMLElement | string, options = {}) =>
  new Rteditor(el, options);

if (window) {
  window.rt_editor = rteditor;
  window.rt_editor.locale = (lang: lang, message: IMessage) =>
    locale(lang, message);
}

export default Rteditor;
export { rteditor };
