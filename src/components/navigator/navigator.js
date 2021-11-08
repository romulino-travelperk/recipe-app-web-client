import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const StyledNavigator = styled.nav`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 3rem;
  width: 100vw;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  li {
    display: flex;
    margin: 0 8px 0 0;
    a {
      color: aliceblue;
      text-decoration: none;
    }
  }
`

const Navigator = () => (
  <StyledNavigator>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/recipes">Recipes</Link>
      </li>
      <li>
        <Link to="/ingredients">Ingredients</Link>
      </li>
      <li>
        <Link to="/tags">Tags</Link>
      </li>
    </ul>
  </StyledNavigator>
)

export default Navigator
