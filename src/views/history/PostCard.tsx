import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material'
import { Content } from 'src/types/contentTypes'
import Link from 'next/link'

const PostCard = ({ image, title, description, platform, type = 'image', aiGenerated = true, id }: Content) => {
  return (
    <>
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
        <Link href={`/chat/${id}`}>
          {/* Meme Image/Video */}
          {type === 'image' ? (
            <CardMedia
              component='img'
              height='300'
              image={image}
              alt={title}
              sx={{ cursor: 'pointer', objectFit: 'cover', borderRadius: 1, maxHeight: 200 }}
            />
          ) : (
            <video
              width='100%'
              muted
              height='300'
              controls
              style={{ borderRadius: '4px', maxHeight: 200, objectFit: 'cover' }}
            >
              <source src={image} type='video/mp4' />
            </video>
          )}
        </Link>

        {/* Platform and AI Generated Chip */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            gap: 1
          }}
        >
          <Chip label={platform.toUpperCase()} color='primary' size='small' />
          {aiGenerated && <Chip label='AI Generated' color='secondary' size='small' />}
        </Box>

        {/* Card Content */}
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description.length > 40 ? `${description.slice(0, 40)}...` : description}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <IconButton aria-label='add to favorites' onClick={() => setLiked(!liked)}>
            <FavoriteIcon color={(liked ? 'error' : 'default') as any} />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </Box> */}

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
          Dowonload
        </Button>
      </Card>
    </>
  )
}

export default PostCard
