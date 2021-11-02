import authenticateUserActions from '../../authenticate-user-actions'
import { recipeActions } from '../../../recipes/recipes-reducer'
import handleUserAuthenticationSuccess from './handle-user-authentication-success'

describe('authentication success side effect', () => {
  const userEmail = 'me@email.com'
  const userName = 'some name'
  const authToken = 'some-fake-token'

  it('dispatches get recipes intention', () => {
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
  })
})
