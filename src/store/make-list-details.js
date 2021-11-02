import { makeActionCreatorFor, makeActionCreatorsFor } from './make-actions'
import createReducer from './create-reducer'

function makeListDetails(name) {
  const actions = {}
  actions.get = makeActionCreatorsFor(name)
  actions.showDetails = makeActionCreatorFor(name + 'ShowDetails')
  const initialState = { loading: false }
  const actionTypesToReducers = {
    [actions.get.intention.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [actions.get.success.type]: (state, payload) => ({
      ...state,
      loading: false,
      list: payload,
    }),
    [actions.get.failure.type]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    [actions.showDetails.type]: (state, payload) => ({
      ...state,
      showDetailsFor: payload,
    }),
  }

  return {
    actions,
    initialState,
    reducer: createReducer(actionTypesToReducers),
  }
}

export default makeListDetails
