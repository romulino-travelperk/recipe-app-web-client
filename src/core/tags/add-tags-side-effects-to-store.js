import { tagActions } from './tags'
import addSideEffectsToStore from '../../store/add-side-effects-to-store'
import createDefaultSideEffects from '../common/create-default-side-effects'
import apiUrls from '../urls/api-urls'

const sideEffectsActions = createDefaultSideEffects(apiUrls.tags, tagActions)

const addTagsSideEffectsToStore = () => {
  addSideEffectsToStore(sideEffectsActions)
}

export default addTagsSideEffectsToStore
