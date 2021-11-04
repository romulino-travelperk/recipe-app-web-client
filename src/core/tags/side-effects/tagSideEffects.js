import getHandlerForNetworkSaveIntention from '../../common/create-handler-for-network-save-intention'
import createHandlerForNetworkGetIntention from '../../common/create-handler-for-network-get-intention'
import getHandlerForNetworkDeleteIntention from '../../common/create-handler-for-network-delete-intention'

const createDefaultSideEffects = (url, actions) => ({
  [actions.save.intention.type] : getHandlerForNetworkSaveIntention(
      url,
      actions.save.success,
      actions.save.failure
  ),
  [actions.save.success.type] : (action, dispatch, state)=>{
    dispatch(
        actions.get.intention({ token: state.authentication?.user?.token })
    )
    dispatch(actions.editCancel())
  }
}



  const handleGetTagsIntention = createHandlerForNetworkGetIntention(
    url,
    actions.get.success,
    actions.get.failure
  )

  const handleDeleteTagsIntention = getHandlerForNetworkDeleteIntention(
    url,
    actions.delete.success,
    actions.delete.failure
  )

  function handleDeleteTagSuccess(action, dispatch, state) {
    dispatch(
      actions.get.intention({ token: state.authentication?.user?.token })
    )
    dispatch(actions.editCancel())
  })
}
