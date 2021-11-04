import RecipesList from './recipes-list'
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

  const recipe1 = {
    id: 2,
    title: 'a good Recipe',
    tags: [],
    ingredients: [],
    time_in_minutes: 2,
    price: '2.00',
    link: '',
    image: null,
  }
  const recipe2 = {
    id: 1,
    title: 'a very good Recipe',
    tags: [1, 2],
    ingredients: [1, 2],
    time_in_minutes: 1,
    price: '10.00',
    link: '',
    image: null,
  }

  const recipe3 = {
    id: 5,
    title: 'a delicious Recipe',
    tags: [1, 2],
    ingredients: [1, 2],
    time_in_minutes: 1,
    price: '1.00',
    link: '',
    image: null,
  }

  const recipeList = [recipe1, recipe2, recipe3]

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('renders empty', () => {
    TestStoreProvider = createTestStoreProvider(
      { recipes: initialState },
      dispatch
    )

    render(
      <TestStoreProvider>
        <RecipesList />
      </TestStoreProvider>
    )

    expect(screen.getByText('You have no recipes yet')).not.toBeNull()
  })

  it('renders populated recipe list', () => {
    TestStoreProvider = createTestStoreProvider(
      { recipes: { loading: false, list: recipeList } },
      dispatch
    )

    render(
      <TestStoreProvider>
        <RecipesList />
      </TestStoreProvider>
    )

    expect(
      screen.queryByText('You have no recipes yet')
    ).not.toBeInTheDocument()

    expect(screen.getByText(recipe1.title)).not.toBeNull()
    expect(screen.getByText(recipe2.title)).not.toBeNull()
    expect(screen.getByText(recipe3.title)).not.toBeNull()
  })

  it('dispatches show details when list item is clicked', () => {
    TestStoreProvider = createTestStoreProvider(
      { recipes: { loading: false, list: recipeList } },
      dispatch
    )

    render(
      <TestStoreProvider>
        <RecipesList />
      </TestStoreProvider>
    )

    const showRecipeButton = screen.getAllByText('Show')[1]
    userEvent.click(showRecipeButton)
    expect(dispatch).toHaveBeenLastCalledWith(
      recipeActions.showDetails(recipe2)
    )
  })
})
