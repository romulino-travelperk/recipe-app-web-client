// using a workaround because there's no way to mock local storage
// because of jest jsdom limitations.
// For more information see:
// https://github.com/facebook/jest/issues/6798 and https://github.com/jsdom/jsdom/issues/2318

import handleUserAuthenticationIntention from './handle-user-authentication-intention'

import {
  getAuthDataFromLocalStorage,
  setAuthDataInLocalStorage,
} from '../local-storage/local-storage-auth'

import apiUrls from '../../urls/api-urls'
import appErrors from '../../errors/appErrors'
import authenticateUserActions from '../authenticate-user-actions'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const axiosMock = new MockAdapter(axios)

describe('authentication intention side effect', () => {
  const dispatch = jest.fn()
  let fakeLocalStorage = {}

  const userEmail = 'me@email.com'
  const userName = 'some name'
  const userPassword = 'somePassword'
  const loginCredentials = { email: userEmail, password: userPassword }
  const authToken = 'some-fake-token'

  beforeEach(() => {
    fakeLocalStorage = {}
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.setItem = jest.fn((item, value) => {
      fakeLocalStorage[item] = value
    })
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.getItem = jest.fn((item) => {
      return fakeLocalStorage[item]
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    axiosMock.reset()
  })

  it('gets token and user data from local storage when available and no credentials are provided', () => {
    setAuthDataInLocalStorage({
      name: userName,
      email: userEmail,
      token: authToken,
    })
    handleUserAuthenticationIntention(
      authenticateUserActions.intention(),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.success({
        user: {
          email: userEmail,
          name: userName,
          token: authToken,
        },
      })
    )
  })

  it('gets token and user from the backend when authentication data is missing from local storage', async () => {
    axiosMock
      .onPost(apiUrls.token, {
        username: userEmail,
        password: userPassword,
      })
      .reply(200, { token: authToken })

    axiosMock.onGet(apiUrls.user).reply(200, {
      email: userEmail,
      name: userName,
    })

    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(loginCredentials),
      dispatch
    )

    expect(axiosMock.history.get[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    const credentialsInLocalStorage = getAuthDataFromLocalStorage()

    expect(credentialsInLocalStorage).toEqual({
      name: userName,
      token: authToken,
      email: userEmail,
    })

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.success({
        user: {
          email: userEmail,
          name: userName,
          token: authToken,
        },
      })
    )
  })

  it('refresh localstorage token and user from the backend when credentials are provided', async () => {
    setAuthDataInLocalStorage({
      name: userName,
      email: userEmail,
      token: authToken,
    })

    axiosMock
      .onPost(apiUrls.token, {
        username: userEmail,
        password: userPassword,
      })
      .reply(200, { token: authToken })

    axiosMock.onGet(apiUrls.user).reply(200, {
      email: userEmail,
      name: userName,
    })

    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(loginCredentials),
      dispatch
    )

    expect(axiosMock.history.get[0].headers.Authorization).toEqual(
      `token ${authToken}`
    )

    const credentialsInLocalStorage = getAuthDataFromLocalStorage()

    expect(credentialsInLocalStorage).toEqual({
      name: userName,
      token: authToken,
      email: userEmail,
    })

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.success({
        user: {
          email: userEmail,
          name: userName,
          token: authToken,
        },
      })
    )
  })

  it('fails when there is no token in localstorage and no credentials in action payload', async () => {
    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.failure({
        origin: 'client',
        error: appErrors.NO_AUTH_PROVIDED,
      })
    )
  })

  it('fails when given bad credentials', async () => {
    const badLoginCredentials = { email: userEmail, password: userPassword }

    const badRequestResponseData = {
      non_field_errors: ['Unable to log in with provided credentials.'],
    }
    axiosMock
      .onPost(apiUrls.token, {
        username: userEmail,
        password: userPassword,
      })
      .reply(400, badRequestResponseData)

    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(badLoginCredentials),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.failure({
        error: { status: 400, data: badRequestResponseData },
        origin: 'server',
      })
    )
  })

  it('fails on network error', async () => {
    axiosMock
      .onPost(apiUrls.token, {
        username: userEmail,
        password: userPassword,
      })
      .networkError()

    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(loginCredentials),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.failure({
        error: appErrors.NETWORK_ERROR,
        origin: 'client',
      })
    )
  })

  it('fails on connection timeout', async () => {
    axiosMock
      .onPost(apiUrls.token, {
        username: userEmail,
        password: userPassword,
      })
      .timeout()

    await handleUserAuthenticationIntention(
      authenticateUserActions.intention(loginCredentials),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.failure({
        error: appErrors.CONNECTION_TIMED_OUT,
        origin: 'client',
      })
    )
  })
})
