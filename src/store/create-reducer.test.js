import createReducer from './create-reducer'
import { makeActionCreatorFor } from './make-actions'
import { initialState } from '../core/recipes/reducer/recipes-reducer'

describe('create reducer', () => {
  it('creates a reducer based on a map from action types to functions', () => {
    const sumAction = makeActionCreatorFor('SumAction')
    const actionTypesToReducers = {
      [sumAction.type]: (state, payload) => ({
        value: (state.value || 0) + payload.amount,
      }),
    }
    const reducer = createReducer(actionTypesToReducers)

    const initialState = { value: 5 }

    const newState = reducer(initialState, sumAction({ amount: 2 }))

    expect(newState).toEqual({ value: 7 })
  })

  it('returns current state when given an invalid action', () => {
    const sumAction = makeActionCreatorFor('SumAction')
    const actionTypesToReducers = {
      [sumAction.type]: (state, payload) => ({
        value: (state.value || 0) + payload.amount,
      }),
    }
    const reducer = createReducer(actionTypesToReducers)

    const newState = reducer(
      initialState,
      makeActionCreatorFor('someInvalidAction')
    )

    expect(newState).toEqual(initialState)
  })
})
