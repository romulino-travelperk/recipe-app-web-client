import { ingredientActions } from '../ingredients'

function handleSaveIngredientSuccess(action, dispatch, state) {
  dispatch(
    ingredientActions.get.intention({
      token: state.authentication?.user?.token,
    })
  )
  dispatch(ingredientActions.editCancel())
}

export default handleSaveIngredientSuccess
