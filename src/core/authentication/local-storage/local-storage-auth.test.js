// using a workaround because there's no way to mock local storage
// because of jest jsdom limitations.
// For more information see:
// https://github.com/facebook/jest/issues/6798 and https://github.com/jsdom/jsdom/issues/2318

import {
  authDataKeys,
  getAuthDataFromLocalStorage,
  setAuthDataInLocalStorage,
} from './local-storage-auth'

describe('local storage authentication', () => {
  it('gets authentication data from localstorage', () => {
    const fakeLocalStorage = {
      [authDataKeys.token]: 'someToken',
      [authDataKeys.email]: 'anemail@somedomain.com',
      [authDataKeys.name]: 'some user name',
    }

    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem')

    const fakeLocalStorageGet = jest.fn((item) => {
      return fakeLocalStorage[item]
    })
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.getItem = fakeLocalStorageGet

    const authData = getAuthDataFromLocalStorage()
    expect(fakeLocalStorageGet).toHaveBeenCalledTimes(3)
    expect(authData.token).toEqual(fakeLocalStorage[authDataKeys.token])
    expect(authData.email).toEqual(fakeLocalStorage[authDataKeys.email])
    expect(authData.name).toEqual(fakeLocalStorage[authDataKeys.name])
  })

  it('sets authentication data in localstorage', () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem')

    const fakeLocalStorage = {}

    const fakeLocalStorageSet = jest.fn((item, value) => {
      fakeLocalStorage[item] = value
    })
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.setItem = fakeLocalStorageSet

    const authDataToSave = {
      name: 'Some Name',
      email: 'name@domain.com',
      token: 'a-secret-token',
    }
    setAuthDataInLocalStorage(authDataToSave)

    expect(fakeLocalStorageSet).toHaveBeenCalledTimes(3)
    expect(fakeLocalStorage[authDataKeys.token]).toEqual(authDataToSave.token)
    expect(fakeLocalStorage[authDataKeys.email]).toEqual(authDataToSave.email)
    expect(fakeLocalStorage[authDataKeys.name]).toEqual(authDataToSave.name)
  })
})
