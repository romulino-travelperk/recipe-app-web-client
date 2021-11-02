import { createContext, useReducer } from 'react'
import {
  initialState as authenticationInitialState,
  authenticationReducer,
} from '../core/authentication/reducer/authentication-reducer'
import { applySideEffectsMiddleware } from './side-effects-middleware'
import addSideEffectsToStore from './add-side-effects-to-store'
import combineReducers from './combine-reducers'
import {
  recipesReducer,
  initialState as recipesInitialState,
} from '../core/recipes/recipes-reducer'

const StoreContext = createContext({})

addSideEffectsToStore()

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers({
      authentication: authenticationReducer,
      recipes: recipesReducer,
    }),
    { authentication: authenticationInitialState, recipes: recipesInitialState }
  )
  const dispatchWithSideEffects = applySideEffectsMiddleware(dispatch)
  return (
    <StoreContext.Provider value={{ state, dispatch: dispatchWithSideEffects }}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
