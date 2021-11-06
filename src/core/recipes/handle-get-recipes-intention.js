import apiUrls from '../urls/api-urls'
import { recipeActions } from './recipes'
import createHandlerForNetworkGetIntention from '../common/network-handlers/create-handler-for-network-get-intention'

const handleGetRecipesIntention = createHandlerForNetworkGetIntention(
  apiUrls.recipes,
  recipeActions.get.success,
  recipeActions.get.failure
)

export default handleGetRecipesIntention
