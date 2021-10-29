import './App.css'
import { StoreContext, StoreProvider } from './store/store'
import LoginPanel from './components/login-panel/login-panel'
import styled from 'styled-components/macro'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import RecipesList from './components/recipes/recipes-list/recipes-list'
import authenticateUserActions from './core/authentication/authenticate-user-actions'
import { useContext, useEffect } from 'react'

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`

function ConnectedApp() {
  const { dispatch } = useContext(StoreContext)
  useEffect(() => {
    dispatch(authenticateUserActions.intention())
  }, [])
  return (
    <StyledApp>
      <Router>
        <div>
          <nav>
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
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <LoginPanel>...</LoginPanel>
            </Route>
            <Route path="/recipes">
              <RecipesList />
            </Route>
            <Route path="/ingredients">
              <div>Ingredients here...</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </StyledApp>
  )
}

function App() {
  return (
    <StoreProvider>
      <ConnectedApp />
    </StoreProvider>
  )
}

export default App
