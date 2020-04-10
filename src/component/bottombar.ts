import { h, RtElement } from '@component/element';
import { cssPrefix } from '@src/config';
import DataProxy from '@component/dataproxy';
import Editor from '@component/editor';
class BottomBar {
  el: RtElement;
  data: DataProxy;
  editor: Editor;
  message: RtElement;

  constructor(data: DataProxy, editor: Editor) {
    this.data = data;
    this.editor = editor;
    this.el = h('div', `${cssPrefix}-bottombar`);
    this.message = h('div', `${cssPrefix}-bottombar-message`);
    this.el.children(this.message);
    this.setMessage();
  }

  setMessage() {
    const { data, editor } = this;
    const { wordCountMsg } = data.options;
    let value = editor.el.getText();
    const maximumWords = data.options.maximumWords as number;
    let remainWords = maximumWords - value.length;

    // if (remainWords <= 0) {
    //   editor.el.setText(value.substring(0, maximumWords));
    // }

    // value = editor.el.getText();
    // remainWords = maximumWords - value.length;

    const wordCountMsgFormat = (<string>wordCountMsg)
      .replace(/\{\#count\}/, value.length.toString())
      .replace(/\{\#leave\}/, remainWords.toString());

    this.message.setHtml(wordCountMsgFormat);
  }
}

export default BottomBar;
