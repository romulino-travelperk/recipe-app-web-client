import IngredientList from './ingredient-list'
import { cleanup, render, screen } from '@testing-library/react'
import { createTestStoreProvider } from '../../../store/test-store'
import userEvent from '@testing-library/user-event'
import {
  recipeActions,
  recipesInitialState as initialState,
} from '../../../core/recipes/recipes'

describe('recipes list', () => {
  const dispatch = jest.fn()
  let TestStoreProvider

  const ingredient1 = {
    id: 1,
    name: 'ingredient2',
  }
  const ingredient2 = {
    id: 2,
    name: 'ingredient1',
  }

  const ingredient3 = {
    id: 3,
    name: 'ingredient3',
  }

  const ingredient4 = {
    id: 4,
    name: 'ingredient4',
  }
  const ingredientList = [ingredient1, ingredient2, ingredient3, ingredient4]

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('renders empty', () => {
    TestStoreProvider = createTestStoreProvider(
      { ingredients: initialState },
      dispatch
    )

    render(
      <TestStoreProvider>
        <IngredientList />
      </TestStoreProvider>
    )

    expect(screen.getByText('You have no ingredients yet')).not.toBeNull()
  })

  it('renders populated ingredient list', () => {
    TestStoreProvider = createTestStoreProvider(
      { ingredients: { loading: false, list: ingredientList } },
      dispatch
    )

    render(
      <TestStoreProvider>
        <IngredientList />
      </TestStoreProvider>
    )

    expect(
      screen.queryByText('You have no recipes yet')
    ).not.toBeInTheDocument()

    expect(screen.getByText(ingredient1.name)).not.toBeNull()
    expect(screen.getByText(ingredient2.name)).not.toBeNull()
    expect(screen.getByText(ingredient3.name)).not.toBeNull()
    expect(screen.getByText(ingredient4.name)).not.toBeNull()
  })
})
