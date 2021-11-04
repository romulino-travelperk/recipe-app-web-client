const appErrors = {
  MISSING_ID: {
    code: 'MISSING_ID',
    description: 'No id was provided for a delete operation',
  },
  NO_DATA: {
    code: 'NO_DATA',
    description: 'No data was provided for the request',
  },
  NO_AUTH_PROVIDED: {
    code: 'NO_AUTH_PROVIDED',
    description: 'You need to provide username and password',
  },
  NO_AUTH_TOKEN_PROVIDED: {
    code: 'NO_AUTH_TOKEN_PROVIDED',
    description: 'No authentication token was provided',
  },
  CONNECTION_TIMED_OUT: {
    code: 'CONNECTION_TIMED_OUT',
    description:
      'There was an issue with your connection - timeout. Please try again ',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    description:
      'There was an issue with your connection - network error. Please try again',
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    description: 'Oops... an unknown error has happened. Please try again.',
  },
}

function appErrorFor(errorMessage) {
  if (errorMessage.startsWith('timeout')) {
    return appErrors.CONNECTION_TIMED_OUT
  }
  if (errorMessage === 'Network Error') {
    return appErrors.NETWORK_ERROR
  }
  return { ...appErrors.UNKNOWN_ERROR, message: errorMessage }
}

export default appErrors
export { appErrorFor }
