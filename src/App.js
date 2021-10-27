import './App.css'
import styled from 'styled-components/macro'
import { StoreProvider } from './store/store'
import LoginPanel from './components/login-panel/login-panel'

const Thing = styled.div`
  background-color: red;
  color: white;
`

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Thing>
          <LoginPanel>...</LoginPanel>
        </Thing>
      </div>
    </StoreProvider>
  )
}

export default App
