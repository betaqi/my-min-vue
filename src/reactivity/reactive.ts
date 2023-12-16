import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

export function isReactive(raw) {
  const result = !!raw[ReactiveFlags.IS_REACTIVE]
  return result
}

export function isReadonly(raw) {
  const result = !!raw[ReactiveFlags.IS_READONLY]
  return result
}

function createActiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}

export function shallowReadonly(target) {
  return createActiveObject(target, shallowReadonlyHandlers)
}