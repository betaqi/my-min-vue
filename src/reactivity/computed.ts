import { EffectImpl } from './effect'

class ComputedImpl {
  private _getter: Function
  private _dirty: Boolean = true
  private _value: any
  private _effect: any
  constructor(getter) {
    this._getter = getter
    this._effect = new EffectImpl(getter, {
      scheduler: () => {
        this._dirty = true
      }
    })
  }
  get value() {
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()

    }
    return this._value
  }
}

export function computed(getter) {
  return new ComputedImpl(getter)
}