// ** React Imports
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import {
  ChatMessage,
  CreateSessionResponseTypes,
  FormType,
  GetChatByIdResponseTypes,
  PreviewDataType
} from 'src/types/chatContextType'
import { useRouter } from 'next/router'
import { io, Socket } from 'socket.io-client'
import endpoints from 'src/constants/endpoints'
import useLoading from 'src/hooks/useLoading'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { CHAT } from 'src/queries/query-keys'
import { createChatSession, getChatById } from 'src/queries/chat'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export type ChatValuesTypes = {
  methods: UseFormReturn<FormType, any>
  chatId: string | string[] | undefined
  sendMessage: (content: string) => void
  messages: ChatMessage[]
  isPendingChat: boolean
  isSocketInit: boolean
  setPreviewData: (data: PreviewDataType) => void
  previewData: PreviewDataType
  handleCraeteSessionChat: UseMutationResult<CreateSessionResponseTypes, AxiosError<unknown, any>, any, unknown>
  chatDetails: GetChatByIdResponseTypes | null
  chatDetailQuery: UseQueryResult<GetChatByIdResponseTypes, Error>
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
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatDetails, setChatDetails] = useState<GetChatByIdResponseTypes | null>(null)
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

  const chatDetailQuery = useQuery({
    queryKey: [CHAT.GET_DETIAL_BY_ID],
    queryFn: () => getChatById(chatId as string),
    enabled: !!chatId
  })

  const handleCraeteSessionChat = useMutation({
    mutationFn: createChatSession,
    onSuccess: data => {
      router.push(`/chat/${data.data.sessionId}`)
      toast.success('Chat Session Created Successfully')
    },
    onError: async (err: AxiosError) => {
      console.log(err)
    }
  })

  const sendMessage = async (content: string) => {
    startLoadingChat()
    try {
      if (socket && chatId) {
        const message: ChatMessage = {
          messageId: chatId as string,
          message: content,
          role: 'user',
          type: 'text',
          created_at: Date.now(),
          created_by: 'user',
          metadata: null
        }

        socket.emit('send-message', message)
        setMessages(prevMessages => [...prevMessages, message])
      }
    } finally {
      stopLoadingChat()
    }
  }

  useEffect(() => {
    return
    startLoadingSocket()
    const newSocket = io(endpoints.chat.connection, {
      query: { chatId }
    })

    setSocket(newSocket)

    newSocket.on('connect', () => stopLoadingSocket())
    newSocket.on('chat-message', (message: ChatMessage) => {
      if (message.messageId === chatId) {
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

  useEffect(() => {
    if (chatDetailQuery?.data) {
      setMessages(chatDetailQuery?.data?.data?.[0]?.messages)
      setChatDetails(chatDetailQuery?.data)
    }
  }, [chatDetailQuery])

  const values = useMemo(
    () => ({
      methods,
      chatId,
      socket,
      sendMessage,
      messages,
      isPendingChat,
      isSocketInit,
      previewData,
      setPreviewData,
      handleCraeteSessionChat,
      chatDetails,
      chatDetailQuery
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatId, socket, messages, isPendingChat, isSocketInit, previewData, methods]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
