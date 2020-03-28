import { h, ReElement } from '@component/element';
import { cssPrefix } from '@src/config';

export default class Iframe {
  el: ReElement;
  constructor(targetEl: ReElement) {
    this.el = h('iframe', `${cssPrefix}-iframe`);
    this.el
      .on('load', () => {
        console.log(123);
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
}
