import Dropdown from '@component/dropdown';
import { h } from '@component/element';
// import { baseFonts } from '../core/font';
import { cssPrefix } from '@src/config';

export default class DropdownFont extends Dropdown {
  constructor(
    fontfamilyData: Array<{
      key: string;
      title: string;
    }>
  ) {
    const nfonts = fontfamilyData.map(it =>
      h('div', `${cssPrefix}-item`)
        .on('click', () => {
          this.setTitle(it.title);
          this.change(it);
        })
        .child(h('span').setHtml(it.title))
    );
    super(fontfamilyData[0].title, '140px', true, 'bottom-left', ...nfonts);
  }
}
