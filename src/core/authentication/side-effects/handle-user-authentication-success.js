import { recipeActions } from '../../recipes/recipes'
import { tagActions } from '../../tags/tags'
import { ingredientActions } from '../../ingredients/ingredients'

function handleUserAuthenticationSuccess(action, dispatch) {
  dispatch(recipeActions.get.intention({ token: action?.payload?.user?.token }))
  dispatch(tagActions.get.intention({ token: action?.payload?.user?.token }))
  dispatch(
    ingredientActions.get.intention({ token: action?.payload?.user?.token })
  )
}

export default handleUserAuthenticationSuccess
