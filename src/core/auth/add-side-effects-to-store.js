import { addSideEffectAfterAction } from '../../store/side-effects-middleware'
import authenticationIntentionSideEffect from './authentication-intention-side-effect'
import authenticateUserActions from './authenticate-user-actions'

function addSideEffectsToStore() {
  addSideEffectAfterAction(
    authenticateUserActions.intention.type,
    authenticationIntentionSideEffect
  )
}

export default addSideEffectsToStore
