import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import { ingredientActions } from '../../../core/ingredients/ingredients'
import { ListItem, UnorderedList } from '../../common/styled-list'
import { Button } from '../../common/styled-form'

const IngredientList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <div>
      {!state.ingredients.list && <div>You have no ingredients yet</div>}
      <Button
        disabled={state.ingredients.loading}
        onClick={() => dispatch(ingredientActions.edit({}))}
        type="button"
        value="Create new ingredient"
      />
      <UnorderedList>
        {state.ingredients.list?.map((ingredient, index) => {
          return (
            <ListItem key={ingredient.name + index}>
              {ingredient.name}
              <div>
                <button
                  disabled={state.ingredients.loading}
                  onClick={() => dispatch(ingredientActions.edit(ingredient))}
                >
                  Edit
                </button>
                <button
                  disabled={state.ingredients.loading}
                  onClick={() =>
                    dispatch(
                      ingredientActions.delete.intention({
                        token: state?.authentication?.user?.token,
                        id: ingredient.id,
                      })
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </ListItem>
          )
        })}
      </UnorderedList>
    </div>
  )
}

export default IngredientList
