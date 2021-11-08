import AuthenticationPanel from './authentication-panel'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createTestStoreProvider } from '../../store/test-store'
import userEvent from '@testing-library/user-event'
import { authenticationInitialState } from '../../core/authentication/reducer/authentication-reducer'
import authenticateUserActions from '../../core/authentication/authenticate-user-actions'

describe('authentication panel', () => {
  const dispatch = jest.fn()
  let TestStoreProvider

  const userEmail = 'me@email.com'
  const userPassword = '123'

  beforeEach(() => {
    TestStoreProvider = createTestStoreProvider(
      { authentication: authenticationInitialState },
      dispatch
    )
  })

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('renders', () => {
    render(
      <TestStoreProvider>
        <AuthenticationPanel />
      </TestStoreProvider>
    )

    expect(screen.getByText('Email')).not.toBeNull()
    expect(screen.getByText('Password')).not.toBeNull()
    expect(screen.getByText('Log in')).not.toBeNull()
  })

  it('dispatches authentication intention when provided with username and password and submit clicked', async () => {
    render(
      <TestStoreProvider>
        <AuthenticationPanel />
      </TestStoreProvider>
    )
    const loginButton = screen.getByText('Log in')
    const emailField = screen.getByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')

    await act(async () => {
      fireEvent.change(emailField, { target: { value: userEmail } })
      fireEvent.change(passwordField, { target: { value: userPassword } })
      userEvent.click(loginButton)
    })

    expect(dispatch).toHaveBeenCalledWith(
      authenticateUserActions.intention({
        email: userEmail,
        password: userPassword,
      })
    )
  })

  it('does NOT dispatch authentication intention when username is missing', async () => {
    render(
      <TestStoreProvider>
        <AuthenticationPanel />
      </TestStoreProvider>
    )
    const loginButton = screen.getByText('Log in')
    const emailField = screen.getByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')

    await act(async () => {
      fireEvent.change(emailField, { target: { value: '' } })
      fireEvent.change(passwordField, { target: { value: userPassword } })
      userEvent.click(loginButton)
    })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('does NOT dispatch authentication intention when password is missing', async () => {
    render(
      <TestStoreProvider>
        <AuthenticationPanel />
      </TestStoreProvider>
    )
    const loginButton = screen.getByText('Log in')
    const emailField = screen.getByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')

    await act(async () => {
      fireEvent.change(emailField, { target: { value: userEmail } })
      fireEvent.change(passwordField, { target: { value: '' } })
      userEvent.click(loginButton)
    })

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('does NOT dispatch authentication intention when invalid email', async () => {
    render(
      <TestStoreProvider>
        <AuthenticationPanel />
      </TestStoreProvider>
    )
    const loginButton = screen.getByText('Log in')
    const emailField = screen.getByLabelText('Email')
    const passwordField = screen.getByLabelText('Password')

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'notAnEmail!' } })
      fireEvent.change(passwordField, { target: { value: '' } })
      userEvent.click(loginButton)
    })

    expect(dispatch).not.toHaveBeenCalled()
  })
})
