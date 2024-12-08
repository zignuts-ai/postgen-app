export type FormType = {
  prompt: string
}

export type ChatMessage = {
  messageId: string
  message: string | null
  type: 'image' | 'video' | 'text' | 'meme' | null
  role: 'ai' | 'user'
  metadata: any | null
  created_at: number
  created_by: string | null
}

interface Session {
  sessionId: string
  name: string
  userId: string
  prompt: string
  is_active: boolean
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  deleted_at: string | null
  deleted_by: string | null
  is_deleted: boolean
  messages: ChatMessage[]
}

export interface GetChatByIdResponseTypes {
  data: Session[]
}
export interface CreateSessionResponseTypes {
  data: {
    createdAt: string
    updatedAt: string
    id: string
    isActive: boolean
    isDeleted: boolean
    type: 'image' | 'video' | 'text' | 'meme' | null
    message: null
    metadata: null
    userId: string
    role: 'ai' | 'user'
    sessionId: string
    createdBy: null
    updatedBy: null
    deletedAt: null
    deletedBy: null
  }
}

export type PreviewDataType = {
  imageUrl: string
  caption: string
  title: string
  type: 'image' | 'video' | 'text' | 'meme'
}
