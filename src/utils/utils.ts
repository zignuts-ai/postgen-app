import { toast } from 'react-hot-toast'
import { ACCESS_TOKEN_KEY } from 'src/constants/constant'
import { v4 as uuidv4 } from 'uuid'

export function formatMessage(message: string) {
  if (!message || typeof message !== 'string') {
    return 'Something Went Wrong'
  }

  return message.charAt(0).toUpperCase() + message.slice(1)
}

export const UUID = () => uuidv4()

export const checkUserStatus = (err: any) => {
  if (err?.response?.status === 401 || err?.response?.status === 500) {
    localStorage.removeItem('user')
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.location.href = '/login'
    toast.error('Session Expierd')

    return false
  }
}
