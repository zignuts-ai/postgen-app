import React, { useState } from 'react'
import { Card, CardMedia, Box, IconButton, styled } from '@mui/material'
import { Icon } from '@iconify/react'

const HoverableCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  maxWidth: 345,
  margin: theme.spacing(1),
  overflow: 'hidden',
  '&:hover': {
    cursor: 'pointer'
  }
}))

const HoverOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.3s ease',
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
  zIndex: 10
}))

interface MediaCardProps {
  type: 'image' | 'video' | 'meme'
  src: string
  alt?: string
  onZoom?: () => void
}

const MediaCard: React.FC<MediaCardProps> = ({ type, src, alt = 'Media', onZoom }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <HoverableCard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <HoverOverlay
        sx={{
          opacity: isHovered ? 1 : 0
        }}
      >
        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)'
            }
          }}
          onClick={e => {
            e.stopPropagation()
            onZoom?.()
          }}
        >
          <Icon icon='mdi:eye' fontSize={22} />
        </IconButton>
      </HoverOverlay>
      {type === 'video' ? (
        <CardMedia
          component='video'
          controls={false}
          autoPlay
          height='194'
          src={src}
          sx={{
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      ) : (
        <CardMedia
          component='img'
          height='194'
          image={src}
          alt={alt}
          sx={{
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      )}
    </HoverableCard>
  )
}

export default MediaCard
