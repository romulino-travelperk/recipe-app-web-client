import { tagActions } from '../tags'

function handleDeleteTagSuccess(action, dispatch, state) {
  dispatch(
    tagActions.get.intention({ token: state.authentication?.user?.token })
  )
  dispatch(tagActions.editCancel())
}

export default handleDeleteTagSuccess
