import Cookies from 'js-cookie'
import { api } from 'src/api/api'
import { REFRESH_TOKEN_KEY } from 'src/constants/constant'
import endpoints from 'src/constants/endpoints'

export async function signupWithDjango(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.registration, dto, 'postWithoutToken')

  return data
}

export async function loginWithDjango(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.login, dto, 'postWithoutToken')

  return data
}

export async function refreshToken(): Promise<any> {
  const { data } = await api(endpoints.auth.refresh, { refresh: Cookies.get(REFRESH_TOKEN_KEY) }, 'post')

  return data
}

export async function fetchUser(): Promise<any> {
  const { data } = await api(endpoints.user.userDetails, {}, 'get')

  return data
}
