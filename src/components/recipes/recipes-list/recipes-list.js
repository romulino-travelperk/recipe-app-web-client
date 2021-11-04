import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import { recipeActions } from '../../../core/recipes/recipes'
import { ListItem, UnorderedList } from '../../common/styled-list'
import RecipeDetail from '../recipe-detail/recipe-detail'

const RecipesList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <div>
      {!state.recipes.list && <div>You have no recipes yet</div>}
      <UnorderedList>
        {state.recipes.list?.map((recipe, index) => {
          return (
            <div key={recipe.title + index}>
              <RecipeDetail />
              <ListItem>
                {recipe.title}
                <button
                  onClick={() => dispatch(recipeActions.showDetails(recipe))}
                >
                  Show
                </button>
                <button onClick={() => dispatch(recipeActions.edit(recipe))}>
                  Edit
                </button>
              </ListItem>
            </div>
          )
        })}
      </UnorderedList>
    </div>
  )
}

export default RecipesList
