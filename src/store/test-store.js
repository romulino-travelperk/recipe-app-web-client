import { createActionCreatorFor } from './create-actions'
import { StoreContext } from './store'

const createTestStoreProvider = (state, dispatch) => {
  return ({ children }) => {
    return (
      <StoreContext.Provider value={{ state, dispatch }}>
        {children}
      </StoreContext.Provider>
    )
  }
}

export { createTestStoreProvider }
