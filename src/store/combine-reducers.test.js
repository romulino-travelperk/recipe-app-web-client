import combineReducers from './combine-reducers'

describe('combine reducers', () => {
  it('returns state returned from each reducer as the value for the key in the provided map', () => {
    const reducer1State = { something: 'reducer1StateValue' }
    const reducer2State = { somethingElse: 'reducer2StateValue' }
    const reducer3State = { anotherOne: 'reducer3StateValue' }

    const reducer1 = jest.fn((state, action) => {
      return { ...state, reducer1State, actionCalled: action }
    })
    const reducer2 = jest.fn((state, action) => {
      return { ...state, reducer2State, actionCalled: action }
    })
    const reducer3 = jest.fn((state, action) => {
      return { ...state, reducer3State, actionCalled: action }
    })

    const combinedReducers = combineReducers({
      r1: reducer1,
      r2: reducer2,
      r3: reducer3,
    })

    const action = { type: 'test action', payload: { some: 'data' } }
    const currentState = {
      r1: { someData: 'someValue1' },
      r2: { someData: 'someValue2' },
      r3: { someData: 'someValue3' },
    }

    const newState = combinedReducers(currentState, action)

    // expect(reducer1).toHaveBeenCalledWith(currentState, action)
    // expect(reducer2).toHaveBeenCalledWith(currentState, action)
    // expect(reducer3).toHaveBeenCalledWith(currentState, action)

    expect(newState).toEqual({
      r1: { ...currentState.r1, reducer1State, actionCalled: action },
      r2: { ...currentState.r2, reducer2State, actionCalled: action },
      r3: { ...currentState.r3, reducer3State, actionCalled: action },
    })
  })
})
