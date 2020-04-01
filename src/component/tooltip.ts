/* global document */
import { h } from '@component/element';
import { bind } from '@utils/event';
import { cssPrefix } from '@src/config';

export default function tooltip(html: string, target: HTMLElement) {
  // if (target.classList.contains('active')) {
  //   return;
  // }
  const { left, top, width, height } = target.getBoundingClientRect();
  const el = h('div', `${cssPrefix}-tooltip`)
    .setHtml(html)
    .show();
  document.body.appendChild(el.el);
  const elBox = el.box();
  el.setCss({
    left: `${left + width / 2 - elBox.width / 2}px`,
    top: `${top + height + 2}px`
  });

  bind(target, 'mouseleave', () => {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });

  bind(target, 'click', () => {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });
}
