import { reactive } from "../reactive"
import { computed } from '../computed'

describe('computed', () => {
  it.skip('happy path', () => {
    const user = reactive({ age: 1 })
    const comp = computed(() => {
      return user.age + 1
    })

    expect(comp.value).toBe(2)
  })
  it('should computed lazily', () => {
    const reactiveObj = reactive({
      data: 1
    })

    const getter = jest.fn(() => {
      return reactiveObj.data
    })

    const comp = computed(getter)

    expect(getter).not.toHaveBeenCalled()
    expect(comp.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    comp.value
    expect(getter).toHaveBeenCalledTimes(1)

    reactiveObj.data = 2
    expect(getter).toHaveBeenCalledTimes(1)

    expect(comp.value).toBe(2)
  })
})