import React from 'react'
import { Box, Avatar, Typography, IconButton, Divider } from '@mui/material'
import {
  ChatBubbleOutline as CommentIcon,
  Repeat as RetweetIcon,
  FavoriteBorder as LikeIcon,
  IosShare as ShareIcon
} from '@mui/icons-material'
import { useAuth } from 'src/hooks/useAuth'

type Props = {
  metadata: {
    caption: string
    imageUrl: string
    type: string
  }
}

const XPreview = ({ metadata }: Props) => {
  const { caption, imageUrl, type } = metadata

  const { user } = useAuth()

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {/* Post Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Avatar
          src={`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`}
          alt={'Profile Picture'}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            {user?.name ?? 'John Doe'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            @user
          </Typography>
        </Box>
      </Box>

      {/* Post Content */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant='body1' paragraph>
          {caption
            ? caption
            : 'React has become one of the most popular JavaScript libraries for building user interfaces. In this post I will share some tips and best practices I have learned over the years.'}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 1,
            background: '#f5f5f5'
          }}
        >
          {type === 'image' || type === 'meme' ? (
            <Box
              component='img'
              src={imageUrl}
              alt={`Post image `}
              sx={{
                width: '100%',
                height: 150,
                objectFit: 'contain',
                borderRadius: 1
              }}
            />
          ) : type === 'video' ? (
            <Box
              component='video'
              src={imageUrl}
              sx={{
                width: '100%',
                height: 150,
                objectFit: 'contain',
                borderRadius: 1
              }}
            />
          ) : null}
        </Box>
      </Box>

      {/* Engagement Section */}
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          py: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <IconButton
          sx={{
            color: 'darkgray'
          }}
        >
          <CommentIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            12
          </Typography>
        </IconButton>

        <IconButton
          sx={{
            color: 'darkgray'
          }}
        >
          <RetweetIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            3
          </Typography>
        </IconButton>

        <IconButton
          sx={{
            color: 'darkgray'
          }}
        >
          <LikeIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            10
          </Typography>
        </IconButton>

        <IconButton
          sx={{
            color: 'darkgray'
          }}
        >
          <ShareIcon />
        </IconButton>
      </Box>

      {/* Timestamp */}
      <Box sx={{ p: 2, color: 'text.secondary' }}>
        <Typography variant='caption'>{new Date().toLocaleString()}</Typography>
      </Box>
    </Box>
  )
}

export default XPreview
