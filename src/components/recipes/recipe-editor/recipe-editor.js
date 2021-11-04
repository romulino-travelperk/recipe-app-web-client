import { useContext, useEffect } from 'react'
import { StoreContext } from '../../../store/store'
import { useForm } from 'react-hook-form'
import { recipeActions } from '../../../core/recipes/recipes'
import {
  ErrorMessage,
  InputField,
  SubmitButton,
} from '../../common/styled-form'

const RecipeEditor = () => {
  const { state, dispatch } = useContext(StoreContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(
      recipeActions.save.intention({
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
          <label htmlFor="title">Title</label>
          <input
            id="title"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.isEditing?.title}
            {...register('title', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.isEditing?.price}
            {...register('price', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="time_in_minutes">Time</label>
          <input
            id="time_in_minutes"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.isEditing?.time_in_minutes}
            {...register('time_in_minutes', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="link">Link</label>
          <input
            id="link"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.isEditing?.link}
            {...register('link', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="link">Tags</label>
          <input
            id="tags"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.isEditing?.tags}
            {...register('tags', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id="link"
            disabled={state.recipes?.loading === true}
            defaultValue={state.recipes.ingredients?.link}
            {...register('ingredients', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <SubmitButton
            type="submit"
            value="Save"
            disabled={state.recipes?.loading === true}
          />
          <SubmitButton
            type="button"
            value="Cancel"
            onClick={() => dispatch(recipeActions.editCancel())}
            disabled={
              state.recipes?.loading === true || !state.recipes.isEditing?.title
            }
          />
          <ErrorMessage>
            {JSON.stringify(state.tags?.error?.message)}
          </ErrorMessage>
        </InputField>
      </form>
    </div>
  )
}

export default RecipeEditor
