import { Message, Share, ThumbUp } from '@mui/icons-material'
import { Avatar, Box, Button, CardMedia, Typography } from '@mui/material'
import React from 'react'

type Props = {
  metadata: {
    caption: string
    imageUrl: string
  }
}

const LinkedInPreview = ({ metadata }: Props) => {
  const { caption, imageUrl } = metadata

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Box display='flex' alignItems='center'>
          <Avatar src={'/avatar.png'} alt={'Author Name'} sx={{ width: 40, height: 40, mr: 2 }} />
          <Box>
            <Typography variant='subtitle1' fontWeight='bold'>
              John Doe
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              1 Hour ago
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant='body1' mb={2}>
        {caption}
      </Typography>
      {imageUrl && <CardMedia component='img' image={imageUrl} alt='Post content' sx={{ borderRadius: 2, mb: 2 }} />}
      <Box display='flex' justifyContent='space-between' alignItems='center' color='text.secondary'>
        <Button startIcon={<ThumbUp />} sx={{ textTransform: 'none' }}>
          Like 20
        </Button>
        <Button startIcon={<Message />} sx={{ textTransform: 'none' }}>
          Comment 65
        </Button>
        <Button startIcon={<Share />} sx={{ textTransform: 'none' }}>
          Share
        </Button>
      </Box>
    </>
  )
}

export default LinkedInPreview
