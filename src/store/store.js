import { createContext, useReducer } from 'react'
import {
  authenticationInitialState as authenticationInitialState,
  authenticationReducer,
} from '../core/authentication/reducer/authentication-reducer'
import { applySideEffectsMiddleware } from './side-effects-middleware'
import addSideEffectsToStore from './add-side-effects-to-store'
import combineReducers from './combine-reducers'
import { recipesReducer, recipesInitialState } from '../core/recipes/recipes'
import { tagsInitialState, tagsReducer } from '../core/tags/tags'
import {
  ingredientsInitialState,
  ingredientsReducer,
} from '../core/ingredients/ingredients'
import addTagsSideEffectsToStore from '../core/tags/add-tags-side-effects-to-store'
import addAuthenticationSideEffectsToStore from '../core/authentication/add-authentication-side-effects-to-store'
import addIngredientsSideEffectsToStore from '../core/ingredients/add-ingredients-side-effects-to-store'
import addRecipesSideEffectsToStore from '../core/recipes/side-effects/add-recipes-side-effects-to-store'

const StoreContext = createContext({})

addTagsSideEffectsToStore()
addAuthenticationSideEffectsToStore()
addIngredientsSideEffectsToStore()
addRecipesSideEffectsToStore()

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers({
      authentication: authenticationReducer,
      recipes: recipesReducer,
      ingredients: ingredientsReducer,
      tags: tagsReducer,
    }),
    {
      authentication: authenticationInitialState,
      recipes: recipesInitialState,
      ingredients: ingredientsInitialState,
      tags: tagsInitialState,
    }
  )
  const dispatchWithSideEffects = applySideEffectsMiddleware(state, dispatch)
  return (
    <StoreContext.Provider value={{ state, dispatch: dispatchWithSideEffects }}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
