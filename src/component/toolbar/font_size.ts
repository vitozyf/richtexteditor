import DropdownItem from './dropdown_item';
import DropdownFontsize from '../dropdown_fontsize';
import DataProxy from '@component/dataproxy';
let fontsize: Array<number>;
let defaultFontsize: string;
export default class Format extends DropdownItem {
  constructor(data: DataProxy) {
    const fontData = data.getData();
    fontsize = fontData.fontsize;
    defaultFontsize = <string>fontData.defaultFontsize;
    super('fontSize');
  }

  getValue(it: number) {
    return it;
  }

  dropdown() {
    return new DropdownFontsize(fontsize, defaultFontsize);
  }
}
