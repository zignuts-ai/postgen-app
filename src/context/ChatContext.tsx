// ** React Imports
import { createContext, ReactNode } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { CHAT_DATA } from 'src/constants/fakeData'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import { FormType } from 'src/types/chatContextType'
import { useRouter } from 'next/router'

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

const ChatProvider = ({ children }: Props) => {
  const router = useRouter()

  const { chatId } = router.query

  // ** States
  const methods = useForm<FormType>({
    defaultValues: {
      prompt: ''
    },
    resolver: yupResolver(schema)
  })

  const values = { store: CHAT_DATA, methods, chatId }

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
