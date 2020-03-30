import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';

export default class Iframe {
  el: RtElement;
  data: DataProxy;
  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('iframe', `${cssPrefix}-iframe`);
    this.el
      .on('load', () => {
        this.setIframeContent();
      })
      .setAttr({
        title: 'editor-box',
        name: 'editorBox',
        width: '100%',
        height: '100%',
        allow: 'fullscreen',
        allowfullscreen: 'true'
      })
      .setCss({
        border: 'none'
      });

    targetEl.children(this.el);
  }

  getIframeWindow(): Window | null {
    let doc;
    console.log(this.el.el, (<HTMLIFrameElement>this.el.el).contentWindow);
    if ((<HTMLIFrameElement>this.el.el).contentWindow) {
      return (<HTMLIFrameElement>this.el.el).contentWindow;
    }

    if ((<any>this.el.el).window) {
      return (<any>this.el.el).window;
    }

    if (!doc && (<HTMLIFrameElement>this.el.el).contentDocument) {
      doc = (<HTMLIFrameElement>this.el.el).contentDocument;
    }

    if (!doc && (<any>this.el.el).document) {
      doc = (<any>this.el.el).document;
    }

    if (doc && doc.defaultView) {
      return doc.defaultView;
    }

    if (doc && (<any>doc).parentWindow) {
      return (<any>doc).parentWindow;
    }

    return null;
  }

  setIframeContent() {
    const htmlContent = '<body>Foo</body>';
    if (typeof (<HTMLIFrameElement>this.el.el).srcdoc !== 'undefined') {
      (<HTMLIFrameElement>this.el.el).srcdoc = htmlContent;
    } else {
      const IframeWindow = <Window>this.getIframeWindow();
      console.log(IframeWindow);
      IframeWindow.document.open();
      IframeWindow.document.write(htmlContent);
      IframeWindow.document.close();
    }
  }

  setIframeHTML(iframe: HTMLIFrameElement, html: string) {
    if (typeof iframe.srcdoc !== 'undefined') {
      iframe.srcdoc = html;
    } else {
      //  iframe.sandbox = 'allow-same-origin'; // read-only
      (<Window>iframe.contentWindow).document.open();
      (<Window>iframe.contentWindow).document.write(html);
      (<Window>iframe.contentWindow).document.close();
    }
  }

  // 	iframeSrc(){
  // 		javascript:void(function(){
  // 			document.open();
  // 			document.write("<!DOCTYPE html><html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}
  // body{margin:8px;font-family:sans-serif;font-size:16px;}body.empty:before{content:attr(placeholder);position:absolute;color:#999;}p{margin:5px 0;}</style><link rel='stylesheet' type='text/css' href='/static/NEditor/themes/iframe.css'/></head><body class='view' ></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant0'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>");
  // document.close();}())
  // 	}
}
