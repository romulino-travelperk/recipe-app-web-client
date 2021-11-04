import { tagActions } from './tags'
import handleGetTagsIntention from './side-effects/handle-get-tags-intention'
import handleSaveTagsIntention from './side-effects/handle-save-tags-intention'
import handleSaveTagSuccess from './side-effects/handle-save-tag-success'
import addSideEffectsToStore from '../../store/add-side-effects-to-store'

const sideEffectsActions = {
  [tagActions.get.intention.type]: handleGetTagsIntention,
  [tagActions.save.intention.type]: handleSaveTagsIntention,
  [tagActions.save.success.type]: handleSaveTagSuccess,
}

const addTagsSideEffectsToStore = () => {
  addSideEffectsToStore(sideEffectsActions)
}

export default addTagsSideEffectsToStore
