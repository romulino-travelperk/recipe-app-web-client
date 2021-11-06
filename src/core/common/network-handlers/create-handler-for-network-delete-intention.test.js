import createHandlerForNetworkDeleteIntention from './create-handler-for-network-delete-intention'
import appErrors from '../../errors/appErrors'
import apiUrls from '../../urls/api-urls'

import { recipeActions } from '../../recipes/recipes'

const handleDeleteRecipesIntention = createHandlerForNetworkDeleteIntention(
  apiUrls.recipes,
  recipeActions.delete.success,
  recipeActions.delete.failure
)

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const axiosMock = new MockAdapter(axios)

describe('network delete intention handler', () => {
  const dispatch = jest.fn()

  const authToken = '134123532423554'
  const newRecipe = {
    title: '22222',
    tags: [],
    ingredients: [],
    time_in_minutes: 2,
    price: '2.00',
    link: '',
    image: null,
  }
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
  const recipes = [recipe1, recipe2]

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fails if no authentication token is provided', () => {
    handleDeleteRecipesIntention(recipeActions.delete.intention(), dispatch)

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.delete.failure({
        origin: 'client',
        error: appErrors.NO_AUTH_TOKEN_PROVIDED,
      })
    )
  })

  it('fails if no id is provided', () => {
    handleDeleteRecipesIntention(
      recipeActions.delete.intention({ token: authToken }),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.delete.failure({
        origin: 'client',
        error: appErrors.MISSING_ID,
      })
    )
  })

  it('deletes data from the network when an authentication token is provided', async () => {
    axiosMock.onDelete(apiUrls.recipes + recipe1.id + '/').reply(200)

    await handleDeleteRecipesIntention(
      recipeActions.delete.intention({
        id: recipe1.id,
        token: authToken,
      }),
      dispatch
    )
    expect(axiosMock.history.delete[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(recipeActions.delete.success())
  })

  it('fails on network error', async () => {
    axiosMock.onDelete(apiUrls.recipes + recipe1.id + '/').networkError()

    await handleDeleteRecipesIntention(
      recipeActions.delete.intention({ token: authToken, id: recipe1.id }),
      dispatch
    )
    expect(axiosMock.history.delete[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.delete.failure({
        error: appErrors.NETWORK_ERROR,
        origin: 'client',
      })
    )
  })

  it('fails on connection timeout', async () => {
    axiosMock.onDelete(apiUrls.recipes + recipe1.id + '/').timeout()

    await handleDeleteRecipesIntention(
      recipeActions.delete.intention({ token: authToken, id: recipe1.id }),
      dispatch
    )
    expect(axiosMock.history.delete[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.delete.failure({
        error: appErrors.CONNECTION_TIMED_OUT,
        origin: 'client',
      })
    )
  })
})
