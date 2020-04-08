import DropdownItem from '@component/toolbar/dropdown_item';
import DropdownLink from '@src/component/dropdown_link';

export default class CreateLink extends DropdownItem {
  constructor() {
    super('createLink');
  }

  saveRange() {}

  getValue(it: any) {
    return it;
  }

  dropdown() {
    return new DropdownLink();
  }
}
