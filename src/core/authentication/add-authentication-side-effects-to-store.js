import addSideEffectsToStore from '../../store/add-side-effects-to-store'
import authenticateUserActions from './authenticate-user-actions'
import handleUserAuthentication from './side-effects/handle-user-authentication-intention'
import handleUserAuthenticationSuccess from './side-effects/handle-user-authentication-success'

const sideEffectsActions = {
  [authenticateUserActions.intention.type]: handleUserAuthentication,
  [authenticateUserActions.success.type]: handleUserAuthenticationSuccess,
}

const addAuthenticationSideEffectsToStore = () => {
  addSideEffectsToStore(sideEffectsActions)
}

export default addAuthenticationSideEffectsToStore
