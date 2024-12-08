import React from 'react'
import { Box, Avatar, Typography, IconButton, Divider } from '@mui/material'
import {
  ChatBubbleOutline as CommentIcon,
  Repeat as RetweetIcon,
  FavoriteBorder as LikeIcon,
  IosShare as ShareIcon
} from '@mui/icons-material'

type Props = {
  metadata: {
    caption: string
    imageUrl: string[]
  }
}
const XPreview = ({ metadata }: Props) => {
  const { caption, imageUrl } = metadata

  return (
    <>
      {/* Post Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
        <Avatar src={'/images/testimonials/jessica-saunders.png'} sx={{ width: 48, height: 48, mr: 2 }} />
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            John Doe
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            @johndoe12
          </Typography>
        </Box>
      </Box>

      {/* Post Content */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography sx={{ ml: '1rem', pt: '1rem' }} variant='body1' paragraph>
          {caption}
        </Typography>

        {imageUrl && imageUrl.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 1
            }}
          >
            {imageUrl.map((image, index) => (
              <Box
                key={index}
                component='img'
                src={image}
                alt={`Post image ${index}`}
                sx={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 1
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Engagement Section */}
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          py: 1
        }}
      >
        <IconButton color='primary'>
          <CommentIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            0
          </Typography>
        </IconButton>

        <IconButton color='primary'>
          <RetweetIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            0
          </Typography>
        </IconButton>

        <IconButton color='primary'>
          <LikeIcon />
          <Typography variant='body2' sx={{ ml: 1 }}>
            0
          </Typography>
        </IconButton>

        <IconButton color='primary'>
          <ShareIcon />
        </IconButton>
      </Box>

      {/* Timestamp */}
      <Box sx={{ px: 2, pb: 2, color: 'text.secondary' }}>
        <Typography variant='caption'>2 hours ago</Typography>
      </Box>
    </>
  )
}

export default XPreview
