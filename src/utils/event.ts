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
