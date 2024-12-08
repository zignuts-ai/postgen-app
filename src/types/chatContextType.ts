export type FormType = {
  prompt: string
}

export type ChatMessage = {
  id: string
  message: string
  role: 'ai' | 'user'
  type: 'image' | 'video' | 'text' | 'meme'
  timestamp: string
}
