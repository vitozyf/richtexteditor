interface IReElementScroll {
  top?: number;
  left?: number;
}

class RtElement {
  public el: HTMLElement;

  xclickoutside?: ((evt: Event | MouseEvent) => void) | null;

  constructor(tag: string | HTMLElement, className: string = '') {
    if (typeof tag === 'string') {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }
  }

  on(eventNames: EventNames, handler: (p: Event) => void) {
    const [fen, ...oen] = eventNames.split('.');
    let eventName = fen;
    if (
      eventName === 'mousewheel' &&
      /Firefox/i.test(window.navigator.userAgent)
    ) {
      eventName = 'DOMMouseScroll';
    }
    this.el.addEventListener(
      eventName,
      (evt: Event) => {
        handler(evt);
        for (let i = 0; i < oen.length; i += 1) {
          const k = oen[i];
          if (k === 'left' && (<MouseEvent>evt).button !== 0) {
            return;
          }
          if (k === 'right' && (<MouseEvent>evt).button !== 2) {
            return;
          }
          if (k === 'stop') {
            evt.stopPropagation();
          }
        }
      },
      false
    );
    return this;
  }

  offset(value?: {}) {
    if (value !== undefined) {
      type ObjKey = keyof typeof value;
      Object.keys(value).forEach(k => {
        this.setCss(k, `${value[k as ObjKey]}px`);
      });
      return this;
    }
    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = this.el;
    return {
      top: offsetTop,
      left: offsetLeft,
      height: offsetHeight,
      width: offsetWidth
    };
  }

  scroll(v?: IReElementScroll) {
    const { el } = this;
    if (v !== undefined) {
      if (v.left !== undefined) {
        el.scrollLeft = v.left;
      }
      if (v.top !== undefined) {
        el.scrollTop = v.top;
      }
    }
    return { left: el.scrollLeft, top: el.scrollTop };
  }

  box() {
    return this.el.getBoundingClientRect();
  }

  parent() {
    const parentNode = this.el.parentNode as HTMLElement;
    if (parentNode) {
      return new RtElement(parentNode);
    }
    return null;
  }

  children(...eles: Array<RtElement | Text>) {
    if (arguments.length === 0) {
      return this;
    }
    eles.forEach(ele => this.child(ele));
    return this;
  }

  getChildren() {
    const elem = this.el;
    if (!elem) {
      return null;
    }

    return h(<any>elem.children);
  }

  removeChild(el: HTMLElement) {
    this.el.removeChild(el);
  }

  child(arg: RtElement | Text) {
    let ele: Element | Text;
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg);
    } else if (arg instanceof RtElement) {
      ele = arg.el;
    } else {
      ele = document.createTextNode('');
    }
    this.el.appendChild(ele);
    return this;
  }

  contains(ele: HTMLElement) {
    return this.el.contains(ele);
  }

  className(v?: string) {
    if (v !== undefined) {
      this.el.className = v;
      return this;
    }
    return this.el.className;
  }

  addClass(name: string) {
    this.el.classList.add(name);
    return this;
  }

  hasClass(name: string) {
    return this.el.classList.contains(name);
  }

  removeClass(name: string) {
    this.el.classList.remove(name);
    return this;
  }

  toggle(cls: string = 'active') {
    return this.toggleClass(cls);
  }

  toggleClass(name: string) {
    return this.el.classList.toggle(name);
  }

  active(flag: boolean = true, cls: string = 'active') {
    if (flag) this.addClass(cls);
    else this.removeClass(cls);
    return this;
  }

  checked(flag: boolean = true) {
    this.active(flag, 'checked');
    return this;
  }

  disabled(flag: boolean = true) {
    if (flag) this.addClass('disabled');
    else this.removeClass('disabled');
    return this;
  }

  getAttr(key: string) {
    return this.el.getAttribute(key);
  }

  setAttr(key: string | any, value?: string) {
    if (value !== undefined) {
      this.el.setAttribute(key as string, value);
    } else {
      Object.keys(key).forEach((k: string) => {
        const kv = key[k];
        if (key.hasOwnProperty(k)) {
          this.el.setAttribute(k, kv);
        }
      });
    }
    return this;
  }

  removeAttr(key: string) {
    this.el.removeAttribute(key);
    return this;
  }

  getHtml() {
    return this.el.innerHTML;
  }

  setHtml(content?: string) {
    if (content !== undefined) {
      this.el.innerHTML = content;
    }
    return this;
  }

  getText() {
    return this.el.innerText;
  }

  getValue() {
    return (<HTMLInputElement>this.el).value;
  }

  setValue(v: string) {
    (<HTMLInputElement>this.el).value = v;
    return this;
  }

  focus() {
    this.el.focus();
  }

  cssRemoveKeys(...keys: Array<string>) {
    keys.forEach(k => this.el.style.removeProperty(k));
    return this;
  }

  getCss(name: string) {
    const { style } = this.el;
    type ObjKey = keyof typeof style;
    return this.el.style[name as ObjKey];
  }

  setCss(name: string | any, value?: string) {
    if (value === undefined && typeof name !== 'string') {
      Object.keys(<Object>name).forEach((k: string) => {
        (<any>this.el.style)[k] = name[k];
      });
      return this;
    }
    if (value !== undefined) {
      this.el.style[name] = value;
      return this;
    }
    return this;
  }

  computedStyle() {
    return window.getComputedStyle(this.el, null);
  }

  show() {
    this.setCss('display', 'block');
    return this;
  }

  hide() {
    this.setCss('display', 'none');
    return this;
  }

  // Find the parent node that matches the selector
  parentUntil(selector: string, _currentElem?: HTMLElement): any {
    const results = document.querySelectorAll(selector);
    const length = results.length;
    if (!length) {
      return null;
    }

    const elem = _currentElem || this.el;
    if (elem.nodeName === 'BODY') {
      return null;
    }
    const parent: HTMLElement = <HTMLElement>elem.parentElement;
    for (let i = 0; i < length; i++) {
      if (parent === results[i]) {
        return new RtElement(parent);
      }
    }
    return this.parentUntil(selector, parent);
  }
}

const h = (tag: string | HTMLElement, className: string = '') =>
  new RtElement(tag, className);

export { RtElement, h };
