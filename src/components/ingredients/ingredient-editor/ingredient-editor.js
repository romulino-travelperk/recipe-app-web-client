import { useContext, useEffect } from 'react'
import { StoreContext } from '../../../store/store'
import { useForm } from 'react-hook-form'
import { ingredientActions } from '../../../core/ingredients/ingredients'
import {
  ErrorMessage,
  InputField,
  SubmitButton,
} from '../../common/styled-form'

const IngredientEditor = () => {
  const { state, dispatch } = useContext(StoreContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(
      ingredientActions.save.intention({
        token: state.authentication.user.token,
        data: { ...state.ingredients.isEditing, ...data },
      })
    )
  }
  useEffect(() => {
    reset(state.ingredients.isEditing)
  }, [state.ingredients.isEditing])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            disabled={state.ingredients?.loading === true}
            defaultValue={state.ingredients.isEditing?.name}
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
            disabled={state.ingredients?.loading === true}
          />
          <SubmitButton
            type="button"
            value="Cancel"
            disabled={
              state.ingredients?.loading === true ||
              !state.ingredients.isEditing?.name
            }
            onClick={() => dispatch(ingredientActions.editCancel())}
          />
          <ErrorMessage>
            {JSON.stringify(state.ingredients?.error?.message)}
          </ErrorMessage>
        </InputField>
      </form>
    </div>
  )
}

export default IngredientEditor
