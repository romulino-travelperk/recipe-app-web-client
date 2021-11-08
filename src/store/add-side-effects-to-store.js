import { addSideEffectAfterAction } from './side-effects-middleware'

function addSideEffectsToStore(sideEffectsActions) {
  Object.entries(sideEffectsActions).forEach(([action, sideEffect]) =>
    addSideEffectAfterAction(action, sideEffect)
  )
}

export default addSideEffectsToStore
