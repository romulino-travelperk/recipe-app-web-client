import apiUrls from '../urls/api-urls'
import { recipeActions } from './recipes-reducer'
import getHandlerForNetworkGetIntention from '../common/make-handler-for-network-get-intention'

const handleGetRecipesIntention = getHandlerForNetworkGetIntention(
  apiUrls.recipes,
  recipeActions.get.success,
  recipeActions.get.failure
)

export default handleGetRecipesIntention
