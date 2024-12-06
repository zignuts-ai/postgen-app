// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Button, CardActionArea, MenuItem, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import { ArrowForwardIos } from '@mui/icons-material'

const Home = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <Card>
          <CardHeader title='Kick start your project 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template.
            </Typography>
          </CardContent>
        </Card> */}
      </Grid>
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
        onClick={handleOpen}
      >
        <CardActionArea>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h6'>Create Dashboard</Typography>
            <ArrowForwardIos className='arrowIcon' sx={{ transition: 'transform 0.3s' }} />
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #007bff, #00bcd4)',
            opacity: 0.1,
            transition: 'opacity 0.3s'
          }}
        />
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              p: 5
            }}
          >
            <Typography variant='h6'>Setup New Connection</Typography>
            <TextField label='Connection Name' variant='outlined' />
            <TextField select label='Connection Method' variant='outlined' defaultValue='Standard (TCP/IP)'>
              <MenuItem value='Standard (TCP/IP)'>Standard (TCP/IP)</MenuItem>
              {/* Add more connection method options as needed */}
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label='Hostname' variant='outlined' />
              <TextField label='Port' variant='outlined' />
            </Box>
            <TextField label='Username' variant='outlined' />
            <TextField
              label='Password'
              variant='outlined'
              type='password'
              InputProps={{
                endAdornment: <Button variant='text'>Store in Keychain</Button>
              }}
            />
            <TextField label='Default Schema' variant='outlined' />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant='outlined'>Configure Server Management</Button>
              <Button variant='outlined'>Test Connection</Button>
              <Button onClick={handleClose} variant='outlined'>
                Cancel
              </Button>
              <Button variant='contained'>OK</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid> */}
      {/* <Adddbmodal /> */}
    </Grid>
  )
}

export default Home
