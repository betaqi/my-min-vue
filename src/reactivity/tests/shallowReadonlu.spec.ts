import { isReadonly, shallowReadonly } from "../reactive";

describe('shallowReadonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = shallowReadonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(wrapped.bar)).toBe(false)
    wrapped.foo = 2
    expect(wrapped.foo).toBe(1)
    wrapped.bar.baz++
    expect(wrapped.bar.baz).toBe(3) 
  })
});