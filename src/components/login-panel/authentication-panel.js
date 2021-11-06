import { useContext } from 'react'
import { StoreContext } from '../../store/store'
import { useForm } from 'react-hook-form'
import styled from 'styled-components/macro'
import authenticateUserActions from '../../core/authentication/authenticate-user-actions'
import { ErrorMessage, InputField, Button } from '../common/styled-form'

const StyledAuthenticationPanel = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${(props) => (props.isLoading ? '#141617' : '#282c34')};
  border-radius: 8px;
  padding: 16px;
`

const AuthenticationPanel = () => {
  const { state, dispatch } = useContext(StoreContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    dispatch(authenticateUserActions.intention(data))
  }

  return (
    <StyledAuthenticationPanel
      isLoading={state.authentication?.status === 'loading'}
    >
      {state.authentication.user?.token && (
        <div>
          You are currently logged in as {state.authentication.user?.email}
          <div>
            Not you? <Button type="button" value="Log out" />
          </div>
        </div>
      )}
      {!state.authentication.user?.token && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              disabled={state.authentication?.status === 'loading'}
              {...register('email', {
                required: { value: true, message: 'is required' },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'needs to be a valid email',
                },
              })}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </InputField>
          <InputField>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              disabled={state.authentication?.status === 'loading'}
              {...register('password', {
                required: { value: true, message: 'is required' },
              })}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </InputField>
          <InputField>
            <Button
              type="submit"
              value="Log in"
              disabled={state.authentication?.status === 'loading'}
            />
            <ErrorMessage>
              {JSON.stringify(state.authentication?.error?.error)}
            </ErrorMessage>
          </InputField>
        </form>
      )}
    </StyledAuthenticationPanel>
  )
}

export default AuthenticationPanel
