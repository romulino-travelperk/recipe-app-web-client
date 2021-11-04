import RecipeDetail from './recipe-detail'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createTestStoreProvider } from '../../../store/test-store'
import { initialState } from '../../../core/recipes/recipes'

describe('recipes list', () => {
  const dispatch = jest.fn()
  let TestStoreProvider

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
    const aRecipe = {
      id: 1,
      title: 'a good recipe',
      tags: [1, 2],
      ingredients: [1, 2],
      time_in_minutes: 1,
      price: '1.00',
      link: 'http://somelink.com',
      image: null,
    }
    TestStoreProvider = createTestStoreProvider(
      {
        authentication: {
          status: 'authenticated',
          user: {
            name: '',
            token: '4c0c27621593e1968c6437fbdebaaadff6e94fd7',
            email: 'me@email.com',
          },
        },
        recipes: {
          loading: false,
          list: [
            {
              id: 2,
              title: '22222',
              tags: [],
              ingredients: [],
              time_in_minutes: 2,
              price: '2.00',
              link: '',
              image: null,
            },
            aRecipe,
          ],
          showDetailsFor: aRecipe,
        },
        ingredients: {
          loading: true,
          list: [
            { id: 2, name: 'ingredient 2' },
            { id: 1, name: 'ingredient 1' },
          ],
          idToName: { 1: 'ingredient 1', 2: 'ingredient 2' },
        },
        tags: {
          loading: true,
          list: [
            { id: 2, name: 'tag2' },
            { id: 1, name: 'tag1' },
          ],
          idToName: { 1: 'tag1', 2: 'tag2' },
        },
      },
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
