import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';

export default class Editor {
  el: RtElement;
  data: DataProxy;
  eventMap: Map<IEditorEventName, (...args: Array<any>) => void>;

  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-editor`);
    this.init();
    // ----------
    // this.el = h('div', `${cssPrefix}-editor`);
    // const MidasFormEl = h('iframe', `${cssPrefix}-MidasForm`);
    // MidasFormEl.setAttr({
    //   src: 'about:blank'
    // }).on('load', () => {
    //   const contentDocument = (<HTMLIFrameElement>MidasFormEl.el)
    //     .contentDocument;
    //   if (contentDocument) {
    //     contentDocument.designMode = 'on';
    //     contentDocument.body.style.margin = '0';
    //   }
    // });
    // this.el.children(MidasFormEl);
    // ----------
    this.eventMap = new Map();
    targetEl.children(this.el);
  }

  private init() {
    const { data, el } = this;
    el.setCss({
      fontSize: `${data.options.style?.font?.size}px`
    })
      .setAttr({
        contenteditable: true
      })
      .setHtml(data.options.initialContent)
      .on('focus', event => {
        this.trigger('editor-focus', {
          event,
          text: el.el.textContent,
          html: el.getHtml()
        });
      })
      .on('blur', event => {
        this.trigger('editor-blur', {
          event,
          text: el.el.textContent,
          html: el.getHtml()
        });

        // if (this.value !== el.getHtml()) {
        //   this.trigger('editor-change', {
        //     event,
        //     text: el.el.textContent,
        //     html: el.getHtml()
        //   });
        // }
      });
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
