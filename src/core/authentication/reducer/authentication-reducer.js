import authenticateUserActions from '../authenticate-user-actions'
import createReducer from '../../../store/create-reducer'

const authenticationInitialState = {
  status: 'unknown',
}

const actionTypesToReducers = {
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
  [authenticateUserActions.logout.type]: (state, payload) => ({
    ...state,
    status: 'notAuthenticated',
    error: null,
  }),
}

const authenticationReducer = createReducer(actionTypesToReducers)

export { authenticationInitialState, authenticationReducer }
