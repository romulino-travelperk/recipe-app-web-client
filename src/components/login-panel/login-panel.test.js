import LoginPanel from './login-panel'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createTestStoreProvider } from '../../store/test-store'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../core/auth/authentication-reducer'
import authenticateUserActions from '../../core/auth/authenticate-user-actions'

describe('login panel', () => {
  const dispatch = jest.fn()
  let TestStoreProvider

  const userEmail = 'me@email.com'
  const userPassword = '123'

  beforeEach(() => {
    TestStoreProvider = createTestStoreProvider(initialState, dispatch)
  })

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('renders', () => {
    render(
      <TestStoreProvider>
        <LoginPanel />
      </TestStoreProvider>
    )

    expect(screen.getByText('Email')).not.toBeNull()
    expect(screen.getByText('Password')).not.toBeNull()
    expect(screen.getByText('Log in')).not.toBeNull()
  })

  it('dispatches authentication intention when provided with username and password and submit clicked', async () => {
    render(
      <TestStoreProvider>
        <LoginPanel />
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
        <LoginPanel />
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
        <LoginPanel />
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
        <LoginPanel />
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
