function createActionCreatorFor(actionType) {
  function creatorFunction(payload = {}) {
    return {
      type: actionType,
      payload,
    }
  }

  creatorFunction.type = actionType
  return creatorFunction
}

function createActionCreatorsFor(actionName) {
  return {
    intention: createActionCreatorFor(actionName + '_intention'),
    success: createActionCreatorFor(actionName + '_success'),
    failure: createActionCreatorFor(actionName + '_failure'),
  }
}

export { createActionCreatorFor, createActionCreatorsFor }
