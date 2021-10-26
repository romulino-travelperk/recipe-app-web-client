import './App.css'
import styled from 'styled-components/macro'

const Thing = styled.div`
  background-color: red;
  color: white;
`

function App() {
  return (
    <div className="App">
      <Thing>...</Thing>
    </div>
  )
}

export default App
