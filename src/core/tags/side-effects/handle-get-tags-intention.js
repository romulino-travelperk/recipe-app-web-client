import apiUrls from '../../urls/api-urls'
import { tagActions } from '../tags'
import createHandlerForNetworkGetIntention from '../../common/create-handler-for-network-get-intention'

const handleGetTagsIntention = createHandlerForNetworkGetIntention(
  apiUrls.tags,
  tagActions.get.success,
  tagActions.get.failure
)

export default handleGetTagsIntention
