import apiUrls from '../../urls/api-urls'
import { tagActions } from '../tags'
import getHandlerForNetworkDeleteIntention from '../../common/create-handler-for-network-delete-intention'

const handleDeleteTagsIntention = getHandlerForNetworkDeleteIntention(
  apiUrls.tags,
  tagActions.delete.success,
  tagActions.delete.failure
)

export default handleDeleteTagsIntention
