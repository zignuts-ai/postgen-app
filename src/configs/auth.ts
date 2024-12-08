export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  userData: 'user',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
