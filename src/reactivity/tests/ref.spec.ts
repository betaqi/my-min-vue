import { ref } from '../ref'
import { effect } from '../effect'
describe('ref', () => {
  it('test', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it('should be reactive', () => {
    const foo = ref(2)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = foo.value
    })
    expect(calls).toBe(1)
    foo.value = 3
    expect(dummy).toBe(3)
    expect(calls).toBe(2)
    foo.value = 3
    expect(calls).toBe(2)
    expect(dummy).toBe(3)
    foo.value++
    expect(dummy).toBe(4)
    
  })

  it('should make nested properties reactive', () => {
    const bar = ref({ a: 1, b: { b1: 10 }, c: [1, 2, 3] })
    let dummy
    effect(() => {
      dummy = bar.value.a
    })
    expect(dummy).toBe(1)
    bar.value.a = 2
    expect(dummy).toBe(2)
  })
})