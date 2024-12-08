export const API_BASE_URL = String(process.env.NEXT_PUBLIC_BASE_API_URL)

const GET_URL = (key: string): string => API_BASE_URL + key

const endpoints = {
  auth: {
    login: GET_URL('/user/login/'),
    registration: GET_URL('/user/signup/'),
    logout: GET_URL('/user/logout/')
  },
  user: {
    userDetails: GET_URL('/user/')
  },
  chat: {
    connection: 'http://localhost:3001/',
    craeteSession: GET_URL('/session/create'),
    getChatById: (id: string) => GET_URL(`/session/getbyid/?sessionId=${id}`),
    allChats: GET_URL('/session/list')
  }
}
export default endpoints
