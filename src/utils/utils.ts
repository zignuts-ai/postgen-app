import { v4 as uuidv4 } from 'uuid'

export function formatMessage(message: string) {
  if (!message || typeof message !== 'string') {
    return ''
  }

  return message.charAt(0).toUpperCase() + message.slice(1)
}

export const UUID = () => uuidv4()
