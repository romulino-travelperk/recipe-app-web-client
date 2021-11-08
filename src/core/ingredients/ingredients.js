import createListDetails from '../common/create-list-details'
import createReducer from '../../store/create-reducer'

const listDetails = createListDetails('ingredients')

listDetails.actionTypesToReducers[listDetails.actions.get.success.type] = (
  state,
  ingredientList
) => ({
  ...state,
  loading: false,
  list: ingredientList,
  idToName: ingredientList.reduce((ingredientMap, ingredient) => {
    ingredientMap[ingredient.id] = ingredient.name
    return ingredientMap
  }, {}),
})

const ingredientsReducer = createReducer(listDetails.actionTypesToReducers)

const ingredientsInitialState = listDetails.initialState
const ingredientActions = listDetails.actions

export { ingredientsInitialState, ingredientsReducer, ingredientActions }
