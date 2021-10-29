import { initialState, authenticationReducer } from './authentication-reducer'
import { makeActionCreatorFor } from '../../store/make-actions'
import authenticateUserActions from './authenticate-user-actions'

describe('reducer', () => {
  it('initial state has auth status as unknown', () => {
    expect(initialState).toEqual({ status: 'unknown' })
  })

  it('returns current state when given an invalid action', () => {
    const newState = authenticationReducer(
      initialState,
      makeActionCreatorFor('someInvalidAction')
    )

    expect(newState).toEqual(initialState)
  })

  it('sets status to loading on intent to authenticate', () => {
    const newState = authenticationReducer(
      initialState,
      authenticateUserActions.intention({
        user: { email: 'someemail@email.com', password: 'somePassword' },
      })
    )
    expect(newState).toEqual({
      status: 'loading',
    })
  })

  it('sets status to loading on intent to authenticate while keeping existing user', () => {
    const stateAfterAuthentication = authenticationReducer(
      initialState,
      authenticateUserActions.success({
        user: { email: 'someemail@email.com', password: 'somePassword' },
      })
    )
    const stateAfterIntentToAuthenticate = authenticationReducer(
      stateAfterAuthentication,
      authenticateUserActions.intention({
        user: { email: 'someemail@email.com', password: 'somePassword' },
      })
    )
    expect(stateAfterIntentToAuthenticate).toEqual({
      status: 'loading',
      user: { email: 'someemail@email.com', password: 'somePassword' },
    })
  })

  it('adds user to auth status when login is successful', () => {
    const newState = authenticationReducer(
      initialState,
      authenticateUserActions.success({
        user: { email: 'someemail@email.com', name: 'User Name' },
      })
    )
    expect(newState).toEqual({
      status: 'authenticated',
      user: { email: 'someemail@email.com', name: 'User Name' },
    })
  })

  it('adds error to auth status when login fails', () => {
    const newState = authenticationReducer(
      initialState,
      authenticateUserActions.failure({
        error: 'someError',
        origin: 'client',
      })
    )
    expect(newState).toEqual({
      status: 'notAuthenticated',
      error: {
        error: 'someError',
        origin: 'client',
      },
    })
  })
})
