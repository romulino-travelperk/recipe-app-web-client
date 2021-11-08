import createHandlerForNetworkGetIntention from './network-handlers/create-handler-for-network-get-intention'
import createHandlerForNetworkSaveIntention from './network-handlers/create-handler-for-network-save-intention'
import createHandlerForNetworkDeleteIntention from './network-handlers/create-handler-for-network-delete-intention'

const createDefaultSideEffects = (url, actions) => ({
  [actions.save.intention.type]: createHandlerForNetworkSaveIntention(
    url,
    actions.save.success,
    actions.save.failure
  ),
  [actions.save.success.type]: (action, dispatch, state) => {
    dispatch(
      actions.get.intention({ token: state.authentication?.user?.token })
    )
    dispatch(actions.editCancel())
  },
  [actions.get.intention.type]: createHandlerForNetworkGetIntention(
    url,
    actions.get.success,
    actions.get.failure
  ),
  [actions.delete.intention.type]: createHandlerForNetworkDeleteIntention(
    url,
    actions.delete.success,
    actions.delete.failure
  ),
  [actions.delete.success.type]: (action, dispatch, state) => {
    dispatch(
      actions.get.intention({ token: state.authentication?.user?.token })
    )
    dispatch(actions.editCancel())
  },
})

export default createDefaultSideEffects
