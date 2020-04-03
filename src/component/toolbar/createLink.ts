// import IconItem from '@src/component/toolbar/icon_item';
import DropdownItem from '@component/toolbar/dropdown_item';
import DropdownLink from '@component/toolbar/dropdown_link';
// export default class CreateLink extends IconItem {
//   constructor() {
//     super('createLink', '', '');
//   }
// }

export default class CreateLink extends DropdownItem {
  constructor() {
    super('createLink');
  }

  getValue(it: any) {
    return it;
  }

  dropdown() {
    return new DropdownLink();
  }
}
