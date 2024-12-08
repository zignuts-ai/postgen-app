// ** React Imports
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { CHAT_DATA } from 'src/constants/fakeData'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import { ChatMessage, FormType, PreviewDataType } from 'src/types/chatContextType'
import { useRouter } from 'next/router'
import { io, Socket } from 'socket.io-client'
import endpoints from 'src/constants/endpoints'
import useLoading from 'src/hooks/useLoading'

export type ChatValuesTypes = {
  store: any
  methods: UseFormReturn<FormType, any>
  chatId: string | string[] | undefined
  sendMessage: (content: string) => void
  messages: ChatMessage[]
  isPendingChat: boolean
  isSocketInit: boolean
  setPreviewData: (data: PreviewDataType) => void
  previewData: PreviewDataType
}

// ** Defaults
const ChatContext = createContext({} as ChatValuesTypes)

type Props = {
  children: ReactNode
}

const schema = yup.object().shape({
  prompt: yup.string().min(2, 'Prompt should be at least 2 characters').required('Prompt is required')
})

const ChatProvider = ({ children }: Props) => {
  const router = useRouter()
  const { chatId } = router.query
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_DATA)
  const [previewData, setPreviewData] = useState<PreviewDataType>({} as PreviewDataType)

  const { isLoading: isPendingChat, startLoading: startLoadingChat, stopLoading: stopLoadingChat } = useLoading()
  const { isLoading: isSocketInit, startLoading: startLoadingSocket, stopLoading: stopLoadingSocket } = useLoading()

  // ** States
  const [socket, setSocket] = useState<Socket | null>(null)

  const methods = useForm<FormType>({
    defaultValues: {
      prompt: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const sendMessage = async (content: string) => {
    startLoadingChat()
    try {
      if (socket && chatId) {
        const message: ChatMessage = {
          id: chatId.toString(),
          message: content,
          timestamp: Date.now().toString(),
          role: 'user',
          type: 'text'
        }

        socket.emit('send-message', message)
        setMessages(prevMessages => [...prevMessages, message])
      }
    } finally {
      stopLoadingChat()
    }
  }

  useEffect(() => {
    startLoadingSocket()
    const newSocket = io(endpoints.chat.connection, {
      query: { chatId }
    })

    setSocket(newSocket)

    newSocket.on('connect', () => stopLoadingSocket())
    newSocket.on('chat-message', (message: ChatMessage) => {
      if (message.id === chatId) {
        setMessages(prevMessages => [...prevMessages, message])
      }
    })

    newSocket.on('disconnect', () => stopLoadingSocket())

    return () => {
      newSocket.disconnect()
      stopLoadingSocket()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  const values = useMemo(
    () => ({
      store: CHAT_DATA,
      methods,
      chatId,
      socket,
      sendMessage,
      messages,
      isPendingChat,
      isSocketInit,
      previewData,
      setPreviewData
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatId, socket, messages, isPendingChat, isSocketInit, previewData, methods]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
