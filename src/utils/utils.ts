export function formatMessage(message: string) {
  if (!message || typeof message !== 'string') {
    return ''
  }

  return message.charAt(0).toUpperCase() + message.slice(1)
}
