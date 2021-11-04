import apiUrls from '../../urls/api-urls'
import { ingredientActions } from '../ingredients'
import createHandlerForNetworkGetIntention from '../../common/create-handler-for-network-get-intention'

const handleGetIngredientsIntention = createHandlerForNetworkGetIntention(
  apiUrls.ingredients,
  ingredientActions.get.success,
  ingredientActions.get.failure
)

export default handleGetIngredientsIntention
