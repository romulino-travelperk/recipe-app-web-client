import getRecipesActions from '../../../recipes/get-recipes-actions'

function authenticateUserSuccessSideEffect(action, dispatch) {
  dispatch(getRecipesActions.intention({ token: action?.payload?.user?.token }))
}

export default authenticateUserSuccessSideEffect
