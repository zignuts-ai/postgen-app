import { Message, Share, ThumbUp } from '@mui/icons-material'
import { Avatar, Box, Button, CardMedia, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useAuth } from 'src/hooks/useAuth'

type Props = {
  metadata: {
    caption: string
    imageUrl: string
    type: string
  }
}

const LinkedInPreview = ({ metadata }: Props) => {
  const { user } = useAuth()
  const { imageUrl, caption, type } = metadata
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Avatar
          src={`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`}
          alt={'John Doe'}
          sx={{ width: 40, height: 40, marginRight: '12px' }}
        />
        <Box>
          <Typography variant='subtitle1' fontWeight='bold' color={theme.palette.text.primary}>
            {user?.name ?? 'John Doe'}
          </Typography>
          <Typography variant='caption' color={theme.palette.text.secondary}>
            1 hr go
          </Typography>
        </Box>
      </Box>
      <Typography variant='body1' sx={{ padding: '16px', color: theme.palette.text.primary }}>
        {caption
          ? caption
          : 'React has become one of the most popular JavaScript libraries for building user interfaces. In this post I will share some tips and best practices I have learned over the years.'}
      </Typography>

      {type === 'image' || type === 'meme' ? (
        <CardMedia component='img' image={imageUrl} alt='Post content' sx={{ width: '100%', height: 'auto' }} />
      ) : type === 'video' ? (
        <CardMedia component='video' src={imageUrl} autoPlay controls sx={{ width: '100%', height: 'auto' }} />
      ) : null}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px'
        }}
      >
        <Button color='secondary' startIcon={<ThumbUp color='secondary' />} sx={{ textTransform: 'none' }}>
          Like
        </Button>
        <Button color='secondary' startIcon={<Message color='secondary' />} sx={{ textTransform: 'none' }}>
          Comment
        </Button>
        <Button color='secondary' startIcon={<Share color='secondary' />} sx={{ textTransform: 'none' }}>
          Share
        </Button>
      </Box>
    </Box>
  )
}

export default LinkedInPreview
