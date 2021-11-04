import TagList from './tag-list'
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

  const tag1 = {
    id: 1,
    name: 'tag2',
  }
  const tag2 = {
    id: 2,
    name: 'tag1',
  }

  const tag3 = {
    id: 3,
    name: 'tag3',
  }

  const tag4 = {
    id: 4,
    name: 'tag4',
  }
  const tagList = [tag1, tag2, tag3, tag4]

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('renders empty', () => {
    TestStoreProvider = createTestStoreProvider(
      { tags: initialState },
      dispatch
    )

    render(
      <TestStoreProvider>
        <TagList />
      </TestStoreProvider>
    )

    expect(screen.getByText('You have no tags yet')).not.toBeNull()
  })

  it('renders populated tag list', () => {
    TestStoreProvider = createTestStoreProvider(
      { tags: { loading: false, list: tagList } },
      dispatch
    )

    render(
      <TestStoreProvider>
        <TagList />
      </TestStoreProvider>
    )

    expect(
      screen.queryByText('You have no recipes yet')
    ).not.toBeInTheDocument()

    expect(screen.getByText(tag1.name)).not.toBeNull()
    expect(screen.getByText(tag2.name)).not.toBeNull()
    expect(screen.getByText(tag3.name)).not.toBeNull()
    expect(screen.getByText(tag4.name)).not.toBeNull()
  })
})
