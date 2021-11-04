import { createActionCreatorFor } from './create-actions'
import {
  addSideEffectAfterAction,
  addSideEffectBeforeAction,
  applySideEffectsMiddleware,
  clear,
} from './side-effects-middleware'

describe('side effects middleware', () => {
  const dispatch = jest.fn()
  const anAction = createActionCreatorFor('AnAction')
  const actionPayload = { someData: 'some payload data' }
  const state = { someState: 'someThing' }
  const applyMiddlewareFunction = applySideEffectsMiddleware(state, dispatch)
  const createdAction = anAction(actionPayload)

  beforeEach(() => {
    dispatch.mockReset()
    clear()
  })
  it('dispatches action', () => {
    applyMiddlewareFunction(createdAction)
    expect(dispatch).toHaveBeenCalledWith(createdAction)
  })

  it('calls side effects before the action is dispatched', () => {
    let dispatchCalled = false
    let sideEffectCalledBeforeDispatch = false

    const dispatch = jest.fn(() => (dispatchCalled = true))
    const sideEffect = jest.fn(() => {
      if (!dispatchCalled) {
        sideEffectCalledBeforeDispatch = true
      }
    })

    addSideEffectBeforeAction(anAction.type, sideEffect)
    const applyMiddlewareFunction = applySideEffectsMiddleware(state, dispatch)
    applyMiddlewareFunction(createdAction)
    expect(dispatch).toHaveBeenCalledWith(createdAction)
    // cannot do called with for this situation
    // eslint-disable-next-line jest/prefer-called-with
    expect(sideEffect).toHaveBeenCalled()
    expect(sideEffectCalledBeforeDispatch).toBe(true)
  })

  it('calls side effects after the action is dispatched', () => {
    let dispatchCalled = false
    let sideEffectCalledAfterDispatch = false

    const dispatch = jest.fn(() => (dispatchCalled = true))
    const sideEffect = jest.fn(() => {
      if (dispatchCalled) {
        sideEffectCalledAfterDispatch = true
      }
    })

    addSideEffectAfterAction(anAction.type, sideEffect)
    const applyMiddlewareFunction = applySideEffectsMiddleware(state, dispatch)
    applyMiddlewareFunction(createdAction)
    expect(dispatch).toHaveBeenCalledWith(createdAction)
    // cannot do called with for this situation
    // eslint-disable-next-line jest/prefer-called-with
    expect(sideEffect).toHaveBeenCalled()
    expect(sideEffectCalledAfterDispatch).toBe(true)
  })
})
