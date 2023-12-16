import { isReactive, reactive } from "../reactive"

describe('isReactive', () => {
  it('happy path', () => {
    const user = { age: 10 }
    const wrapped = reactive(user)
    expect(isReactive(wrapped)).toBe(true)
    expect(isReactive(user)).toBe(false)
  })

  it('nested isReactive', () => {
    const object = {
      array: [{ bar: 1 }],
      nested: {
        foo: 1
      }
    }
    const wrapped = reactive(object)
    expect(isReactive(wrapped.nested)).toBe(true)
    expect(isReactive(wrapped.array)).toBe(true)
    expect(isReactive(wrapped.array[0])).toBe(true)

  })
})