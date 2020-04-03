import { RtElement } from '@src/component/element';

/* istanbul ignore next */
export const bind = (() => {
  if (<() => {}>document.addEventListener) {
    return (element: HTMLElement, event: string, handler: EventHandler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return (element: HTMLElement, event: string, handler: EventHandler) => {
      if (element && event && handler) {
        (<any>element).attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const unbind = (() => {
  if (<() => {}>document.addEventListener) {
    return (element: HTMLElement, event: string, handler: EventHandler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return (element: HTMLElement, event: string, handler: EventHandler) => {
      if (element && event) {
        (<any>element).detachEvent('on' + event, handler);
      }
    };
  }
})();

export function bindClickoutside(
  el: RtElement,
  cb: (target: RtElement) => void
) {
  el.xclickoutside = (evt: MouseEvent | Event) => {
    // ignore double click
    // console.log('evt:', evt);
    if ((<MouseEvent>evt).detail === 2 || el.contains(<HTMLElement>evt.target))
      return;
    if (cb) cb(el);
    else {
      el.hide();
      unbindClickoutside(el);
    }
  };
  bind(window.document.body, 'click', <EventHandler>el.xclickoutside);
}

export function unbindClickoutside(el: RtElement) {
  if (el.xclickoutside) {
    unbind(window.document.body, 'click', el.xclickoutside);
    el.xclickoutside = null;
  }
}
