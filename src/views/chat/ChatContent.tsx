// ** MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypes'
import SendMsgForm from './SendMsgForm'
import { useChat } from 'src/hooks/useChat'
import { Button, IconButton, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  const { messages, chatDetails, chatDetailQuery } = useChat()
  const router = useRouter()

  const isDownMd = useMediaQuery('(min-width:1200px)')

  // ** Props
  const { hidden, mdAbove, handleLeftSidebarToggle, handleUserProfileRightSidebarToggle, openModal } = props

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  const renderContent = () => {
    if (messages) {
      if (!messages.length) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <MuiAvatar
              sx={{
                mb: 6,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                boxShadow: 3,
                backgroundColor: 'background.paper'
              }}
            >
              <Icon icon='bx:message' fontSize='3.125rem' />
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                py: 2,
                px: 6,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                cursor: mdAbove ? 'default' : 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '1.125rem', lineHeight: 'normal' }}>
                Start Conversation
              </Typography>
            </Box>
          </ChatWrapperStartChat>
        )
      } else {
        return (
          <Box
            sx={{
              width: 0,
              flexGrow: 1,
              height: '100%',
              backgroundColor: 'action.hover'
            }}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.975rem' }}>
                      {chatDetails?.data?.name ?? 'Not Found'}
                    </Typography>
                  </Box>
                  {!isDownMd && (
                    <div>
                      <IconButton onClick={openModal}>
                        <Icon icon='mdi:eye' fontSize={22} />
                      </IconButton>
                    </div>
                  )}
                </Box>
              </Box>
            </Box>

            <ChatLog hidden={hidden} />

            <SendMsgForm />
          </Box>
        )
      }
    } else if (!chatDetailQuery.isPending) {
      return (
        <div className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col items-center mb-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-16 h-16 text-gray-400'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z' />
            </svg>
            <h1 className='mt-4 text-xl font-semibold text-gray-200'>No Chats Found</h1>
            <p className='mt-2 text-sm text-gray-400'>Start a new conversation to see messages here.</p>
          </div>
          <Button
            variant='outlined'
            size='small'
            className='mt-6 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition'
            onClick={() => router.push('/chat')}
          >
            Start New Chat
          </Button>
        </div>
      )
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
