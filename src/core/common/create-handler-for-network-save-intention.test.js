import createHandlerForNetworkSaveIntention from './create-handler-for-network-save-intention'
import appErrors from '../errors/appErrors'
import apiUrls from '../urls/api-urls'

import { recipeActions } from '../recipes/recipes'

const handleSaveRecipesIntention = createHandlerForNetworkSaveIntention(
  apiUrls.recipes,
  recipeActions.save.success,
  recipeActions.save.failure
)

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const axiosMock = new MockAdapter(axios)

describe('network save intention handler', () => {
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
    handleSaveRecipesIntention(recipeActions.save.intention(), dispatch)

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.save.failure({
        origin: 'client',
        error: appErrors.NO_AUTH_TOKEN_PROVIDED,
      })
    )
  })

  it('fails if no data is provided', () => {
    handleSaveRecipesIntention(
      recipeActions.save.intention({ token: authToken }),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.save.failure({
        origin: 'client',
        error: appErrors.NO_DATA,
      })
    )
  })

  it('saves new data to the network when an authentication token is provided', async () => {
    axiosMock.onPost(apiUrls.recipes).reply(200, recipes)

    await handleSaveRecipesIntention(
      recipeActions.save.intention({
        data: newRecipe,
        token: authToken,
      }),
      dispatch
    )
    expect(axiosMock.history.post[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(recipeActions.save.success(recipes))
  })

  it('updates data to the network when an authentication token is provided', async () => {
    axiosMock.onPut(apiUrls.recipes + recipe1.id + '/').reply(200, recipes)

    await handleSaveRecipesIntention(
      recipeActions.save.intention({
        data: recipe1,
        token: authToken,
      }),
      dispatch
    )

    expect(axiosMock.history.put[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(recipeActions.save.success(recipes))
  })

  it('fails on network error', async () => {
    axiosMock.onPost(apiUrls.recipes).networkError()

    await handleSaveRecipesIntention(
      recipeActions.save.intention({ token: authToken, data: newRecipe }),
      dispatch
    )
    expect(axiosMock.history.post[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.save.failure({
        error: appErrors.NETWORK_ERROR,
        origin: 'client',
      })
    )
  })

  it('fails on connection timeout', async () => {
    axiosMock.onPost(apiUrls.recipes).timeout()

    await handleSaveRecipesIntention(
      recipeActions.save.intention({ token: authToken, data: newRecipe }),
      dispatch
    )
    expect(axiosMock.history.post[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.save.failure({
        error: appErrors.CONNECTION_TIMED_OUT,
        origin: 'client',
      })
    )
  })
})
