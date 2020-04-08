import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';

class BottomBar {
  el: RtElement;
  data: DataProxy;

  constructor(data: DataProxy) {
    this.data = data;
    this.el = h('div', `${cssPrefix}-bottombar`);
    this.init();
  }

  private init() {
    const { data } = this;
    const { wordCountMsg } = data.options;

    const wordCountMsgFormat = (<string>wordCountMsg)
      .replace(/\{\#count\}/, '10')
      .replace(/\{\#leave\}/, '20');
    this.el.setCss({
      backgroundColor: '#f2f2f2',
      padding: '5px'
    });
    const message = h('div', `${cssPrefix}-bottombar-message`);
    message
      .setCss({
        textAlign: 'right',
        fontSize: '12px',
        color: '#aaa'
      })
      .setHtml(wordCountMsgFormat);
    this.el.children(message);
  }
}

export default BottomBar;
