import { addSideEffectAfterAction } from './side-effects-middleware'
import handleUserAuthentication from '../core/authentication/side-effects/intention/handle-user-authentication-intention'
import authenticateUserActions from '../core/authentication/authenticate-user-actions'
import handleUserAuthenticationSuccess from '../core/authentication/side-effects/success/handle-user-authentication-success'
import { recipeActions } from '../core/recipes/recipes-reducer'
import handleGetRecipesIntention from '../core/recipes/handle-get-recipes-intention'

function addSideEffectsToStore() {
  addSideEffectAfterAction(
    authenticateUserActions.intention.type,
    handleUserAuthentication
  )
  addSideEffectAfterAction(
    authenticateUserActions.success.type,
    handleUserAuthenticationSuccess
  )
  addSideEffectAfterAction(
    recipeActions.get.intention.type,
    handleGetRecipesIntention
  )
}

export default addSideEffectsToStore
