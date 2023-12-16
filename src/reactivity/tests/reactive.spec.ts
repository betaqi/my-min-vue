import { isProxy, reactive, readonly } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 }  };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1)
  });

  it('isProxy', () => {
    const original = { foo: 1, bar: { baz: 2 }  };
    const observed = reactive(original);
    expect(isProxy(original)).toBe(false)
    expect(isProxy(original.bar)).toBe(false)

    expect(isProxy(observed)).toBe(true)
    expect(isProxy(observed.bar)).toBe(true)

    const readonlyObserved = readonly(original)

    expect(isProxy(readonlyObserved)).toBe(true)

  })
});