function combineReducers(keyToReducerMap) {
  return function (state, action) {
    const newState = {}
    Object.entries(keyToReducerMap).forEach((entry) => {
      const reducer = entry[1]
      newState[entry[0]] = reducer(state[entry[0]], action)
    })
    return newState
  }
}

export default combineReducers
