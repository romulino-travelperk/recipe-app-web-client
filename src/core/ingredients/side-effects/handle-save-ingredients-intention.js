import apiUrls from '../../urls/api-urls'
import { ingredientActions } from '../ingredients'
import getHandlerForNetworkSaveIntention from '../../common/create-handler-for-network-save-intention'

const handleSaveIngredientsIntention = getHandlerForNetworkSaveIntention(
  apiUrls.ingredients,
  ingredientActions.save.success,
  ingredientActions.save.failure
)

export default handleSaveIngredientsIntention
