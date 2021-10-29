import { createContext, useReducer } from 'react'
import {
  initialState,
  authenticationReducer,
} from '../core/auth/authentication-reducer'
import { applySideEffectsMiddleware } from './side-effects-middleware'
import addSideEffectsToStore from '../core/auth/add-side-effects-to-store'
import combineReducers from './combine-reducers'

const StoreContext = createContext({})

addSideEffectsToStore()

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers({ authentication: authenticationReducer }),
    initialState
  )
  const dispatchWithSideEffects = applySideEffectsMiddleware(dispatch)
  return (
    <StoreContext.Provider value={{ state, dispatch: dispatchWithSideEffects }}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
