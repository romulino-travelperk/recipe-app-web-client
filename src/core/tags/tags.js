import createListDetails from '../common/create-list-details'
import createReducer from '../../store/create-reducer'

const listDetails = createListDetails('tag')

listDetails.actionTypesToReducers[listDetails.actions.get.success.type] = (
  state,
  tagList
) => ({
  ...state,
  loading: false,
  list: tagList,
  idToName: tagList.reduce((tagMap, tag) => {
    tagMap[tag.id] = tag.name
    return tagMap
  }, {}),
})

const tagsReducer = createReducer(listDetails.actionTypesToReducers)
const tagsInitialState = listDetails.initialState
const tagActions = listDetails.actions

export { tagsInitialState, tagsReducer, tagActions }
