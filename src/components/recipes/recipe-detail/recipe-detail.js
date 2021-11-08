import { StoreContext } from '../../../store/store'
import { useContext } from 'react'

const RecipeDetail = () => {
  const { state } = useContext(StoreContext)
  const recipe = state.recipes?.showDetailsFor
  let tags = []
  let ingredients = []
  if (recipe) {
    tags = recipe.tags.map((tagId) => state.tags?.idToName[tagId])
    ingredients = recipe.ingredients.map(
      (ingredientId) => state.ingredients?.idToName[ingredientId]
    )
  }
  return (
    <div>
      {recipe && (
        <div>
          <section>
            Title: <span>{recipe.title}</span>
          </section>
          <section>
            Price: <span>{recipe.price}</span>
          </section>
          <section>
            Time (in minutes): <span>{recipe.time_in_minutes}</span>
          </section>
          <section>
            Link: <span>{recipe.link}</span>
          </section>
          <section>
            Tags:
            {tags.map((tag, index) => (
              <span key={'tag-' + index}>{tag}</span>
            ))}
          </section>
          <section>
            Ingredients:
            {ingredients.map((ingredient, index) => (
              <span key={'ingredient-' + index}>{ingredient}</span>
            ))}
          </section>
        </div>
      )}
    </div>
  )
}

export default RecipeDetail
