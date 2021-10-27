import { initialState, reducer } from './reducer'
import actions from './actions'
import { makeActionCreatorFor } from './make-actions'

describe('reducer', () => {
  it('initial state has login status as unknown', () => {
    expect(initialState.authentication).toEqual({ status: 'unknown' })
  })

  it('returns current state when given an invalid action', () => {
    const newState = reducer(
      initialState,
      makeActionCreatorFor('someInvalidAction')
    )

    expect(newState).toEqual(initialState)
  })

  it('login status has user when login is successful', () => {
    const newState = reducer(
      initialState,
      actions.authenticateUserActions.success({
        user: { email: 'someemail@email.com', name: 'User Name' },
      })
    )
    expect(newState.authentication).toEqual({
      status: 'authenticated',
      user: { email: 'someemail@email.com', name: 'User Name' },
    })
  })
})
