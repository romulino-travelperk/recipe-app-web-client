const {
  makeActionCreatorsFor,
  makeActionCreatorFor,
} = require('./make-actions')

describe('makeActionCreatorFor', () => {
  it('make action creator, creates an action with the desired name and a payload', () => {
    const actionPayload = { someData: { someMoreData: 1 } }
    const actionType = 'getStuff'
    const newActionCreator = makeActionCreatorFor(actionType)
    const newAction = newActionCreator(actionPayload)
    expect(newAction.type).toEqual(actionType)
    expect(newAction.payload).toEqual(actionPayload)
  })

  it('make action creator type returns ActionType', () => {
    const actionType = 'getStuff'
    const newActionCreator = makeActionCreatorFor(actionType)
    expect(newActionCreator.type).toEqual(actionType)
  })
})

describe('makeActionCreatorsFor', () => {
  it('makes action creators for intention, success, and failure', () => {
    const newActions = makeActionCreatorsFor('getStuff')
    expect(newActions.intention().type).toEqual('getStuffIntentionAction')
    expect(newActions.success().type).toEqual('getStuffSuccessAction')
    expect(newActions.failure().type).toEqual('getStuffFailureAction')
  })
})
