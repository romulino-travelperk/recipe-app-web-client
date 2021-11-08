const {
  createActionCreatorsFor,
  createActionCreatorFor,
} = require('./create-actions')

describe('createActionCreatorFor', () => {
  it('create action creator, creates an action with the desired name and a payload', () => {
    const actionPayload = { someData: { someMoreData: 1 } }
    const actionType = 'get_stuff'
    const newActionCreator = createActionCreatorFor(actionType)
    const newAction = newActionCreator(actionPayload)
    expect(newAction.type).toEqual(actionType)
    expect(newAction.payload).toEqual(actionPayload)
  })

  it('create action creator type returns ActionType', () => {
    const actionType = 'get_stuff'
    const newActionCreator = createActionCreatorFor(actionType)
    expect(newActionCreator.type).toEqual(actionType)
  })
})

describe('createActionCreatorsFor', () => {
  it('creates action creators for intention, success, and failure', () => {
    const newActions = createActionCreatorsFor('get_stuff')
    expect(newActions.intention().type).toEqual('get_stuff_intention')
    expect(newActions.success().type).toEqual('get_stuff_success')
    expect(newActions.failure().type).toEqual('get_stuff_failure')
  })
})
