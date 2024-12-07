// ** React Imports
import { createContext, ReactNode, useMemo } from 'react'
import { CHAT_DATA } from 'src/constants/fakeData'

// ** Types
import { ChatValuesTypes } from 'src/types/chatContextType'

// ** Defaults
const defaultProvider: ChatValuesTypes = {
  store: {}
}

const ChatContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const ChatProvider = ({ children }: Props) => {
  // ** States

  const values = useMemo(() => ({ store: CHAT_DATA }), [])

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }
