import { ingredientActions } from './ingredients'
import handleGetIngredientsIntention from './side-effects/handle-get-ingredients-intention'
import handleSaveIngredientsIntention from './side-effects/handle-save-ingredients-intention'
import handleSaveIngredientSuccess from './side-effects/handle-save-ingredient-success'
import addSideEffectsToStore from '../../store/add-side-effects-to-store'

const sideEffectsActions = {
  [ingredientActions.get.intention.type]: handleGetIngredientsIntention,
  [ingredientActions.save.intention.type]: handleSaveIngredientsIntention,
  [ingredientActions.save.success.type]: handleSaveIngredientSuccess,
}

const addIngredientsSideEffectsToStore = () => {
  addSideEffectsToStore(sideEffectsActions)
}

export default addIngredientsSideEffectsToStore
