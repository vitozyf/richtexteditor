import { RtElement, h } from '@component/element';
// import { bindClickoutside, unbindClickoutside } from './event';
import { cssPrefix } from '@src/config';

export default class Dropdown extends RtElement {
  title: RtElement;
  contentEl: RtElement;
  headerEl: RtElement;
  constructor(
    title: RtElement | string,
    width: string,
    showArrow: boolean,
    placement: string,
    ...children: Array<RtElement>
  ) {
    super('div', `${cssPrefix}-dropdown ${placement}`);
    this.change = () => {};
    this.headerClick = () => {};
    if (typeof title === 'string') {
      this.title = h('div', `${cssPrefix}-dropdown-title`).children(
        h('span').setHtml(title)
        // h('i', 'iconfont arrow-down')
      );
    } else {
      this.title = title;
      this.title.addClass('arrow-left');
    }
    if (typeof title !== 'string' && showArrow) {
      this.title.addClass('arrow-left');
    }
    this.contentEl = h('div', `${cssPrefix}-dropdown-content`)
      .setCss('width', width)
      .hide();

    this.setContentChildren(...children);

    this.headerEl = h('div', `${cssPrefix}-dropdown-header`);
    this.headerEl
      .on('click', () => {
        if (this.contentEl.getCss('display') !== 'block') {
          this.show();
        } else {
          this.hide();
        }
      })
      .children(
        this.title,
        showArrow
          ? h('i', `${cssPrefix}-dropdown-header-icon iconfont arrow-down`)
          : h('span').setHtml('')
      );
    this.children(this.headerEl, this.contentEl);
  }

  headerClick() {}

  setContentChildren(...children: Array<RtElement>) {
    this.contentEl.setHtml('');
    if (children.length > 0) {
      this.contentEl.children(...children);
    }
  }

  setTitle(title: string) {
    this.title.setHtml(title);
    this.hide();
  }

  show() {
    const { contentEl } = this;
    contentEl.show();
    this.parent()?.active();
    // bindClickoutside(this.parent(), () => {
    //   this.hide();
    // });
    return this;
  }

  hide() {
    this.parent()?.active(false);
    this.contentEl.hide();
    // unbindClickoutside(this.parent());
    return this;
  }
}
