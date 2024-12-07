import React, { useState } from 'react'
import { Card, CardMedia, CardContent, Typography, Button, Modal, Box, Chip, IconButton } from '@mui/material'
import { Share as ShareIcon, Favorite as FavoriteIcon } from '@mui/icons-material'

const MemeCard = ({ image, title, description, platform, type = 'image', aiGenerated = true }) => {
  const [open, setOpen] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none'
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          minWidth: 280,
          position: 'relative',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: 4,
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      >
        {/* Meme Image/Video */}
        {type === 'image' ? (
          <CardMedia
            component='img'
            height='300'
            image={image}
            alt={title}
            onClick={handleOpen}
            sx={{ cursor: 'pointer', objectFit: 'cover', borderRadius: 1 }}
          />
        ) : (
          <video width='100%' height='300' controls style={{ borderRadius: '4px' }} onClick={handleOpen}>
            <source src={image} type='video/mp4' />
          </video>
        )}

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
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <IconButton aria-label='add to favorites' onClick={() => setLiked(!liked)}>
            <FavoriteIcon color={liked ? 'error' : 'default'} />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </Box>

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

      {/* Modal for Enlarged View */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='meme-modal-title'
        aria-describedby='meme-modal-description'
      >
        <Box sx={modalStyle}>
          {type === 'image' ? (
            <img
              src={image}
              alt={title}
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
            />
          ) : (
            <video width='100%' height='auto' controls style={{ maxHeight: '70vh' }}>
              <source src={image} type='video/mp4' />
            </video>
          )}

          <Typography id='meme-modal-title' variant='h6' component='h2' mt={2}>
            {title}
          </Typography>
          <Typography id='meme-modal-description' variant='body1' mt={1}>
            {description}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default MemeCard
