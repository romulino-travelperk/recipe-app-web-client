import getRecipesIntentionSideEffect from './get-recipes-intention-side-effect'
import getRecipesActions from '../get-recipes-actions'
import appErrors from '../../errors/appErrors'
import apiUrls from '../../urls/api-urls'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const axiosMock = new MockAdapter(axios)

describe('get recipes intention side effect', () => {
  const dispatch = jest.fn()

  const authToken = '134123532423554'
  const recipes = [
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
    {
      id: 1,
      title: '1111111',
      tags: [1, 2],
      ingredients: [1, 2],
      time_in_minutes: 1,
      price: '1.00',
      link: '',
      image: null,
    },
  ]

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fails if no authentication token is provided', () => {
    getRecipesIntentionSideEffect(getRecipesActions.intention(), dispatch)

    expect(dispatch).toHaveBeenCalledWith(
      getRecipesActions.failure({
        origin: 'client',
        error: appErrors.NO_AUTH_TOKEN_PROVIDED,
      })
    )
  })

  it('gets recipes from the network when an authentication token is provided', async () => {
    axiosMock.onGet(apiUrls.recipes).reply(200, recipes)

    await getRecipesIntentionSideEffect(
      getRecipesActions.intention({ token: authToken }),
      dispatch
    )

    expect(axiosMock.history.get[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(getRecipesActions.success(recipes))
  })

  it('fails on network error', async () => {
    axiosMock.onGet(apiUrls.recipes).networkError()

    await getRecipesIntentionSideEffect(
      getRecipesActions.intention({ token: authToken }),
      dispatch
    )

    expect(axiosMock.history.get[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      getRecipesActions.failure({
        error: appErrors.NETWORK_ERROR,
        origin: 'client',
      })
    )
  })

  it('fails on connection timeout', async () => {
    axiosMock.onGet(apiUrls.recipes).timeout()

    await getRecipesIntentionSideEffect(
      getRecipesActions.intention({ token: authToken }),
      dispatch
    )

    expect(axiosMock.history.get[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    expect(dispatch).toHaveBeenCalledWith(
      getRecipesActions.failure({
        error: appErrors.CONNECTION_TIMED_OUT,
        origin: 'client',
      })
    )
  })
})
