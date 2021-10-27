import { makeActionCreatorFor } from './make-actions'
import {
  addSideEffectAfterAction,
  addSideEffectBeforeAction,
  applySideEffectsMiddleware,
  clear,
} from './side-effects-middleware'

describe('side effects middleware', () => {
  const dispatch = jest.fn()
  const anAction = makeActionCreatorFor('AnAction')
  const actionPayload = { someData: 'some payload data' }
  const applyMiddlewareFunction = applySideEffectsMiddleware(dispatch)
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
    const applyMiddlewareFunction = applySideEffectsMiddleware(dispatch)
    applyMiddlewareFunction(createdAction)
    expect(dispatch).toHaveBeenCalledWith(createdAction)
    expect(sideEffect).toHaveBeenCalledWith(createdAction, dispatch)
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
    const applyMiddlewareFunction = applySideEffectsMiddleware(dispatch)
    applyMiddlewareFunction(createdAction)
    expect(dispatch).toHaveBeenCalledWith(createdAction)
    expect(sideEffect).toHaveBeenCalledWith(createdAction, dispatch)
    expect(sideEffectCalledAfterDispatch).toBe(true)
  })
})
