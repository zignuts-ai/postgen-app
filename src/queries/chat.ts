import { api } from 'src/api/api'
import endpoints from 'src/constants/endpoints'
import { UserDataType } from 'src/context/types'
import { CreateSessionResponseTypes, GetChatByIdResponseTypes } from 'src/types/chatContextType'

// ** Craete Session
export async function createChatSession(dto: any, user: UserDataType | null): Promise<CreateSessionResponseTypes> {
  const { data } = await api(endpoints.chat.craeteSession, dto, user ? 'post' : 'postWithoutToken')

  return data
}

// ** Update Chat
export async function updateCurrentChat(dto: any, user: UserDataType | null): Promise<CreateSessionResponseTypes> {
  const { data } = await api(endpoints.chat.updateChat, dto, user ? 'post' : 'postWithoutToken')

  return data
}

// ** Get chat by ID
export async function getChatById(id: string): Promise<GetChatByIdResponseTypes> {
  const { data } = await api(endpoints.chat.getChatById(id), {}, 'get')

  return data
}

// ** Get all chats
export async function getAllChats(): Promise<GetChatByIdResponseTypes> {
  const { data } = await api(endpoints.chat.allChats, {}, 'get')

  return data
}
