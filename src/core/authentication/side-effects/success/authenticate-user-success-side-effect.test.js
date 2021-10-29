import authenticateUserActions from '../../authenticate-user-actions'
import getRecipesActions from '../../../recipes/get-recipes-actions'
import authenticateUserSuccessSideEffect from './authenticate-user-success-side-effect'

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
    authenticateUserSuccessSideEffect(
      authenticateUserActions.success(successPayload),
      dispatch
    )

    expect(dispatch).toHaveBeenCalledWith(
      getRecipesActions.intention({ token: authToken })
    )
  })
})
