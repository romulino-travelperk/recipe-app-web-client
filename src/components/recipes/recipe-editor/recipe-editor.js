import { useContext, useEffect } from 'react'
import { StoreContext } from '../../../store/store'
import { useForm } from 'react-hook-form'
import { recipeActions } from '../../../core/recipes/recipes'
import { ErrorMessage, InputField, Button } from '../../common/styled-form'
import NamePicker from '../../common/name-picker'

const RecipeEditor = () => {
  const { state, dispatch } = useContext(StoreContext)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(
      recipeActions.save.intention({
        token: state.authentication.user.token,
        data: { ...state.recipes.isEditing, ...data },
      })
    )
  }
  useEffect(() => {
    reset(state.recipes.isEditing || {})
  }, [state.recipes.isEditing])

  function isDisabled() {
    return state.recipes.loading === true || !state.recipes.isEditing
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            disabled={isDisabled()}
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
            disabled={isDisabled()}
            defaultValue={state.recipes.isEditing?.price}
            {...register('price', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="time_in_minutes">Time</label>
          <input
            id="time_in_minutes"
            disabled={isDisabled()}
            defaultValue={state.recipes.isEditing?.time_in_minutes}
            {...register('time_in_minutes', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.time_in_minutes?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="link">Link</label>
          <input
            id="link"
            disabled={isDisabled()}
            defaultValue={state.recipes.isEditing?.link}
            {...register('link', {
              required: { value: true, message: 'is required' },
            })}
          />
          <ErrorMessage>{errors.link?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="tags">Tags</label>
          <NamePicker
            ids={state.tags?.list?.map((tag) => tag.id)}
            idToNameMap={state.tags.idToName}
            selectedIds={state.recipes.isEditing?.tags}
            onChangeSelection={(names) => {
              setValue('tags', names)
            }}
          />
          <input
            id="tags"
            disabled={isDisabled()}
            hidden
            defaultValue={state.recipes.isEditing?.tags}
            {...register('tags')}
          />
          <ErrorMessage>{errors.tags?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <label htmlFor="ingredients">Ingredients</label>
          <NamePicker
            ids={state.ingredients?.list?.map((ingredient) => ingredient.id)}
            idToNameMap={state.ingredients.idToName}
            selectedIds={state.recipes.isEditing?.ingredients}
            onChangeSelection={(names) => {
              setValue('ingredients', names)
            }}
          />
          <input
            id="ingredients"
            disabled={isDisabled()}
            selectedIds={state.recipes.isEditing?.ingredients}
            hidden
            defaultValue={state.ingredients.isEditing?.tags}
            {...register('ingredients')}
          />
          <ErrorMessage>{errors.ingredients?.message}</ErrorMessage>
        </InputField>
        <InputField>
          <Button type="submit" value="Save" disabled={isDisabled()} />
          <Button
            type="button"
            value="Cancel"
            onClick={() => dispatch(recipeActions.editCancel())}
            disabled={isDisabled()}
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
