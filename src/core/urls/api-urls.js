const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000/api/'

const apiUrls = {
  token: apiBaseUrl + 'user/token/',
  user: apiBaseUrl + 'user/me',
}

export default apiUrls
