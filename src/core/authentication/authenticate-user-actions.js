import {
  createActionCreatorFor,
  createActionCreatorsFor,
} from '../../store/create-actions'

const authenticateUserActions = createActionCreatorsFor('authenticateUser')
authenticateUserActions.logout = createActionCreatorFor('logout')
export default authenticateUserActions
