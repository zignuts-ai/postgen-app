import React, { useState } from 'react'
import { Button, Card, CardMedia, styled } from '@mui/material'
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

// const HoverOverlay = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   height: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: theme.spacing(1),
//   opacity: 0,
//   transition: 'opacity 0.3s ease',
//   background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
//   zIndex: 10
// }))

interface MediaCardProps {
  type: 'image' | 'video' | 'meme'
  src: string
  alt?: string
  onZoom?: () => void
  item: ChatMessage
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MediaCard: React.FC<MediaCardProps> = ({ type, src, alt = 'Media', onZoom, item }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false)

  // console.log(isHovered, onZoom, item)

  // const { setPreviewData } = useChat()

  // const [loading, setLoading] = useState(true)

  // Function to download media using anchor tag
  const downloadMedia = (e: any) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = src
    link.target = '_blank'

    link.download = `${alt || 'downloaded-media'}.png`

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <HoverableCard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* <HoverOverlay
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
      </HoverOverlay> */}
      {/* {loading && <Skeleton variant='rectangular' height={345} width={345} />} */}

      {type === 'video' ? (
        <>
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

            // onLoadedData={() => setLoading(false)}
          />
          <Button onClick={downloadMedia} variant='contained' fullWidth sx={{ mt: 2 }}>
            Download
          </Button>
        </>
      ) : (
        <>
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

            // onLoad={() => setLoading(false)}
            // onError={() => setLoading(false)}
          />
          <Button onClick={downloadMedia} variant='contained' fullWidth sx={{ mt: 2 }}>
            Download
          </Button>
        </>
      )}
    </HoverableCard>
  )
}

export default MediaCard
