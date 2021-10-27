import { createContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { applySideEffectsMiddleware } from './side-effects-middleware'

const StoreContext = createContext({})
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchWithSideEffects = applySideEffectsMiddleware(dispatch)
  return (
    <StoreContext.Provider value={{ state, dispatch: dispatchWithSideEffects }}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
