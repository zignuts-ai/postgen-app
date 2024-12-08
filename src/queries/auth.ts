import { api } from 'src/api/api'
import endpoints from 'src/constants/endpoints'

export async function signup(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.registration, dto, 'postWithoutToken')

  return data
}

export async function login(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.login, dto, 'post')

  return data
}

export async function fetchUser(): Promise<any> {
  const { data } = await api(endpoints.user.userDetails, {}, 'get')

  return data
}
