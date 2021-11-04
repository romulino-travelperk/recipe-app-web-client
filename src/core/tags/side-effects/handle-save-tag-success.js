import { tagActions } from '../tags'

function handleSaveTagSuccess(action, dispatch, state) {
  dispatch(
    tagActions.get.intention({ token: state.authentication?.user?.token })
  )
  dispatch(tagActions.editCancel())
}

export default handleSaveTagSuccess
