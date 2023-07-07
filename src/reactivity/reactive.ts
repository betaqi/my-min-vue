import { track, triiger } from './effect'
export function reactive(row) {
  return new Proxy(row, {
    get(target, key) {
      // TODO: 1. 收集依赖

      track(target, key)

      return Reflect.get(target, key)
    },
    set(target, key, value) {
      // TODO: 2. 触发依赖
      const res = Reflect.set(target, key, value)
      triiger(target, key)
      return res
    }
  })
}