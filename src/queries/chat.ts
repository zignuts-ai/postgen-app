import { api } from 'src/api/api'
import endpoints from 'src/constants/endpoints'
import { CreateSessionResponseTypes, GetChatByIdResponseTypes } from 'src/types/chatContextType'

// ** Craete Session
export async function createChatSession(dto: any): Promise<CreateSessionResponseTypes> {
  const { data } = await api(endpoints.chat.craeteSession, dto, 'post')

  return data
}

// ** Get chat by ID
export async function getChatById(id: string): Promise<GetChatByIdResponseTypes> {
  const { data } = await api(endpoints.chat.getChatById(id), {}, 'get')

  return data
}
