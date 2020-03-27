import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import { ReElement } from '@component/element';
import { t } from '../locale/locale';
function editorRowKeydownHandler(event: KeyboardEvent) {
  if (event.keyCode === 13) {
    console.log(event.keyCode);
  }
}

export default class Row {
  public name: string = 'editorRow';
  el: ReElement;
  constructor(targetEl: ReElement) {
    this.el = h('p', `${cssPrefix}-row`);
    this.el
      .on('keydown', <EventHandler>editorRowKeydownHandler)
      .attr('contenteditable', 'true');

    this.el.html(t('toolbar.undo'));
    targetEl.children(this.el);
  }
}
