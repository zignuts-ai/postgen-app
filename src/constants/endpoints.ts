export const API_BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)

const GET_URL = (key: string): string => API_BASE_URL + key

const endpoints = {
  auth: {
    login: GET_URL('/login/'),
    registration: GET_URL('/registration/'),
    refresh: GET_URL('/refresh/')
  },
  user: {
    userDetails: GET_URL('/user/')
  }
}
export default endpoints
