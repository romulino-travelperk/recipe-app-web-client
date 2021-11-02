import {
  recipeActions,
  recipesInitialState,
  recipesReducer,
} from '../core/recipes/recipes-reducer'

const getRecipesActions = recipeActions.get
const showRecipeDetailsAction = recipeActions.showDetails
const initialState = recipesInitialState

describe('reducer', () => {
  const recipe1 = {
    id: 2,
    title: '22222',
    tags: [],
    ingredients: [],
    time_in_minutes: 2,
    price: '2.00',
    link: '',
    image: null,
  }
  const recipe2 = {
    id: 1,
    title: '1111111',
    tags: [1, 2],
    ingredients: [1, 2],
    time_in_minutes: 1,
    price: '1.00',
    link: '',
    image: null,
  }
  const recipeList = [recipe1, recipe2]

  it('initial state has loading as false', () => {
    expect(initialState).toEqual({ loading: false })
  })

  it('sets loading to true on intent', () => {
    const newState = recipesReducer(initialState, getRecipesActions.intention())
    expect(newState).toEqual({
      loading: true,
    })
  })

  it('sets loading to false and populate list on success', () => {
    const newState = recipesReducer(
      initialState,
      getRecipesActions.success(recipeList)
    )
    expect(newState).toEqual({
      loading: false,
      list: recipeList,
    })
  })

  it('selects recipe to display details', () => {
    const loadedState = recipesReducer(
      initialState,
      getRecipesActions.success(recipeList)
    )
    const newState = recipesReducer(
      loadedState,
      showRecipeDetailsAction(recipe1)
    )

    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      showDetailsFor: recipe1,
    })
  })
})
