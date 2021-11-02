import {
  getAuthDataFromLocalStorage,
  setAuthDataInLocalStorage,
} from '../../local-storage/local-storage-auth'

import axios from 'axios'
import apiUrls from '../../../urls/api-urls'
import appErrors, { appErrorFor } from '../../../errors/appErrors'
import authenticateUserActions from '../../authenticate-user-actions'

const success = authenticateUserActions.success
const failure = authenticateUserActions.failure

async function handleUserAuthenticationIntention(action, dispatch) {
  const localAuthData = getAuthDataFromLocalStorage()
  const hasCredentialsPayload = action.payload.email && action.payload.password
  if (localAuthData.token && !hasCredentialsPayload) {
    dispatch(success({ user: { ...localAuthData } }))
    return
  }
  if (!hasCredentialsPayload) {
    dispatch(
      failure({
        origin: 'client',
        error: appErrors.NO_AUTH_PROVIDED,
      })
    )
    return
  }
  try {
    const tokenResponse = await axios.post(apiUrls.token, {
      username: action.payload.email,
      password: action.payload.password,
    })

    const token = tokenResponse.data.token

    const userResponse = await axios.get(apiUrls.user, {
      headers: { Authorization: `token ${token}` },
    })

    const user = userResponse.data

    const userData = {
      email: user.email,
      name: user.name,
      token,
    }
    setAuthDataInLocalStorage(userData)

    dispatch(success({ user: userData }))
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

export default handleUserAuthenticationIntention
