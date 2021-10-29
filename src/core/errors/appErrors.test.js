import appErrors, { appErrorFor } from './appErrors'

describe('app errors', () => {
  it('returns timeout error if error message starts with timeout', () => {
    const timeoutErrorMessage = 'timeout of 0ms exceeded'
    const appError = appErrorFor(timeoutErrorMessage)

    expect(appError).toBe(appErrors.CONNECTION_TIMED_OUT)
  })
  it('returns unknown error when it does not know what error it is', () => {
    const unknownErrorMessage = 'Weird Unknown Error!'
    const appError = appErrorFor(unknownErrorMessage)

    expect(appError).toEqual({
      ...appErrors.UNKNOWN_ERROR,
      message: unknownErrorMessage,
    })
  })
})
