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
  GuestHistoryType,
  PreviewDataType
} from 'src/types/chatContextType'
import { useRouter } from 'next/router'
import { io, Socket } from 'socket.io-client'
import endpoints from 'src/constants/endpoints'
import useLoading from 'src/hooks/useLoading'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { CHAT } from 'src/queries/query-keys'
import { createChatSession, getChatById, updateCurrentChat } from 'src/queries/chat'
import { AxiosError } from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import { LOCAL_CHAT_SESSION_KEY } from 'src/constants/constant'
import toast from 'react-hot-toast'

export type ChatValuesTypes = {
  methods: UseFormReturn<FormType, any>
  chatId: string | string[] | undefined
  sendMessage: (content: string) => void
  messages: ChatMessage[] | null
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[] | null>>
  isPendingChat: boolean
  isSocketInit: boolean
  setPreviewData: (data: PreviewDataType) => void
  previewData: PreviewDataType
  handleCraeteSessionChat: UseMutationResult<CreateSessionResponseTypes, AxiosError<unknown, any>, any, unknown>
  chatDetails: GetChatByIdResponseTypes | null
  chatDetailQuery: UseQueryResult<GetChatByIdResponseTypes, Error>
  guestHistory: GuestHistoryType[]
  setIsContenegenerating: React.Dispatch<React.SetStateAction<boolean>>
  isContenegenerating: boolean
  handleUpdateChat: UseMutationResult<CreateSessionResponseTypes, AxiosError<unknown, any>, any, unknown>
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
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const [chatDetails, setChatDetails] = useState<GetChatByIdResponseTypes | null>(null)
  const [previewData, setPreviewData] = useState<PreviewDataType>({} as PreviewDataType)
  const [guestHistory, setGuestHistory] = useState<GuestHistoryType[]>([])
  const { isLoading: isPendingChat, startLoading: startLoadingChat, stopLoading: stopLoadingChat } = useLoading()
  const { isLoading: isSocketInit, startLoading: startLoadingSocket, stopLoading: stopLoadingSocket } = useLoading()
  const [isContenegenerating, setIsContenegenerating] = useState<boolean>(false)

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
    mutationFn: dto => createChatSession(dto, user),
    onSuccess: data => {
      if (!user) {
        const guestHistory = JSON.parse(localStorage.getItem(LOCAL_CHAT_SESSION_KEY) || '[]')
        guestHistory.push({
          sessionId: data.data.sessionId,
          name: data.data.message,
          createdAt: data.data?.createdAt
        })
        localStorage.setItem(LOCAL_CHAT_SESSION_KEY, JSON.stringify(guestHistory))
      }
      router.push(`/chat/${data.data.sessionId}`)
    },
    onError: async (err: AxiosError) => {
      console.log(err)
    }
  })

  const handleUpdateChat = useMutation({
    mutationFn: dto => updateCurrentChat(dto, user),
    onSuccess: data => {
      setIsContenegenerating(false)
      console.log(data)
    },
    onError: async (err: AxiosError) => {
      console.log('hjhj')
      setIsContenegenerating(false)
      console.log(err)
      toast.error(err.message)
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
        setMessages(prevMessages => [...(prevMessages || []), message])
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
        setMessages(prevMessages => [...(prevMessages || []), message])
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

  useEffect(() => {
    if (!user) {
      const storedHistory = localStorage.getItem(LOCAL_CHAT_SESSION_KEY)
      if (storedHistory) {
        try {
          const parsedHistory = JSON.parse(storedHistory)
          setGuestHistory(parsedHistory)
        } catch (error) {
          console.error('Error parsing guest history', error)
          localStorage.removeItem(LOCAL_CHAT_SESSION_KEY)
        }
      }
    }
  }, [user])

  const values = useMemo(
    () => ({
      methods,
      chatId,
      socket,
      sendMessage,
      messages,
      setMessages,
      isPendingChat,
      isSocketInit,
      previewData,
      setPreviewData,
      handleCraeteSessionChat,
      chatDetails,
      chatDetailQuery,
      guestHistory,
      handleUpdateChat,
      setIsContenegenerating,
      isContenegenerating
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatId, socket, messages, isPendingChat, isSocketInit, previewData, methods]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
