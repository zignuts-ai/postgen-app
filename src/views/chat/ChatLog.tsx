// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { useChat } from 'src/hooks/useChat'
import { useAuth } from 'src/hooks/useAuth'
import { ChatMessage } from 'src/types/chatContextType'
import themeConfig from 'src/configs/themeConfig'
import MediaCard from './MediaCardPreview'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown> }>(({ theme }) => ({
  padding: theme.spacing(5)
}))

const ChatLog = ({ hidden }: { hidden: boolean }) => {
  // ** Props
  const { messages } = useChat()
  const { user } = useAuth()

  const senderData = {
    about: 'shsh',
    avatar: '/images/avatars/1.png',
    fullName: user?.name ?? 'Guest',
    id: '4396b8e1-a77d-4aa4-adcf-0fed81d06c2e',
    role: 'user'
  }

  // ** Ref
  const chatArea = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        // @ts-ignore
        chatArea.current.scrollTop = chatArea.current.scrollHeight
      } else {
        // @ts-ignore
        chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight
      }
    }
  }

  useEffect(() => {
    if (messages && messages.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // Render different message types
  const renderMessageType = (item: ChatMessage) => {
    switch (item.type) {
      case 'text':
        return (
          <Typography
            sx={{
              p: theme => theme.spacing(2, 3),
              borderRadius: 2,
              maxWidth: '100%',
              wordBreak: 'break-word'
            }}
          >
            {item.message}
          </Typography>
        )

      case 'image':
        return (
          <MediaCard
            type='image'
            src={
              'https://plus.unsplash.com/premium_photo-1688645554172-d3aef5f837ce?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwbW91bnRhaW5zfGVufDB8fDB8fHww'
            }
            alt='Uploaded image'
          />
        )

      case 'video':
        return <MediaCard type='video' src={'https://www.w3schools.com/html/movie.mp4'} alt='Uploaded video' />

      case 'meme':
        return (
          <MediaCard
            type='meme'
            src={
              'https://global.discourse-cdn.com/flex028/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg'
            }
            alt='Meme'
          />
        )

      default:
        return null
    }
  }

  // ** Renders user chat
  const renderChats = () => {
    return messages.map((item: ChatMessage, index: number) => {
      const isSender = item.role === 'user'

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== messages.length - 1 ? 4 : undefined
          }}
        >
          <div>
            <CustomAvatar
              skin='light'
              color='primary'
              sx={{
                width: '2rem',
                height: '2rem',
                fontSize: '0.875rem',
                ml: isSender ? 3.5 : undefined,
                mr: !isSender ? 3.5 : undefined
              }}
              {...(!isSender
                ? {
                    src: '/logo.png',
                    alt: 'ta.contact.fullName'
                  }
                : {})}
              {...(isSender
                ? {
                    src: senderData.avatar,
                    alt: senderData.fullName
                  }
                : {})}
            >
              {getInitials(isSender ? senderData.fullName : themeConfig.templateName)}
            </CustomAvatar>
          </div>

          <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
              <div>
                <Typography
                  sx={{
                    boxShadow: 1,
                    borderRadius: 1,
                    maxWidth: '100%',
                    width: 'fit-content',
                    fontSize: '0.875rem',
                    wordWrap: 'break-word',
                    p: theme => theme.spacing(3, 4),
                    ml: isSender ? 'auto' : undefined,
                    borderTopLeftRadius: !isSender ? 0 : undefined,
                    borderTopRightRadius: isSender ? 0 : undefined,
                    color: isSender ? 'common.white' : 'text.primary',
                    backgroundColor: isSender ? 'primary.main' : 'background.paper'
                  }}
                >
                  {item.message}
                  {!isSender && renderMessageType(item)}
                </Typography>
              </div>
              {index + 1 === length ? (
                <Box
                  sx={{
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSender ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Typography variant='caption'>{item.timestamp}</Typography>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      )
    })
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </Box>
      )
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      )
    }
  }

  return (
    <Box sx={{ height: 'calc(100% - 8.4375rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default ChatLog
