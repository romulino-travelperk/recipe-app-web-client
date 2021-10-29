import getRecipesActions from '../get-recipes-actions'
import createReducer from '../../../store/create-reducer'

const initialState = { loading: false }

const actionTypesToReducers = {
  [getRecipesActions.intention.type]: (state) => ({
    ...state,
    loading: true,
  }),
  [getRecipesActions.success.type]: (state, payload) => ({
    ...state,
    loading: false,
    list: payload,
  }),
  [getRecipesActions.failure.type]: (state, payload) => ({
    ...state,
    loading: false,
    error: payload,
  }),
}

const recipesReducer = createReducer(actionTypesToReducers)

export { initialState, recipesReducer }
