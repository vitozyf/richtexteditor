import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';

export default class Editor {
  el: RtElement;
  data: DataProxy;
  eventMap: Map<IEditorEventName, (...args: Array<any>) => void>;
  value: string = '';

  constructor(data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-editor`);
    this.eventMap = new Map();
    this.init();
  }

  private init() {
    const { data, el } = this;
    const lineHeight = data.options.style?.font?.lineheight;
    el.setAttr({
      contenteditable: true
    })
      .setCss({ lineHeight })
      .setHtml(data.options.initialContent)
      .on('focus', event => {
        this.value = this.el.getText();
        this.trigger('editor-focus', {
          event,
          text: el.getText(),
          html: el.getHtml()
        });
      })
      .on('blur', event => {
        this.trigger('editor-blur', {
          event,
          text: el.getText(),
          html: el.getHtml()
        });

        if (this.value !== el.getText()) {
          this.value = el.getText();
          this.trigger('editor-change', {
            event,
            text: el.getText(),
            html: el.getHtml()
          });
        }
      })
      .on('input', () => {
        this.setBottomBarMessage();
      });

    // .on('compositionstart', event => {
    //   console.log(11, event);
    // })
    // .on('compositionend', event => {
    //   console.log(22, event);
    // });
  }

  on(eventName: IEditorEventName, func: (...args: Array<any>) => void) {
    this.eventMap.set(eventName, func);
    return this;
  }

  trigger(eventName: IEditorEventName, ...args: Array<any>) {
    const { eventMap } = this;
    if (eventMap.has(eventName)) {
      (<(...args: Array<any>) => void>eventMap.get(eventName)).call(
        this,
        ...args
      );
    }
  }

  clear() {
    this.el.setHtml('');
  }

  setBottomBarMessage() {}
}
