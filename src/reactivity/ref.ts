import { trackEffect, triigerEffect, isTracking } from './effect'
import { reactive } from './reactive'
import { isObject } from './util'
class RefImpl {
  private _value: any
  private _rowValue: any
  private dep: any
  __v_isRef = true
  constructor(value) {
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    if (isTracking()) {
      trackEffect(this.dep)
    }
    this._rowValue = this._value
    return convert(this._value)
  }

  set value(newValue) {
    if (Object.is(newValue, this._rowValue)) return
    this._rowValue = newValue

    this._value = convert(newValue)
    triigerEffect(this.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)

}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref._value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key, receiver) {
      
      return unRef(Reflect.get(target, key))
    },
    set(target, key, newValue, receiver) {
      const oldValue = target[key]
      if (isRef(oldValue) && !isRef(newValue)) {
        oldValue.value = newValue
        return true
      } else {
        return Reflect.set(target, key, newValue)
      }
    },

  })
}

function convert(val) {
  return isObject(val) ? reactive(val) : val
}