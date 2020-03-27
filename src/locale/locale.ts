/* global window */
import en from './en';

let $lang: lang = 'en';
const $messages: IMessages = {
  en: en
};

function translate(key: string, messages: IMessages) {
  if (messages && messages[$lang]) {
    let message = messages[$lang];
    const keys = key.split('.');
    for (let i = 0; i < keys.length; i += 1) {
      const property: string = keys[i];
      type ObjKey = keyof typeof message;
      const value = (<IMessage>message)[property as ObjKey];
      if (i === keys.length - 1) return value;
      if (!value) return undefined;
      message = value;
    }
  }
  return undefined;
}

function t(key: string) {
  let v = translate(key, $messages);
  if (!v && window && window.rt_editor && window.rt_editor.$messages) {
    v = translate(key, window.rt_editor.$messages);
  }
  return v || '';
}

function tf(key: string) {
  return () => t(key);
}

function locale(lang: lang, message: IMessage) {
  $lang = lang;
  if (message) {
    $messages[lang] = message;
  }
}

export default {
  t
};

export { locale, t, tf };
