import { recipeActions } from '../../../recipes/recipes-reducer'

function handleUserAuthenticationSuccess(action, dispatch) {
  dispatch(recipeActions.get.intention({ token: action?.payload?.user?.token }))
}

export default handleUserAuthenticationSuccess
