const authDataKeys = {
  userName: 'userName',
  token: 'token',
  email: 'email',
}

function getAuthDataFromLocalStorage() {
  return {
    userName: localStorage.getItem(authDataKeys.userName),
    token: localStorage.getItem(authDataKeys.token),
    email: localStorage.getItem(authDataKeys.email),
  }
}

function setAuthDataInLocalStorage({ userName, token, email }) {
  localStorage.setItem(authDataKeys.userName, userName)
  localStorage.setItem(authDataKeys.token, token)
  localStorage.setItem(authDataKeys.email, email)
}

export { getAuthDataFromLocalStorage, setAuthDataInLocalStorage, authDataKeys }
