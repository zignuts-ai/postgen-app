import { UseMutationResult } from '@tanstack/react-query'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type SignupParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  name: string
  password: string
  username: string
  fullName: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login?: UseMutationResult<any, any, any, unknown>
  register?: UseMutationResult<any, any, any, unknown>
}
