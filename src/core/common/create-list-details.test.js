import {
  recipeActions,
  recipesInitialState,
  recipesReducer,
} from '../recipes/recipes'

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

  it('sets loading to true on get intent', () => {
    const newState = recipesReducer(initialState, recipeActions.get.intention())
    expect(newState).toEqual({
      loading: true,
    })
  })

  it('sets loading to true on delete intent', () => {
    const newState = recipesReducer(
      initialState,
      recipeActions.delete.intention()
    )
    expect(newState).toEqual({
      loading: true,
    })
  })

  it('sets loading to true on save intent', () => {
    const newState = recipesReducer(
      initialState,
      recipeActions.save.intention()
    )
    expect(newState).toEqual({
      loading: true,
    })
  })

  it('sets loading to false on save success', () => {
    const newState = recipesReducer(initialState, recipeActions.save.success())
    expect(newState).toEqual({
      loading: false,
      saveError: null,
    })
  })

  it('sets loading to false on delete success', () => {
    const newState = recipesReducer(
      initialState,
      recipeActions.delete.success()
    )
    expect(newState).toEqual({
      loading: false,
      deleteError: null,
    })
  })

  it('sets loading to false on delete failure', () => {
    const error = { some: 'error' }
    const newState = recipesReducer(
      initialState,
      recipeActions.delete.failure(error)
    )
    expect(newState).toEqual({
      loading: false,
      deleteError: error,
    })
  })

  it('sets loading to false and populate list on success', () => {
    const newState = recipesReducer(
      initialState,
      recipeActions.get.success(recipeList)
    )
    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      retrieveError: null,
    })
  })

  it('sets loading to false and populate error on get failure', () => {
    const error = { message: 'something bad' }
    const newState = recipesReducer(
      initialState,
      recipeActions.get.failure(error)
    )
    expect(newState).toEqual({
      loading: false,
      retrieveError: error,
    })
  })

  it('sets loading to false and populate error on save failure', () => {
    const error = { message: 'something bad' }
    const newState = recipesReducer(
      initialState,
      recipeActions.save.failure(error)
    )
    expect(newState).toEqual({
      loading: false,
      saveError: error,
    })
  })

  it('selects data to display details', () => {
    const loadedState = recipesReducer(
      initialState,
      recipeActions.get.success(recipeList)
    )
    const newState = recipesReducer(
      loadedState,
      recipeActions.showDetails(recipe1)
    )

    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      showDetailsFor: recipe1,
      retrieveError: null,
    })
  })

  it('clear details data selection', () => {
    const loadedState = recipesReducer(
      initialState,
      recipeActions.get.success(recipeList)
    )
    const selectedState = recipesReducer(
      loadedState,
      recipeActions.showDetails(recipe1)
    )

    const newState = recipesReducer(selectedState, recipeActions.clearDetails())

    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      showDetailsFor: null,
      retrieveError: null,
    })
  })

  it('selects data to edit', () => {
    const loadedState = recipesReducer(
      initialState,
      recipeActions.get.success(recipeList)
    )
    const newState = recipesReducer(loadedState, recipeActions.edit(recipe1))

    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      isEditing: recipe1,
      retrieveError: null,
    })
  })

  it('cancels edit', () => {
    const loadedState = recipesReducer(
      initialState,
      recipeActions.get.success(recipeList)
    )
    const editingState = recipesReducer(
      loadedState,
      recipeActions.edit(recipe1)
    )

    const newState = recipesReducer(editingState, recipeActions.editCancel())

    expect(newState).toEqual({
      loading: false,
      list: recipeList,
      isEditing: null,
      retrieveError: null,
    })
  })
})
