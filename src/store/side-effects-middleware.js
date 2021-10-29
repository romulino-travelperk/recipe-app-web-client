let sideEffectsMap = {}

function applySideEffectsMiddleware(dispatch) {
  return function (action) {
    sideEffectsMap[action.type]?.before?.forEach((sideEffect) => {
      sideEffect(action, applySideEffectsMiddleware(dispatch))
    })

    dispatch(action)
    sideEffectsMap[action.type]?.after?.forEach((sideEffect) => {
      sideEffect(action, applySideEffectsMiddleware(dispatch))
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
