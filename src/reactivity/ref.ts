import { trackEffect, triigerEffect, isTracking } from './effect'
import { reactive } from './reactive'
import { isObject } from './util'
class RefImpl {
  private _value: any
  private _rowValue: any
  private dep: any
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

function convert(val) {
  return isObject(val) ? reactive(val) : val
}