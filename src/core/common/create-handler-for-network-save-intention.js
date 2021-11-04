import appErrors, { appErrorFor } from '../errors/appErrors'
import axios from 'axios'

function createHandlerForNetworkSaveIntention(
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
    if (!action.payload.data) {
      dispatch(
        failure({
          origin: 'client',
          error: appErrors.NO_DATA,
        })
      )
      return
    }

    const token = action.payload.token
    const data = action.payload.data
    const completeUrl = data.id ? url + data.id + '/' : url
    const requestMethod = data.id ? axios.put : axios.post
    try {
      const response = await requestMethod(completeUrl, data, {
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

export default createHandlerForNetworkSaveIntention
