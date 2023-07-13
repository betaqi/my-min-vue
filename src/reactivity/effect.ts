let activeEffect: ActiveEffect
let shouldTrack = true // 是否收集依赖
class ActiveEffect {
  private _fn: Function
  deps: any = []
  onStop: Function
  active = true
  scheduler: Function
  constructor(
    fn: Function,
    optsions?: any
  ) {
    this._fn = fn
    this.onStop = optsions?.onStop || null
    this.scheduler = optsions?.scheduler || null
  }

  run() {
    activeEffect = this
    if (this.active) {
      return this._fn()
    }

    shouldTrack = false
    const res = this._fn()
    shouldTrack = true
    return res

  }

  stop() {
    if (this.active) {
      shouldTrack = false
      cleanupEffect(this)
      this.onStop && this.onStop()
      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  for (const dep of effect.deps) {
    dep.delete(effect)
  }
}

const targetMap = new Map()
export function track(target, key) {
  let deepMap = targetMap.get(target)
  if (!deepMap) {
    deepMap = new Map()
    targetMap.set(target, deepMap)
  }

  let dep = deepMap.get(key)
  if (!dep) {
    dep = new Set()
    deepMap.set(key, dep)
  }
  if (!shouldTrack) return
  dep.add(activeEffect)
  activeEffect && activeEffect.deps.push(dep)
}

export function triiger(target, key) {
  const deepMap = targetMap.get(target)
  const dep = deepMap.get(key)
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn: Function, options?: any) {

  const _effect = new ActiveEffect(fn, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

export function stop(runner) {
  runner.effect.stop()
}