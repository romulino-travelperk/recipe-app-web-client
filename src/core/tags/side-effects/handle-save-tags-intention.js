import apiUrls from '../../urls/api-urls'
import { tagActions } from '../tags'
import getHandlerForNetworkSaveIntention from '../../common/create-handler-for-network-save-intention'

const handleSaveTagsIntention = getHandlerForNetworkSaveIntention(
  apiUrls.tags,
  tagActions.save.success,
  tagActions.save.failure
)

export default handleSaveTagsIntention
