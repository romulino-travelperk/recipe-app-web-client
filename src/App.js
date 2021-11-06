import './App.css'
import { StoreContext, StoreProvider } from './store/store'
import AuthenticationPanel from './components/login-panel/authentication-panel'
import styled from 'styled-components/macro'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import RecipesList from './components/recipes/recipes-list/recipes-list'
import authenticateUserActions from './core/authentication/authenticate-user-actions'
import { useContext, useEffect } from 'react'
import TagList from './components/tags/tag-list/tag-list'
import TagEditor from './components/tags/tag-editor/tag-editor'
import IngredientList from './components/ingredients/ingredient-list/ingredient-list'
import IngredientEditor from './components/ingredients/ingredient-editor/ingredient-editor'
import RecipeEditor from './components/recipes/recipe-editor/recipe-editor'
import ListWithEditor from './components/common/list-with-editor'
import RequiresAuthentication from './components/common/requires-authentication'
import Navigator from './components/navigator/navigator'

const StyledApp = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #3b4371;
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
          <Navigator />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <AuthenticationPanel>...</AuthenticationPanel>
            </Route>
            <Route path="/recipes">
              <RequiresAuthentication>
                <ListWithEditor
                  editorComponent={RecipeEditor}
                  listComponent={RecipesList}
                />
              </RequiresAuthentication>
            </Route>
            <Route path="/ingredients">
              <RequiresAuthentication>
                <ListWithEditor
                  editorComponent={IngredientEditor}
                  listComponent={IngredientList}
                />
              </RequiresAuthentication>
            </Route>
            <Route path="/tags">
              <RequiresAuthentication>
                <ListWithEditor
                  editorComponent={TagEditor}
                  listComponent={TagList}
                />
              </RequiresAuthentication>
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
