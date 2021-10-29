import recipesActions from './recipes-actions'

const initialState = {
  authentication: { status: 'unknown' },
}

const actionsMap = {
  [recipesActions.intention.type]: (state) => ({
    ...state,
    authentication: {
      user: state.authentication.user,
      status: 'loading',
    },
  }),
  [recipesActions.success.type]: (state, payload) => ({
    ...state,
    authentication: { status: 'authenticated', user: payload.user },
  }),
  [recipesActions.failure.type]: (state, payload) => ({
    ...state,
    authentication: { status: 'notAuthenticated', error: payload },
  }),
}

function authenticationReducer(state, action) {
  return actionsMap[action.type]?.call(null, state, action.payload) || state
}

export { initialState, authenticationReducer }
