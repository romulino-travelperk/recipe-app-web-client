import createDefaultSideEffects from '../../common/create-default-side-effects'
import apiUrls from '../../urls/api-urls'
import { recipeActions } from '../recipes'
import addSideEffectsToStore from '../../../store/add-side-effects-to-store'

const addRecipesSideEffectsToStore = () => {
  addSideEffectsToStore(
    createDefaultSideEffects(apiUrls.recipes, recipeActions)
  )
}

export default addRecipesSideEffectsToStore
