declare type EventNames =
  | 'click'
  | 'blur'
  | 'change'
  | 'copy'
  | 'dblclick'
  | 'drag'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'dragstart'
  | 'drop'
  | 'error'
  | 'focus'
  | 'input'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'load'
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'resize'
  | 'scroll'
  | 'touchcancel'
  | 'touchend'
  | 'touchmove'
  | 'touchstart';

declare type EventHandler = (
  this: HTMLElement,
  event:
    | Event
    | MouseEvent
    | UIEvent
    | FocusEvent
    | ClipboardEvent
    | DragEvent
    | ErrorEvent
    | KeyboardEvent
    | TouchEvent
) => any;
