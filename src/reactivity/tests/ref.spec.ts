import { isRef, ref, unRef } from '../ref'
import { effect } from '../effect'
import { reactive } from '../reactive'
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

  it('isRef',()=>{
    const a = ref(1)
    const reactiveA = reactive({a:1})
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(reactiveA)).toBe(false)
  })

  it('unRef',()=>{
    const a = ref(1)
    const b = 22
    const obj = reactive({a:1})
    expect(unRef(a)).toBe(1)
    expect(unRef(b)).toBe(22)
    expect(unRef(obj)).toBe(obj)
  })
})