import { track, triiger } from "./effect"
import { ReactiveFlags } from './reactive'

const get = createdGetter()
const readonlyGet = createdGetter(true)
export function createdGetter(isReadonly = false) {
  return function get(target, key) {

    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }

    if(key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    if (!isReadonly) {
      // TODO:  收集依赖
      track(target, key)
    }

    return Reflect.get(target, key)
  }
}

export function createdSetter() {
  return function set(target, key, val) {
    // TODO: 2. 触发依赖
    const res = Reflect.set(target, key, val)
    triiger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set: createdSetter()
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, val) {
    console.warn(`set on key ${key} falied because this object is readonly`)
    return target[key]
  }
}