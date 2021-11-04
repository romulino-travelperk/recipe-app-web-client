import { recipeActions } from '../recipes'
import handleGetRecipesIntention from './side-effects/handle-get-recipes-intention'
import handleSaveRecipesIntention from './side-effects/handle-save-recipes-intention'
import handleSaveRecipeSuccess from './side-effects/handle-save-recipe-success'
import addSideEffectsToStore from '../../../store/add-side-effects-to-store'

const sideEffectsActions = {
  [recipeActions.get.intention.type]: handleGetRecipesIntention,
  [recipeActions.save.intention.type]: handleSaveRecipesIntention,
  [recipeActions.save.success.type]: handleSaveRecipeSuccess,
}

const addRecipesSideEffectsToStore = () => {
  addSideEffectsToStore(sideEffectsActions)
}

export default addRecipesSideEffectsToStore
