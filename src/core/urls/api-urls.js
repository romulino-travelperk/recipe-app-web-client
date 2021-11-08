const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000/api/'

const apiUrls = {
  token: apiBaseUrl + 'user/token/',
  user: apiBaseUrl + 'user/me',
  recipes: apiBaseUrl + 'recipe/recipe/',
  tags: apiBaseUrl + 'recipe/tag/',
  ingredients: apiBaseUrl + 'recipe/ingredient/',
}

export default apiUrls
