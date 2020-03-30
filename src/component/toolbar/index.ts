import { RtElement } from '@component/element';
import { h } from '@component/element';
import { cssPrefix } from '@src/config';
import Icon from '@component/toolbar/icon';
import DataProxy from '@component/dataproxy';
import { getData } from '@utils/index';

export default class ToolBar {
  el: RtElement;
  toolbarBtns: Array<Icon>;
  data: DataProxy;

  constructor(targetEl: RtElement, data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-toolbar`);

    this.init();

    const { toolbars } = this.data.options;
    this.toolbarBtns = (<Array<string>>toolbars).map(name => {
      return new Icon(this.el, name);
    });
    targetEl.children(this.el);
  }

  init() {
    this.el.on('click', (event: Event) => {
      const aCommandName = getData(event.target, 'aCommandName');
      if (aCommandName) {
        this.formatDoc(<ICommandName>aCommandName);
      }
    });
  }

  formatDoc(aCommandName: ICommandName, sValue?: any) {
    document.execCommand(aCommandName, false, sValue);
    this.el.focus();
  }
}
