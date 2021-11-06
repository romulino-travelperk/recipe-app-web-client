let sideEffectsMap = {}

function applySideEffectsMiddleware(state, dispatch) {
  return function (action) {
    // console.log('dispatched', action)
    // console.log(state)
    sideEffectsMap[action.type]?.before?.forEach((sideEffect) => {
      sideEffect(action, applySideEffectsMiddleware(state, dispatch), state)
    })
    dispatch(action)
    sideEffectsMap[action.type]?.after?.forEach((sideEffect) => {
      sideEffect(action, applySideEffectsMiddleware(state, dispatch), state)
    })
  }
}

function addSideEffectBeforeAction(actionType, sideEffect) {
  sideEffectsMap[actionType] = sideEffectsMap[actionType] || {
    after: [],
    before: [],
  }
  sideEffectsMap[actionType].before.push(sideEffect)
}

function addSideEffectAfterAction(actionType, sideEffect) {
  sideEffectsMap[actionType] = sideEffectsMap[actionType] || {
    after: [],
    before: [],
  }
  sideEffectsMap[actionType].after.push(sideEffect)
}

function clear() {
  sideEffectsMap = {}
}

export {
  addSideEffectAfterAction,
  addSideEffectBeforeAction,
  applySideEffectsMiddleware,
  clear,
}
