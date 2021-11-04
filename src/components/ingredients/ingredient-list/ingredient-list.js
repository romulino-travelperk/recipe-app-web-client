import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import { ingredientActions } from '../../../core/ingredients/ingredients'
import { ListItem, UnorderedList } from '../../common/styled-list'

const IngredientList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <div>
      {!state.ingredients.list && <div>You have no ingredients yet</div>}
      <UnorderedList>
        {state.ingredients.list?.map((ingredient, index) => {
          return (
            <ListItem key={ingredient.name + index}>
              {ingredient.name}
              <button
                disabled={state.ingredients.loading}
                onClick={() => dispatch(ingredientActions.edit(ingredient))}
              >
                Edit
              </button>
            </ListItem>
          )
        })}
      </UnorderedList>
    </div>
  )
}

export default IngredientList
