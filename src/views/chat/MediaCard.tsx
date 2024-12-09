import React, { useState } from 'react'
import { Card, CardMedia, Box, IconButton, styled, Skeleton } from '@mui/material'
import { Icon } from '@iconify/react'
import { useChat } from 'src/hooks/useChat'
import { ChatMessage } from 'src/types/chatContextType'

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
  item: ChatMessage
}

const MediaCard: React.FC<MediaCardProps> = ({ type, src, alt = 'Media', onZoom, item }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { setPreviewData } = useChat()
  const [loading, setLoading] = useState(true)

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
            setPreviewData({
              title: item.message ?? '',
              caption: '',
              imageUrl: item.message ?? src,
              type: item?.type ?? 'image'
            })
          }}
        >
          <Icon icon='mdi:eye' fontSize={22} />
        </IconButton>
      </HoverOverlay>
      {loading && <Skeleton variant='rectangular' height={345} width={345} />}

      {type === 'video' ? (
        <CardMedia
          component='video'
          controls={false}
          autoPlay
          muted
          loop
          height='194'
          src={src}
          sx={{
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
          onLoadedData={() => setLoading(false)}
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
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      )}
    </HoverableCard>
  )
}

export default MediaCard
