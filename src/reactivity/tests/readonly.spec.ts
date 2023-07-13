import { readonly, isReactive, isReadonly } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    const obj = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(obj)
    expect(wrapped).not.toBe(obj)
    expect(isReactive(wrapped)).toBe(false)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(obj)).toBe(false)
    expect(wrapped.foo).toBe(1)
  })

  it('warn then called set', () => {
    console.warn = jest.fn()

    const user = readonly({ age: 10 })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})