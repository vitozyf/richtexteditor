import Dropdown from '@component/dropdown';
import Icon from '@component/toolbar/icon';
import { cssPrefix } from '@src/config';
import { h } from '@component/element';

export default class DropdownBackcolor extends Dropdown {
  constructor(backColorData: Array<string>) {
    const title = new Icon('backColor');
    const colors = h('div', `${cssPrefix}-color-item`).setCss({
      backgroundColor: '#ee7700',
      width: '20px',
      height: '20px'
    });
    super(title, '200px', true, 'bottom-left', colors);
  }
}
