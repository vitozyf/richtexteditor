import { cssPrefix } from '@src/config';
import tooltip from '@src/component/tooltip';
import { h, RtElement } from '@component/element';
import { t } from '@locale/locale';

export default class Item {
  tip: string;
  tag: string;
  shortcut: string | undefined;
  value: string | undefined;
  el: RtElement;

  constructor(tag: string, shortcut?: string, value?: string) {
    console.log(tag);
    this.tip = t(`toolbar.${tag}`);
    if (shortcut) this.tip += ` (${shortcut})`;
    this.tag = tag;
    this.shortcut = shortcut;
    this.value = value;
    this.el = this.element();
    // this.change = () => {};
  }

  element() {
    const { tip } = this;
    return h('div', `${cssPrefix}-toolbar-btn`)
      .on('mouseenter', evt => {
        tooltip(tip, <HTMLElement>evt.target);
      })
      .setAttr('data-tooltip', tip);
  }

  setState(disabled: boolean) {}
}
