import Editor from '@component/editor';
import { RtElement } from '@component/element';
import { UA } from '@utils/index';
export default class Selection {
  _currentRange?: null | Range;
  editor: Editor;
  constructor(editor: Editor) {
    this._currentRange = null;
    this.editor = editor;
  }

  getRange() {
    return this._currentRange;
  }

  getSelectionContainerElem(range?: Range) {
    if (!range) {
      return;
    }
    range = range || this._currentRange;
    let elem;
    if (range) {
      elem = range.commonAncestorContainer;
      // nodeType === 1: An Element node like <p> or <div>.
      return new RtElement(
        <HTMLElement>(elem.nodeType === 1 ? elem : elem.parentNode)
      );
    }
  }

  saveRange(_range?: Range) {
    if (_range) {
      this._currentRange = _range;
      return this;
    }

    const selection = window.getSelection();
    if (selection?.rangeCount === 0) {
      return this;
    }
    const range = selection?.getRangeAt(0);

    // Determine whether the selection is part of the edit
    const $containerElem = this.getSelectionContainerElem(range);
    if (!$containerElem) {
      return this;
    }

    // Determine if the selection is in a non-editable area
    if (
      $containerElem.getAttr('contenteditable') === 'false' ||
      $containerElem.parentUntil('[contenteditable=false]')
    ) {
      return this;
    }

    const editor = this.editor;
    const $textElem = editor.el.el;
    if ($textElem.contains($containerElem.el)) {
      this._currentRange = range;
    }
  }

  // Folding district
  collapseRange(toStart: boolean = false) {
    const range = this._currentRange;
    if (range) {
      range.collapse(toStart);
    }
  }

  // The text of the selected area
  getSelectionText() {
    const range = this._currentRange;
    if (range) {
      return (<Range>this._currentRange).toString();
    }
    return '';
  }

  getSelectionStartElem(range: Range) {
    range = range || this._currentRange;
    let elem;
    if (range) {
      elem = range.startContainer;
      return new RtElement(
        <HTMLElement>(elem.nodeType === 1 ? elem : elem.parentNode)
      );
    }
  }
  getSelectionEndElem(range: Range) {
    range = range || this._currentRange;
    let elem;
    if (range) {
      elem = range.endContainer;
      return new RtElement(
        <HTMLElement>(elem.nodeType === 1 ? elem : elem.parentNode)
      );
    }
  }

  // Whether the selection is empty
  isSelectionEmpty() {
    const range = this._currentRange;
    if (range && range.startContainer) {
      if (range.startContainer === range.endContainer) {
        if (range.startOffset === range.endOffset) {
          return true;
        }
      }
    }
    return false;
  }

  // Restore district
  restoreSelection() {
    const selection = window.getSelection();
    const { _currentRange } = this;
    if (selection && _currentRange) {
      selection.removeAllRanges();
      selection.addRange(_currentRange);
    }
  }

  // Create a blank (that is, &#8203 characters) selection
  createEmptyRange() {
    // const editor = this.editor;
    const range = this.getRange();
    // let $elem;
    if (!range) {
      return;
    }
    if (!this.isSelectionEmpty()) {
      return;
    }

    try {
      if (UA.isWebkit()) {
        document.execCommand('insertHTML', false, '&#8203;');
        range.setEnd(range.endContainer, range.endOffset + 1);
        this.saveRange(range);
      }
    } catch (ex) {
      console.log('selection - createEmptyRange', ex);
    }
  }

  // Set the selection based on $Elem
  createRangeByElem($elem: RtElement, toStart?: boolean, isContent?: boolean) {
    const elem = $elem.el;
    const range = document.createRange();

    if (isContent) {
      range.selectNodeContents(elem);
    } else {
      range.selectNode(elem);
    }

    if (typeof toStart === 'boolean') {
      range.collapse(toStart);
    }
    this.saveRange(range);
  }
}
