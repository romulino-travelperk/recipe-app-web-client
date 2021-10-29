import authenticateUserActions from '../authenticate-user-actions'
import createReducer from '../../../store/create-reducer'

const initialState = {
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
}

const authenticationReducer = createReducer(actionTypesToReducers)

export { initialState, authenticationReducer }
