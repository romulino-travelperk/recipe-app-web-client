import { useContext } from 'react'
import { StoreContext } from '../../../store/store'
import styled from 'styled-components/macro'

const StyledRecipeList = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${(props) => (props.isLoading ? '#141617' : '#282c34')};
  border-radius: 8px;
  padding: 16px;
`

const RecipesList = () => {
  const { state } = useContext(StoreContext)

  return (
    <StyledRecipeList isLoading={state.recipes.loading}>
      <ul>
        {state.recipes.list?.map((recipe, index) => {
          return (
            <li key={recipe.title + index}>
              {/*{JSON.stringify(recipe)}*/}
              {recipe.title}
            </li>
          )
        })}
      </ul>
    </StyledRecipeList>
  )
}

export default RecipesList
