class Effect {
  constructor(fn, scheduler) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
}

let activeEffect;

function effect(fn, options = {}) {
  const scheduler = options.scheduler;
  const effect = new Effect(fn, scheduler);

  const runner = effect.run.bind(effect)
  runner.effect = effect
  console.log('runner',runner)
  return runner
}

const fn = () => {
  return 'fn'
}

const scheduler = () => {
  console.log('I am scheduler')
}

const a =  effect(fn)

console.log(a())