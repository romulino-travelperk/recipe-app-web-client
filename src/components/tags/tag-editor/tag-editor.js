import { useContext, useEffect } from 'react'
import { StoreContext } from '../../../store/store'
import { useForm } from 'react-hook-form'
import { tagActions } from '../../../core/tags/tags'
import {
  ErrorMessage,
  InputField,
  SubmitButton,
} from '../../common/styled-form'

const TagEditor = () => {
  const { state, dispatch } = useContext(StoreContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(
      tagActions.save.intention({
        token: state.authentication.user.token,
        data: { ...state.tags.isEditing, ...data },
      })
    )
  }
  useEffect(() => {
    reset(state.tags.isEditing)
  }, [state.tags.isEditing])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            disabled={state.tags?.loading === true}
            defaultValue={state.tags.isEditing?.name}
            {...register('name', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <SubmitButton
            type="submit"
            value="Save"
            disabled={state.tags?.loading === true}
          />
          <SubmitButton
            type="button"
            value="Cancel"
            disabled={
              state.tags?.loading === true || !state.tags.isEditing?.name
            }
            onClick={() => dispatch(tagActions.editCancel())}
          />
          <ErrorMessage>
            {JSON.stringify(state.tags?.error?.message)}
          </ErrorMessage>
        </InputField>
      </form>
    </div>
  )
}

export default TagEditor
