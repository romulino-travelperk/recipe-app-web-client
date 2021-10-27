import actions from './actions'

const initialState = {
  authentication: { status: 'unknown' },
}

const actionsMap = {
  [actions.authenticateUserActions.success.type]: (state, payload) => ({
    ...state,
    authentication: { status: 'authenticated', user: payload.user },
  }),
}

function reducer(state, action) {
  return actionsMap[action.type]?.call(null, state, action.payload) || state
}

export { initialState, reducer }
