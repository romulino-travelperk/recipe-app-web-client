function createReducer(actionsMap) {
  return function reducer(state, action) {
    return actionsMap[action.type]?.call(null, state, action.payload) || state
  }
}

export default createReducer
