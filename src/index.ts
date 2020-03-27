import { h } from '@component/element';
import Editor from '@component/editor';
import DataProxy from '@component/dataproxy';
import { cssPrefix, entityName } from '@src/config';
import ToolBar from '@component/ToolBar';

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

    this.editor = new Editor(rootEl, this.data);
    this.toolBar = new ToolBar(rootEl);
  }
}

const rteditor = (el: HTMLElement | string, options = {}) =>
  new Rteditor(el, options);

if (window) {
  window.rt_editor = rteditor;
  // window.rt_editor.locale = (lang, message) => locale(lang, message);
}

export default Rteditor;
export { rteditor };
