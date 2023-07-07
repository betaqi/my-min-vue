import { effect, stop } from '../effect'
import { reactive } from '../reactive'


describe('effect', () => {
  it('happy path', () => {
    const user = reactive({ age: 10 })
    let nextAge: any
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    user.age++
    console.log(user.age)
    expect(nextAge).toBe(12)
  })

  it('effect return runner ', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'test'
    })
    expect(foo).toBe(11)
    let r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('test')
  })

  it('scheduler', () => {
    // scheduler 作用：
    //   1. 如果 effect 的第二个参数给定一个 scheduler 函数，
    //   2. effect 第一次执行的时候还会执行 fn
    //   3. 之后如果依赖的数据变化了，不会重新执行 fn ，而是执行 scheduler
    //   4. 如果调用 runner 函数，会重新执行 fn
    let dummy: any
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })

    const obj = reactive({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    }, { scheduler })

    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })

  it('stop', () => {
    let dummy: any
    const obj = reactive({ num: 1 })
    const runner = effect(() => {
      dummy = obj.num
    })
    obj.num = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.num = 3
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(3)

  })

  it('onStop', () => {
    const obj = reactive({
      foo: 1
    })
    const onStop = jest.fn()
    let dummy
    const runner = effect(() => {
      dummy = obj.foo
    }, { onStop })

    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})