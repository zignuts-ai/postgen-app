import { api } from 'src/api/api'
import endpoints from 'src/constants/endpoints'
import { apiClient } from 'src/utils/client'

export async function signup(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.registration, dto, 'postWithoutToken')

  return data
}

export async function login(dto: any): Promise<any> {
  const { data } = await api(endpoints.auth.login, dto, 'post')

  return data
}

export async function logout(dto: any): Promise<any> {
  const { data } = await apiClient.post(
    endpoints.auth.logout,
    {},
    {
      headers: {
        Authorization: `Bearer ${dto}`
      }
    }
  )

  return data
}
