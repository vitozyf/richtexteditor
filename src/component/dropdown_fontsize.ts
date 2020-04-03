import Dropdown from '@component/dropdown';
import { h } from '@component/element';
import { cssPrefix } from '@src/config';

export default class DropdownFontSize extends Dropdown {
  constructor(fontsize: Array<number>, defaultFontsize: string) {
    const nfontSizes = fontsize.map(it =>
      h('div', `${cssPrefix}-item`)
        .on('click', () => {
          this.setTitle(`${it}`);
          this.change(it);
        })
        .child(h('span').setHtml(it.toString()))
    );
    super(defaultFontsize, '60px', true, 'bottom-left', ...nfontSizes);
  }
}
