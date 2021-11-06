import createDefaultSideEffects from '../common/create-default-side-effects'
import apiUrls from '../urls/api-urls'
import { ingredientActions } from './ingredients'
import addSideEffectsToStore from '../../store/add-side-effects-to-store'

const addIngredientsSideEffectsToStore = () => {
  addSideEffectsToStore(
    createDefaultSideEffects(apiUrls.ingredients, ingredientActions)
  )
}

export default addIngredientsSideEffectsToStore
