const authDataKeys = {
  name: 'auth.name',
  token: 'auth.token',
  email: 'auth.email',
}

function getAuthDataFromLocalStorage() {
  return {
    name: localStorage.getItem(authDataKeys.name),
    token: localStorage.getItem(authDataKeys.token),
    email: localStorage.getItem(authDataKeys.email),
  }
}

function setAuthDataInLocalStorage({ name, token, email }) {
  localStorage.setItem(authDataKeys.name, name)
  localStorage.setItem(authDataKeys.token, token)
  localStorage.setItem(authDataKeys.email, email)
}

export { getAuthDataFromLocalStorage, setAuthDataInLocalStorage, authDataKeys }
