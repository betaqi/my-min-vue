import { isReactive, reactive } from "../reactive"

describe('isReactive', () => {
  it('happy path', () => {
    const user = { age: 10 }
    const wrapped = reactive(user)
    expect(isReactive(wrapped)).toBe(true)
    expect(isReactive(user)).toBe(false)
  })
})