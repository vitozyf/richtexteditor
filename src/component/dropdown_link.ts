import Dropdown from '@component/dropdown';
import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import Button from '@component/button';
import Input from '@component/input';
import { t } from '@locale/locale';
import Icon from '@component/toolbar/icon';
let inputEl: RtElement;

export default class DropdownLink extends Dropdown {
  constructor() {
    const title = new Icon('createLink');
    const linkDialog = h('div', `${cssPrefix}-createLink`);
    inputEl = new Input({ placeholder: 'https://' });
    const btn = new Button('button', 'text', 'rtpr')
      .setHtml(t('button.save'))
      .on('click', () => {
        this.change((<HTMLInputElement>inputEl.el).value);
        this.hide();
      });
    const header = h('div', `${cssPrefix}-createLink-header`);
    header.children(h('span', 'text').setHtml(t('button.link')));
    linkDialog
      .children(
        header,
        inputEl,
        h('div', `${cssPrefix}-createLink-footer rtclear`).children(btn)
      )
      .setCss({
        padding: '0 5px'
      });
    super(title, '200px', false, 'bottom-left', linkDialog);
  }

  // showHandler() {
  //   const TimeId = setTimeout(() => {
  //     inputEl.el.focus();
  //     clearTimeout(TimeId);
  //   }, 250);
  // }
}
