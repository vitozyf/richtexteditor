// export __DEV__ = process.env.NODE_ENV === 'dev'

// export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__
//   ? Object.freeze({})
//   : {}
export const EMPTY_ARR: [] = [];

export const NOOP = () => {};

/**
 * Always return false.
 */
export const NO = () => false;

export const isOn = (key: string) => key[0] === 'o' && key[1] === 'n';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const isArray = Array.isArray;
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';
export const isString = (val: unknown): val is string =>
  typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1);
};

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]';

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as any;
};

const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export const capitalize = cacheStringFunction((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

// compare whether a value has changed, accounting for NaN.
export const hasChanged = (value: any, oldValue: any): boolean =>
  value !== oldValue && (value === value || oldValue === oldValue);

// for converting {{ interpolation }} values to displayed strings.
export const toDisplayString = (val: unknown): string => {
  return val == null
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
    ? JSON.stringify(val, null, 2)
    : String(val);
};

// get domdata
export function getData(
  element: HTMLElement | EventTarget | null,
  dataName: string
): string | null {
  if (!element || !dataName || !(<HTMLElement>element).getAttribute) {
    return null;
  }
  return (<HTMLElement>element).getAttribute('data-' + dataName);
}
