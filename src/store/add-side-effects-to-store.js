import { addSideEffectAfterAction } from './side-effects-middleware'

import { recipeActions } from '../core/recipes/recipes'
import handleGetRecipesIntention from '../core/recipes/handle-get-recipes-intention'

const allSideEffectsActions = {
  [recipeActions.get.intention.type]: handleGetRecipesIntention,
}

function addSideEffectsToStore(sideEffectsActions = allSideEffectsActions) {
  Object.entries(sideEffectsActions).forEach(([action, sideEffect]) =>
    addSideEffectAfterAction(action, sideEffect)
  )
}

export default addSideEffectsToStore
