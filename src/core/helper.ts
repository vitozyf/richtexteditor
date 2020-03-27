// interface ISource {
//   [key: string]: ISource;
// }

const mergeDeep = (object: Object = {}, ...sources: Array<Object>) => {
  sources.forEach((source: Object) => {
    type ObjKey = keyof typeof source;
    Object.keys(source).forEach((key: string) => {
      if (source.hasOwnProperty(key)) {
        const v = source[key as ObjKey];
        if (
          typeof v === 'string' ||
          typeof v === 'number' ||
          typeof v === 'boolean'
        ) {
          object[key as ObjKey] = v;
        } else if (
          typeof v !== 'function' &&
          !Array.isArray(v) &&
          (v as any) instanceof Object
        ) {
          object[key as ObjKey] = (object[key as ObjKey] || {}) as any;
          mergeDeep(object[key as ObjKey], v);
        } else {
          object[key as ObjKey] = v as any;
        }
      }
    });
  });
  return object;
};

export default {
  merge: (...sources: Array<Object>) => mergeDeep({}, ...sources)
};
