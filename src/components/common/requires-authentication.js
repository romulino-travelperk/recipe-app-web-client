import { StoreContext } from '../../store/store'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const RequiresAuthentication = ({ children }) => {
  const { state } = useContext(StoreContext)
  if (state.authentication.user) {
    return { ...children }
  }
  return (
    <div>
      You need to be logged in for this <Link to={'/login'}> Login</Link>
    </div>
  )
}

export default RequiresAuthentication
