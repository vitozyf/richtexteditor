import Item from './item';
import Dropdown from '@component/dropdown';

export default class DropdownItem extends Item {
  dd?: Dropdown;
  dropdown() {}

  getValue(v: any) {
    return v;
  }

  element() {
    const { tag } = this;
    this.dd = (this as any).dropdown() as Dropdown;
    this.dd.change = it => this.change(tag, this.getValue(it));
    return super.element().child(this.dd);
  }

  setState(v: any) {
    if (v) {
      this.value = v;
      this.dd?.setTitle(v);
    }
  }
}
