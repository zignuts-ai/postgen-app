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
import moment from 'moment'

// ** Types Imports
import { useChat } from 'src/hooks/useChat'
import { useAuth } from 'src/hooks/useAuth'
import { ChatMessage } from 'src/types/chatContextType'
import themeConfig from 'src/configs/themeConfig'
import MediaCard from './MediaCard'
import { Avatar, Card, CardContent, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import BeatLoader from 'react-spinners/BeatLoader'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown> }>(({ theme }) => ({
  padding: theme.spacing(5)
}))

const ChatLog = ({ hidden }: { hidden: boolean }) => {
  // ** Props
  const { messages, chatDetailQuery } = useChat()
  const { user } = useAuth()

  const senderData = {
    about: 'shsh',
    avatar: `https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`,
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
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#373737' }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography variant='body2' sx={{ mb: 3, color: 'common.white' }}>
                {item?.message ?? 'Generating..'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt={user?.name}
                    src={`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`}
                    sx={{ width: 22, height: 22, mr: 2.75 }}
                  />
                  <Typography variant='body2' sx={{ color: 'common.white' }}>
                    {user?.name ?? 'John Doe'}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(item?.message ?? '')
                    toast.success('Copied to your clipboard.')
                  }}
                  size='small'
                >
                  <Icon icon='solar:copy-line-duotone' />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        )

      case 'image':
        return (
          <MediaCard
            type='image'
            src={
              item?.message ||
              'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
            }
            alt='Generated Image'
            item={item}
          />
        )

      case 'video':
        return (
          <MediaCard
            item={item}
            type='video'
            src={item?.message || 'https://www.w3schools.com/html/movie.mp4'}
            alt='Uploaded video'
          />
        )

      case 'meme':
        return (
          <MediaCard
            type='meme'
            src={
              'https://global.discourse-cdn.com/flex028/uploads/daml/optimized/2X/0/07c87a4e2885ff7d9674efb218e08a5d354612f6_2_500x500.jpeg'
            }
            alt='Meme'
            item={item}
          />
        )

      default:
        return null
    }
  }

  // ** Renders user chat
  const renderChats = () => {
    return (messages ?? []).map((item: ChatMessage, index: number) => {
      const isSender = item.role === 'user'

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== (messages?.length ?? 0) - 1 ? 4 : undefined
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
                  {isSender ? (
                    item.message
                  ) : item?.isLoading ? (
                    <Typography variant='body2' sx={{ color: 'common.white', display: 'flex', height: 20 }}>
                      <Icon color='white' icon='svg-spinners:3-dots-scale' fontSize={20} />
                      <Icon color='white' icon='svg-spinners:3-dots-scale' fontSize={20} />
                      <Icon color='white' icon='svg-spinners:3-dots-scale' fontSize={20} />
                    </Typography>
                  ) : (
                    <div className='my-3'>{renderMessageType(item)}</div>
                  )}
                </Typography>
              </div>

              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSender ? 'flex-end' : 'flex-start'
                }}
              >
                <Typography variant='caption'>{moment(item.created_at).format('h:mm A')}</Typography>
              </Box>
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
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false, suppressScrollX: true }}>
          {children}
        </PerfectScrollbar>
      )
    }
  }

  return (
    <Box sx={{ height: 'calc(100% - 8.4375rem)' }} className='common-scroll'>
      <ScrollWrapper>
        {chatDetailQuery?.isPending ? (
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='flex items-center space-x-4'>
              <BeatLoader color='#7a88ee' size={15} />
            </div>
            <p className='mt-4 text-sm text-gray-300'>Please wait while we process your request...</p>
          </div>
        ) : (
          renderChats()
        )}
      </ScrollWrapper>
    </Box>
  )
}

export default ChatLog
