import makeListDetails from '../../store/make-list-details'

const listDetailReducer = makeListDetails('recipe')
const recipesReducer = listDetailReducer.reducer
const recipesInitialState = listDetailReducer.initialState
const recipeActions = listDetailReducer.actions

export { recipesInitialState, recipesReducer, recipeActions }
