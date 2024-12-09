// ** React Imports
import { forwardRef, ReactElement, Ref, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Store & Actions Imports
import { sendMsg } from 'src/store/apps/chat'

// ** Types
import { StatusObjType } from 'src/types/apps/chatTypes'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'
import ChatContent from 'src/views/chat/ChatContent'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps } from '@mui/material'
import ChatPreview from 'src/views/chat/ChatPreview'
import { useChat } from 'src/hooks/useChat'
import useModal from 'src/hooks/useModal'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

// ** Chat App Components Imports

const AppChat = () => {
  // ** States
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [userProfileRightOpen, setUserProfileRightOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { closeModal, isOpen, openModal } = useModal()
  const { settings } = useSettings()
  const { messages } = useChat()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  const { skin } = settings
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const sidebarWidth = smAbove ? 370 : 300
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'))
  const statusObj: StatusObjType = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  }

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleUserProfileRightSidebarToggle = () => setUserProfileRightOpen(!userProfileRightOpen)

  return (
    <Grid container spacing={6} justifyContent='center' alignItems='center'>
      <Grid item xs={12} lg={8} sx={{ height: '100%' }}>
        <Box
          className='app-chat'
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'background.paper',
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }}
        >
          <ChatContent
            hidden={hidden}
            sendMsg={sendMsg}
            mdAbove={mdAbove}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            openModal={openModal}
          />
        </Box>
      </Grid>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={closeModal}
        TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id='alert-dialog-slide-title'>Social Preview</DialogTitle>
        <DialogContent>
          <ChatPreview />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={closeModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {messages && (
        <Grid item xs={12} lg={4} sx={{ height: '100%' }}>
          <ChatPreview />
        </Grid>
      )}
    </Grid>
  )
}

AppChat.contentHeightFixed = true
AppChat.publicGuard = true

export default AppChat
