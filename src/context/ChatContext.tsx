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

export type ChatValuesTypes = {
  store: any
  methods: UseFormReturn<FormType, any>
  chatId: string | string[] | undefined
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
  content: string
  senderId: string
  timestamp: number
}

const ChatProvider = ({ children }: Props) => {
  const router = useRouter()

  const { chatId } = router.query
  const [messages, setMessages] = useState<ChatMessage[]>([])

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
        content,
        senderId: 'current-user-id', // Replace with actual user ID
        timestamp: Date.now()
      }

      socket.emit('send-message', message)
      setMessages(prevMessages => [...prevMessages, message])
    }
  }

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      query: { chatId }
    })

    setSocket(newSocket)

    // Listen for messages specific to this chat
    newSocket.on('chat-message', (message: ChatMessage) => {
      if (message.id === chatId) {
        setMessages(prevMessages => [...prevMessages, message])
      }
    })

    // Cleanup socket connection on unmount
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
