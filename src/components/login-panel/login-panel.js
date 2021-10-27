import { useContext } from 'react'
import { StoreContext } from '../../store/store'
import actions from '../../store/actions'

const LoginPanel = () => {
  const { state, dispatch } = useContext(StoreContext)
  const clickHandler = () => {
    dispatch(actions.authenticateUserActions.intention({}))
  }
  return (
    <div>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={clickHandler}>DISPATCH</button>
    </div>
  )
}

export default LoginPanel
