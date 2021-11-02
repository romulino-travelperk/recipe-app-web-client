import appErrors, { appErrorFor } from '../errors/appErrors'
import axios from 'axios'

function getHandlerForNetworkGetIntention(
  url,
  successActionCreator,
  failureActionCreator
) {
  const failure = failureActionCreator
  const success = successActionCreator

  return async function handleNetworkGetIntention(action, dispatch) {
    if (!action.payload.token) {
      dispatch(
        failure({
          origin: 'client',
          error: appErrors.NO_AUTH_TOKEN_PROVIDED,
        })
      )
      return
    }
    const token = action.payload.token
    try {
      const response = await axios.get(url, {
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

export default getHandlerForNetworkGetIntention
