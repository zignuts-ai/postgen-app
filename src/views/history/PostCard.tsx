import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip, IconButton, useTheme } from '@mui/material'
import Link from 'next/link'
import { HistoryType } from 'src/types/chatContextType'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { formatMessage } from 'src/utils/utils'

const PostCard = ({ id, type = 'text', prompt, name, image, platform, sessionId }: HistoryType | any) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <CardMedia
            component='img'
            height='200'
            image={image}
            alt={prompt}
            sx={{
              cursor: 'pointer',
              objectFit: 'cover',
              borderRadius: 1,
              maxHeight: 200
            }}
          />
        )
      case 'video':
        return (
          <video
            width='100%'
            muted
            height='200'
            controls
            style={{
              borderRadius: '4px',
              maxHeight: 200,
              objectFit: 'cover'
            }}
          >
            <source src={image} type='video/mp4' />
          </video>
        )
      case 'text':
      default:
        return (
          <Box
            sx={{
              p: 2,
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.grey[200]
            }}
          >
            <Typography variant='body1' color={isDarkMode ? 'text.primary' : 'text.secondary'}>
              {formatMessage(name || prompt)?.length > 130
                ? formatMessage(name || prompt)?.slice(0, 130) + '...'
                : formatMessage(name || prompt) || 'Name not found'}
            </Typography>
          </Box>
        )
    }
  }

  return (
    <Card
      sx={{
        position: 'relative',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: isDarkMode ? 4 : 2,
        backgroundColor: isDarkMode ? theme.palette.background.paper : 'white',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: isDarkMode ? 6 : 4
        }
      }}
    >
      <IconButton
        onClick={e => {
          e.stopPropagation()
          navigator.clipboard.writeText(prompt ?? '')
          toast.success('Copied to your clipboard.')
        }}
        className='absolute top-2 left-2'
        size='small'
        sx={{
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
          }
        }}
      >
        <Icon icon='solar:copy-line-duotone' color={isDarkMode ? '#fff' : '#000'} />
      </IconButton>
      <Link href={`/chat/${id ?? sessionId}`}>{renderContent()}</Link>

      {platform && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            gap: 1,
            backgroundColor: isDarkMode ? theme.palette.background.paper : 'white'
          }}
        >
          <Chip
            label={platform?.toUpperCase()}
            color='primary'
            size='small'
            sx={{
              backgroundColor: isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light,
              color: isDarkMode ? theme.palette.primary.contrastText : theme.palette.primary.contrastText
            }}
          />
        </Box>
      )}

      {/* Card Content */}
      {!(type === 'text') && prompt && (
        <CardContent>
          <Typography gutterBottom variant='h6' component='div' color={isDarkMode ? 'text.primary' : 'text.secondary'}>
            {prompt.length > 20 ? `${prompt.slice(0, 20)}...` : prompt}
          </Typography>
        </CardContent>
      )}

      {(type === 'image' || type === 'video') && (
        <Button
          variant='contained'
          fullWidth
          sx={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bgcolor: isDarkMode ? theme.palette.primary.dark : theme.palette.primary.main,
            '&:hover': {
              bgcolor: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark
            },
            color: theme.palette.primary.contrastText
          }}
        >
          Download
        </Button>
      )}
    </Card>
  )
}

export default PostCard
