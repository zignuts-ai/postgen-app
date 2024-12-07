import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import useModal from 'src/hooks/useModal'
import AddDBmodal from './AddPostModal'

const DashboardView = () => {
  const { closeModal, isOpen } = useModal()

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          '& $arrowIcon': {
            transform: 'translateX(4px)'
          }
        }
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography textAlign={'center'} variant='h5' fontWeight={600}>
          What will you create?
        </Typography>
        <Typography textAlign={'center'} variant='body2' fontWeight={400}>
          Stay consistent, creative, and productive with SocialBee's free AI social media post generator.
        </Typography>
        {/* <Button onClick={openModal} variant='contained' endIcon={<Icon icon='material-symbols:add' />}>
          Create Post
        </Button> */}
      </CardContent>
      <AddDBmodal isOpen={isOpen} closeModal={closeModal} />
    </Card>
  )
}

export default DashboardView
