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
import SyncLoader from 'react-spinners/SyncLoader'

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
  const { messages, chatDetails } = useChat()

  // ** Props
  const { hidden, mdAbove, handleLeftSidebarToggle, handleUserProfileRightSidebarToggle } = props

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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.975rem' }}>
                      {chatDetails?.data?.[0]?.name ?? 'Not Found'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <ChatLog hidden={hidden} />

            <SendMsgForm />
          </Box>
        )
      }
    } else {
      return <SyncLoader color='#7a88ee' className='my-5' />
    }
  }

  return renderContent()
}

export default ChatContent
