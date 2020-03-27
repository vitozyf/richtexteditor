interface IReElementScroll {
  top?: number;
  left?: number;
}

class ReElement {
  constructor(tag: string | HTMLElement, className: string = '') {
    if (typeof tag === 'string') {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }
  }
  public el: HTMLElement;

  on(eventNames: EventNames, handler: EventHandler) {
    // const [fen, ...oen] = eventNames.split('.');
    // let eventName = fen;
    // if (
    //   eventName === 'mousewheel' &&
    //   /Firefox/i.test(window.navigator.userAgent)
    // ) {
    //   eventName = 'DOMMouseScroll';
    // }
    // this.el.addEventListener(eventName, (evt: any) => {
    //   handler(evt);
    //   for (let i = 0; i < oen.length; i += 1) {
    //     const k = oen[i];
    //     if (k === 'left' && evt.button !== 0) {
    //       return;
    //     }
    //     if (k === 'right' && evt.button !== 2) {
    //       return;
    //     }
    //     if (k === 'stop') {
    //       evt.stopPropagation();
    //     }
    //   }
    // });
    if (this.el.addEventListener) {
      this.el.addEventListener(eventNames, handler, false);
    } else {
      (<any>this.el).attachEvent('on' + eventNames, handler);
    }
    return this;
  }

  offset(value?: {}) {
    if (value !== undefined) {
      type ObjKey = keyof typeof value;
      Object.keys(value).forEach(k => {
        this.css(k, `${value[k as ObjKey]}px`);
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
      return new ReElement(parentNode);
    }
    return null;
  }

  children(...eles: Array<ReElement>) {
    if (arguments.length === 0) {
      return this.el.childNodes;
    }
    eles.forEach(ele => this.child(ele));
    return this;
  }

  removeChild(el: HTMLElement) {
    this.el.removeChild(el);
  }

  child(arg: ReElement | Text) {
    let ele: Element | Text;
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg);
    } else if (arg instanceof ReElement) {
      ele = arg.el;
    } else {
      ele = document.createTextNode('');
    }
    this.el.appendChild(ele);
    return this;
  }

  // Find out if a ele element is a descendant of a this.el element:
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

  // key, value
  // key
  // {k, v}...
  attr(key: string | any, value?: string) {
    if (value !== undefined) {
      this.el.setAttribute(key as string, value);
    } else {
      if (typeof key === 'string') {
        return this.el.getAttribute(key);
      }
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

  html(content: string) {
    if (content !== undefined) {
      this.el.innerHTML = content;
      return this;
    }
    return this.el.innerHTML;
  }

  val(v: string) {
    if (v !== undefined) {
      (<HTMLInputElement>this.el).value = v;
      return this;
    }
    return (<HTMLInputElement>this.el).value;
  }

  focus() {
    this.el.focus();
  }

  cssRemoveKeys(...keys: Array<string>) {
    keys.forEach(k => this.el.style.removeProperty(k));
    return this;
  }

  // css( propertyName )
  // css( propertyName, value )
  // css( properties )
  css(name: string | any, value?: string) {
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
    return this.el.style[name];
  }

  computedStyle() {
    return window.getComputedStyle(this.el, null);
  }

  show() {
    this.css('display', 'block');
    return this;
  }

  hide() {
    this.css('display', 'none');
    return this;
  }
}

const h = (tag: string, className: string = '') =>
  new ReElement(tag, className);

export { ReElement, h };
