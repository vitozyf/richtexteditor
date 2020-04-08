import Item from '@component/toolbar/item';
import Icon from '@component/toolbar/icon';

export default class IconItem extends Item {
  element() {
    return super
      .element()
      .child(new Icon(this.tag))
      .on('click', () => this.change(this.tag, this.value));
  }

  setState(disabled: boolean) {
    this.el.disabled(disabled);
  }
}
