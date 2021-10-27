import { makeActionCreatorsFor } from './make-actions'

const authenticateUserActions = makeActionCreatorsFor('authenticateUser')
const getRecipesActions = makeActionCreatorsFor('getRecipes')
const saveRecipeActions = makeActionCreatorsFor('saveRecipe')
const navigateActions = makeActionCreatorsFor('navigate')

export default {
  authenticateUserActions,
  getRecipesActions,
  saveRecipeActions,
  navigateActions,
}
