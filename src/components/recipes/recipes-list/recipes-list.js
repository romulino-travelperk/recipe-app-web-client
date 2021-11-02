import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import styled from 'styled-components/macro'
import { recipeActions } from '../../../core/recipes/recipes-reducer'

const StyledRecipeList = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${(props) => (props.isLoading ? '#141617' : '#282c34')};
  border-radius: 8px;
  padding: 16px;
`

const RecipesList = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <StyledRecipeList isLoading={state.recipes.loading}>
      {!state.recipes.list && <div>You have no recipes yet</div>}
      <pre>{JSON.stringify(state)}</pre>
      <ul>
        {state.recipes.list?.map((recipe, index) => {
          return (
            <li
              key={recipe.title + index}
              onClick={() => dispatch(recipeActions.showDetails(recipe))}
            >
              {recipe.title}
            </li>
          )
        })}
      </ul>
    </StyledRecipeList>
  )
}

export default RecipesList
