import { StoreContext } from '../../../store/store'
import { useContext } from 'react'

const RecipeDetail = () => {
  const { state } = useContext(StoreContext)
  const recipe = state.recipes?.showDetailsFor
  return (
    <div>
      {recipe && (
        <div>
          Title: <span>{recipe.title}</span>
          Price: <span>{recipe.price}</span>
          Time (in minutes): <span>{recipe.time_in_minutes}</span>
          Link: <span>{recipe.link}</span>
        </div>
      )}
    </div>
  )
}

export default RecipeDetail
