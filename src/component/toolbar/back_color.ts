import DropdownItem from './dropdown_item';
import DropdownBackcolor from '../dropdown_backcolor';
import DataProxy from '@component/dataproxy';

export default class BackColor extends DropdownItem {
  constructor(data: DataProxy) {
    super('backColor');
  }

  getValue(it: number) {
    return it;
  }

  dropdown() {
    return new DropdownBackcolor(['#ee7700']);
  }
}
