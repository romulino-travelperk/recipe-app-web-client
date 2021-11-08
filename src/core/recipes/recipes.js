import createListDetails from '../common/create-list-details'
import createReducer from '../../store/create-reducer'

const listDetails = createListDetails('recipe')
const recipesReducer = createReducer(listDetails.actionTypesToReducers)
const recipesInitialState = listDetails.initialState
const recipeActions = listDetails.actions

export { recipesInitialState, recipesReducer, recipeActions }
