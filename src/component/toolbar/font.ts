import DropdownItem from '@component/toolbar/dropdown_item';
import DropdownFont from '@component/dropdown_font';
import DataProxy from '@component/dataproxy';
let fontfamilyData: Array<{
  key: string;
  title: string;
}>;
export default class Font extends DropdownItem {
  constructor(data: DataProxy) {
    fontfamilyData = data.options.fontfamily as Array<{
      key: string;
      title: string;
    }>;
    super('fontfamily');
  }

  getValue(it: any) {
    return it.key;
  }

  dropdown() {
    return new DropdownFont(fontfamilyData);
  }
}
