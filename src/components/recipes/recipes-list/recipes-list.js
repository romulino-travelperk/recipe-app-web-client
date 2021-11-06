import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import { recipeActions } from '../../../core/recipes/recipes'
import { ListItem, UnorderedList } from '../../common/styled-list'
import RecipeDetail from '../recipe-detail/recipe-detail'
import { tagActions } from '../../../core/tags/tags'
import { Button } from '../../common/styled-form'

const RecipesList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <div>
      {!state.recipes.list && <div>You have no recipes yet</div>}
      <Button
        disabled={state.recipes.loading}
        onClick={() => dispatch(recipeActions.edit({}))}
        type="button"
        value="New Recipe"
      />
      <UnorderedList>
        {state.recipes.list?.map((recipe, index) => {
          return (
            <div key={recipe.title + index}>
              <RecipeDetail />
              <ListItem>
                {recipe.title}
                <div>
                  <button onClick={() => dispatch(recipeActions.edit(recipe))}>
                    Edit
                  </button>
                  <button
                    disabled={state.recipes.loading}
                    onClick={() =>
                      dispatch(
                        tagActions.delete.intention({
                          token: state?.authentication?.user?.token,
                          id: recipe.id,
                        })
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </ListItem>
            </div>
          )
        })}
      </UnorderedList>
    </div>
  )
}

export default RecipesList
