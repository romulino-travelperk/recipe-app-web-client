import { initialState, recipesReducer } from './recipes-reducer'
import getRecipesActions from '../get-recipes-actions'

describe('reducer', () => {
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
    const recipeList = [{ title: '1' }, { title: '2' }]
    const newState = recipesReducer(
      initialState,
      getRecipesActions.success(recipeList)
    )
    expect(newState).toEqual({
      loading: false,
      list: recipeList,
    })
  })
})
