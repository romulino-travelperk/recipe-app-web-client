import RecipeDetail from './recipe-detail'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createTestStoreProvider } from '../../../store/test-store'
import { initialState } from '../../../core/recipes/recipes-reducer'

describe('recipes list', () => {
  const dispatch = jest.fn()
  let TestStoreProvider

  const aRecipe = {
    id: 2,
    title: 'a good Recipe',
    tags: [1, 2],
    ingredients: [1, 2],
    time_in_minutes: 2,
    price: '2.00',
    link: 'http://www.google.com',
    image: null,
  }

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
        <RecipeDetail />
      </TestStoreProvider>
    )

    expect(true).toBeTruthy()
  })

  it('renders populated', () => {
    TestStoreProvider = createTestStoreProvider(
      { recipes: { showDetailsFor: aRecipe } },
      dispatch
    )

    render(
      <TestStoreProvider>
        <RecipeDetail />
      </TestStoreProvider>
    )

    expect(screen.getByText(aRecipe.title)).not.toBeNull()
    expect(screen.getByText(aRecipe.price)).not.toBeNull()
    expect(screen.getByText(aRecipe.time_in_minutes)).not.toBeNull()
    expect(screen.getByText(aRecipe.link)).not.toBeNull()
  })
})
