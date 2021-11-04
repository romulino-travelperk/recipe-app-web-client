import appErrors, { appErrorFor } from '../errors/appErrors'
import axios from 'axios'

function createHandlerForNetworkDeleteIntention(
  url,
  successActionCreator,
  failureActionCreator
) {
  const failure = failureActionCreator
  const success = successActionCreator

  return async function handleNetworkSaveIntention(action, dispatch) {
    if (!action.payload.token) {
      dispatch(
        failure({
          origin: 'client',
          error: appErrors.NO_AUTH_TOKEN_PROVIDED,
        })
      )
      return
    }
    if (!action.payload.id) {
      dispatch(
        failure({
          origin: 'client',
          error: appErrors.MISSING_ID,
        })
      )
      return
    }

    const token = action.payload.token
    const id = action.payload.id
    const completeUrl = url + id + '/'
    try {
      const response = await axios.delete(completeUrl, {
        headers: { Authorization: `token ${token}` },
      })
      dispatch(success(response.data))
    } catch (error) {
      if (error.response) {
        dispatch(
          failure({
            origin: 'server',
            error: {
              status: error.response.status,
              data: error.response.data,
            },
          })
        )
      } else {
        dispatch(
          failure({
            origin: 'client',
            error: appErrorFor(error.message),
          })
        )
      }
    }
  }
}

export default createHandlerForNetworkDeleteIntention
