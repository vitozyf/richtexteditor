import Dropdown from '@component/dropdown';
import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
export default class DropdownLink extends Dropdown {
  constructor() {
    const title = h('i', 'iconfont createLink');
    const linkDialog = h('i', `${cssPrefix}-createLink`);
    let inputEl: RtElement;
    linkDialog.children(
      (inputEl = h('input', `${cssPrefix}-linkinput`)),
      h('button', `${cssPrefix}-linkbutton`)
        .setHtml('保存')
        .on('click', () => {
          this.change((<HTMLInputElement>inputEl.el).value);
        })
    );
    super(title, '200px', false, 'bottom-left', linkDialog);
  }
}
