import authenticateUserActions from './authenticate-user-actions'

const initialState = {
  status: 'unknown',
}

const actionsMap = {
  [authenticateUserActions.intention.type]: (state) => ({
    ...state,
    status: 'loading',
  }),
  [authenticateUserActions.success.type]: (state, payload) => ({
    ...state,
    status: 'authenticated',
    user: payload.user,
  }),
  [authenticateUserActions.failure.type]: (state, payload) => ({
    ...state,
    status: 'notAuthenticated',
    error: payload,
  }),
}

function authenticationReducer(state, action) {
  return actionsMap[action.type]?.call(null, state, action.payload) || state
}

export { initialState, authenticationReducer }
