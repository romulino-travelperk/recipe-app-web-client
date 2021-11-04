import {
  createActionCreatorFor,
  createActionCreatorsFor,
} from '../../store/create-actions'

function createListDetails(name) {
  const actions = {}
  actions.get = createActionCreatorsFor('get_' + name)
  actions.save = createActionCreatorsFor('save_' + name)
  actions.delete = createActionCreatorsFor('delete_' + name)
  actions.edit = createActionCreatorFor('edit_' + name)
  actions.editCancel = createActionCreatorFor('edit_cancel' + name)
  actions.showDetails = createActionCreatorFor('show_' + name + '_details')
  actions.clearDetails = createActionCreatorFor('clear_' + name + '_details')

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
      retrieveError: null,
    }),
    [actions.get.failure.type]: (state, payload) => ({
      ...state,
      loading: false,
      retrieveError: payload,
    }),
    [actions.save.intention.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [actions.save.success.type]: (state, payload) => ({
      ...state,
      loading: false,
      saveError: null,
    }),
    [actions.save.failure.type]: (state, payload) => ({
      ...state,
      loading: false,
      saveError: payload,
    }),
    [actions.delete.intention.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [actions.delete.success.type]: (state, payload) => ({
      ...state,
      loading: false,
      deleteError: null,
    }),
    [actions.delete.failure.type]: (state, payload) => ({
      ...state,
      loading: false,
      deleteError: payload,
    }),
    [actions.showDetails.type]: (state, payload) => ({
      ...state,
      showDetailsFor: payload,
    }),
    [actions.clearDetails.type]: (state, payload) => ({
      ...state,
      showDetailsFor: null,
    }),
    [actions.edit.type]: (state, payload) => ({
      ...state,
      isEditing: payload,
    }),
    [actions.editCancel.type]: (state, action) => ({
      ...state,
      isEditing: null,
    }),
  }

  return {
    actions,
    initialState,
    actionTypesToReducers,
  }
}

export default createListDetails
