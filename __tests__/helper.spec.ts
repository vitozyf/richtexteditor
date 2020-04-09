import helper from '../src/core/helper';

const { merge } = helper;

describe('core/helper', () => {
  // objects should be replicated in depth
  test('merge func', () => {
    const inObj = {
      foo: 1,
      bar: true,
      fuc() {
        return 1;
      },
      obj: { foo1: 2 }
    };
    const outObj = merge(inObj);
    expect(inObj).toEqual(outObj);

    outObj.obj.foo1 = 3;
    expect(inObj.obj.foo1).not.toBe(outObj.obj.foo1);

    outObj.fuc = () => {
      return 2;
    };

    expect(inObj.fuc()).not.toBe(outObj.fuc());
  });
});
