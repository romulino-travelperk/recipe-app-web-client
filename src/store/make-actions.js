function makeActionCreatorFor(actionType) {
  function creatorFunction(payload = {}) {
    return {
      type: actionType,
      payload,
    }
  }

  creatorFunction.type = actionType
  return creatorFunction
}

function makeActionCreatorsFor(actionName) {
  return {
    intention: makeActionCreatorFor(actionName + 'IntentionAction'),
    success: makeActionCreatorFor(actionName + 'SuccessAction'),
    failure: makeActionCreatorFor(actionName + 'FailureAction'),
  }
}

export { makeActionCreatorFor, makeActionCreatorsFor }
