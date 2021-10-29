import appErrors, { appErrorFor } from '../../errors/appErrors'
import getRecipesActions from '../get-recipes-actions'
import apiUrls from '../../urls/api-urls'
import axios from 'axios'

const failure = getRecipesActions.failure
const success = getRecipesActions.success

async function getRecipesIntentionSideEffect(action, dispatch) {
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
    const response = await axios.get(apiUrls.recipes, {
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

export default getRecipesIntentionSideEffect
