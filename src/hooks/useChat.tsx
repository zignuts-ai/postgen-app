import { useContext } from 'react'
import { ChatContext } from 'src/context/ChatContext'

export const useChat = () => useContext(ChatContext)
