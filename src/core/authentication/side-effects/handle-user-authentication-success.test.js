import authenticateUserActions from '../authenticate-user-actions'
import { recipeActions } from '../../recipes/recipes'
import handleUserAuthenticationSuccess from './handle-user-authentication-success'
import { tagActions } from '../../tags/tags'
import { ingredientActions } from '../../ingredients/ingredients'

describe('authentication success side effect', () => {
  const userEmail = 'me@email.com'
  const userName = 'some name'
  const authToken = 'some-fake-token'

  it('dispatches intention to get user data', () => {
    const dispatch = jest.fn()

    const successPayload = {
      user: {
        email: userEmail,
        name: userName,
        token: authToken,
      },
    }
    handleUserAuthenticationSuccess(
      authenticateUserActions.success(successPayload),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      recipeActions.get.intention({ token: authToken })
    )
    expect(dispatch).toHaveBeenCalledWith(
      tagActions.get.intention({ token: authToken })
    )
    expect(dispatch).toHaveBeenCalledWith(
      ingredientActions.get.intention({ token: authToken })
    )
  })
})
