import { h, RtElement } from '@component/element';
import Editor from '@component/editor';
import DataProxy from '@component/dataproxy';
import { cssPrefix, entityName } from '@src/config';
import ToolBar from '@component/toolbar';
import BottomBar from './component/bottombar';
import { locale } from '@src/locale/locale';
import Selection from '@core/selection';
import '@src/assets/iconfont';
import '@assets/index.scss';
let id: number = 0;

function saveRange(this: Rteditor) {
  const { toolBar } = <Rteditor>this;

  // toolbar change
  toolBar.saveRange = this.selection.saveRange;
}

function toolbarChange(this: Rteditor, type: string, value: any) {
  this.selection.saveRange();
  this.selection.restoreSelection();
  this.toolBar.formatDoc(<ICommandName>type, value);
}

function editorInitEvents(this: Rteditor) {
  const { toolBar } = <Rteditor>this;

  // toolbar change
  toolBar.change = (type: string, value: any) =>
    toolbarChange.call(this, type, value);
}

class Rteditor {
  id: number = id++;
  editor: Editor;
  data: DataProxy;
  toolBar: ToolBar;
  bottomBar: BottomBar;
  selection: Selection;

  constructor(selectors: HTMLElement | string, options: IOption = {}) {
    if (!selectors) {
      throw new Error('no selector is passed in');
    }
    this.data = new DataProxy(entityName, options);

    let targetEl: HTMLElement;
    if (typeof selectors === 'string') {
      targetEl = <HTMLElement>document.querySelector(selectors);
    } else {
      targetEl = <HTMLElement>selectors;
    }
    const rootEl = h('div', `${cssPrefix}`);
    this.editor = new Editor(this.data);
    this.selection = new Selection(this.editor);
    this.toolBar = new ToolBar(this.data, this.selection);
    this.bottomBar = new BottomBar(this.data);

    rootEl.children(this.toolBar.el);
    rootEl.children(this.editor.el);
    rootEl.children(this.bottomBar.el);

    targetEl.appendChild(rootEl.el);

    this.init(rootEl);
    this.initSelection(true);
    this.ready();
  }

  init(rootEl: RtElement) {
    const { width, height } = <IOptionView>this.data.options.view;
    const rootWidth =
      typeof width === 'function'
        ? `${width()}px`
        : typeof width === 'string'
        ? width
        : `${width}px`;
    const rootHeight =
      typeof height === 'function'
        ? `${height()}px`
        : typeof height === 'string'
        ? height
        : `${height}px`;
    const zIndex = this.data.options.zIndex;
    rootEl.setCss({
      width: rootWidth,
      height: rootHeight,
      zIndex
    });

    editorInitEvents.call(this);
    saveRange.call(this);

    this.toolBar.formatDoc('fontName', this.data.getFontfamilyData());

    document.execCommand('defaultParagraphSeparator', false, 'p');
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('fontSize', false, this.data.getFontSizeData());
  }
  initSelection(addNewLine?: boolean) {
    const $textElem = this.editor.el;
    const $children = <RtElement>$textElem.getChildren();

    if ((<any>$children.el).length === 0) {
      // If the editor area is empty, add an empty line and reset the selection
      $textElem.children(h('p').children(h('br')));
      this.initSelection();
      return;
    }

    const $last = (<any>$children.el)[(<any>$children.el).length - 1];

    if (addNewLine) {
      // add new empty line
      const html: string = $last.innerHTML.toLowerCase();
      const nodeName = $last.nodeName;
      if ((html !== '<br>' && html !== '<br/>') || nodeName !== 'P') {
        $textElem.children(h('p').children(h('br')));
        this.initSelection();
        return;
      }
    }

    this.selection.createRangeByElem(h($last), false, true);
    this.selection.restoreSelection();
  }

  // callback
  ready(cb?: () => {}) {
    cb && cb();
  }

  on(eventName: IEditorEventName, func: () => void) {
    this.editor.on(eventName, func);
    return this;
  }

  setContent(value: string, isAppendTo?: boolean) {
    let html = value;
    if (isAppendTo) {
      const currentValue = this.getContent(true);
      html = `${currentValue}${value}`;
    }
    this.editor.el.setHtml(html);
  }

  getContent(isHtml?: boolean) {
    if (isHtml) {
      return this.editor.el.getHtml();
    }
    return this.editor.el.getText();
  }

  static locale(lang: lang, message: IMessage) {
    locale(lang, message);
  }
}

const rteditor = (el: HTMLElement | string, options = {}) =>
  new Rteditor(el, options);

if (window) {
  window.rt_editor = rteditor;
  window.rt_editor.locale = (lang: lang, message: IMessage) => {
    return locale(lang, message);
  };
}

export default Rteditor;
export { rteditor };
