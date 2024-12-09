import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip, IconButton } from '@mui/material'
import Link from 'next/link'
import { HistoryType } from 'src/types/chatContextType'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { formatMessage } from 'src/utils/utils'

const PostCard = ({ id, type = 'text', prompt, name, image, platform }: HistoryType | any) => {
  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <CardMedia
            component='img'
            height='200'
            image={image}
            alt={prompt}
            sx={{ cursor: 'pointer', objectFit: 'cover', borderRadius: 1, maxHeight: 200 }}
          />
        )
      case 'video':
        return (
          <video
            width='100%'
            muted
            height='200'
            controls
            style={{ borderRadius: '4px', maxHeight: 200, objectFit: 'cover' }}
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
              borderTopRightRadius: 4
            }}
          >
            <Typography variant='body1' color='white'>
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
        boxShadow: 4,
        '&:hover': {
          transform: 'scale(1.05)'
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
      >
        <Icon icon='solar:copy-line-duotone' />
      </IconButton>
      <Link href={`/chat/${id}`}>{renderContent()}</Link>

      {platform && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            gap: 1
          }}
        >
          <Chip label={platform?.toUpperCase()} color='primary' size='small' />
        </Box>
      )}

      {/* Card Content */}
      {!(type === 'text') && prompt && (
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {prompt.length > 20 ? `${prompt.slice(0, 20)}...` : prompt}
          </Typography>
        </CardContent>
      )}
      {/* {description && (
          <Typography variant='body2' color='text.secondary'>
            {description.length > 40 ? `${description.slice(0, 40)}...` : description}
          </Typography>
        )} */}

      {(type === 'image' || type === 'video') && (
        <Button
          variant='contained'
          fullWidth
          sx={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Download
        </Button>
      )}
    </Card>
  )
}

export default PostCard
