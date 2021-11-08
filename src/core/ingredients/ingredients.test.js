import {
  ingredientActions,
  ingredientsInitialState,
  ingredientsReducer,
} from './ingredients'

describe('ingredients reducer', () => {
  it('sets map and list on get success', () => {
    const ingredient1 = {
      id: 2,
      name: 'ingredient 2',
    }
    const ingredient2 = {
      id: 1,
      name: 'ingredient 1',
    }
    const ingredientList = [ingredient1, ingredient2]

    const newState = ingredientsReducer(
      ingredientsInitialState,
      ingredientActions.get.success(ingredientList)
    )
    expect(newState).toEqual({
      loading: false,
      list: ingredientList,
      idToName: {
        [ingredient1.id]: ingredient1.name,
        [ingredient2.id]: ingredient2.name,
      },
    })
  })
})
