import { addSideEffectAfterAction } from './side-effects-middleware'
import authenticateUserIntentionSideEffect from '../core/authentication/side-effects/intention/authenticate-user-intention-side-effect'
import authenticateUserActions from '../core/authentication/authenticate-user-actions'
import authenticateUserSuccessSideEffect from '../core/authentication/side-effects/success/authenticate-user-success-side-effect'
import getRecipesActions from '../core/recipes/get-recipes-actions'
import getRecipesIntentionSideEffect from '../core/recipes/side-effects/get-recipes-intention-side-effect'

function addSideEffectsToStore() {
  addSideEffectAfterAction(
    authenticateUserActions.intention.type,
    authenticateUserIntentionSideEffect
  )
  addSideEffectAfterAction(
    authenticateUserActions.success.type,
    authenticateUserSuccessSideEffect
  )
  addSideEffectAfterAction(
    getRecipesActions.intention.type,
    getRecipesIntentionSideEffect
  )
}

export default addSideEffectsToStore
