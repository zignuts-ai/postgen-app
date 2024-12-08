// ** React Imports
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { CHAT_DATA } from 'src/constants/fakeData'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import { FormType } from 'src/types/chatContextType'
import { useRouter } from 'next/router'
import { io, Socket } from 'socket.io-client'
import endpoints from 'src/constants/endpoints'
import { useAuth } from 'src/hooks/useAuth'

export type ChatValuesTypes = {
  store: any
  methods: UseFormReturn<FormType, any>
  chatId: string | string[] | undefined
  sendMessage: (content: string) => void
  messages: ChatMessage[]
}

// ** Defaults
const ChatContext = createContext({} as ChatValuesTypes)

type Props = {
  children: ReactNode
}

const schema = yup.object().shape({
  prompt: yup.string().min(2, 'Prompt should be at least 2 characters').required('Prompt is required')
})

export type ChatMessage = {
  id: string
  message: string
  senderId: string
  timestamp: string
}

const ChatProvider = ({ children }: Props) => {
  const router = useRouter()
  const { chatId } = router.query
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_DATA)
  const { user } = useAuth()

  // ** States
  const [socket, setSocket] = useState<Socket | null>(null)

  const methods = useForm<FormType>({
    defaultValues: {
      prompt: ''
    },
    resolver: yupResolver(schema)
  })

  const sendMessage = (content: string) => {
    if (socket && chatId) {
      const message: ChatMessage = {
        id: chatId.toString(),
        message: content,
        senderId: user?.id?.toString() ?? 'No-Auth',
        timestamp: Date.now().toString()
      }

      socket.emit('send-message', message)
      setMessages(prevMessages => [...prevMessages, message])
    }
  }

  useEffect(() => {
    const newSocket = io(endpoints.chat.connection, {
      query: { chatId }
    })

    setSocket(newSocket)

    newSocket.on('chat-message', (message: ChatMessage) => {
      if (message.id === chatId) {
        setMessages(prevMessages => [...prevMessages, message])
      }
    })

    return () => {
      newSocket.disconnect()
    }
  }, [chatId])

  const values = {
    store: CHAT_DATA,
    methods,
    chatId,
    socket,
    sendMessage,
    messages
  }

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
