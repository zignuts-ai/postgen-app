// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import SyncLoader from 'react-spinners/SyncLoader'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <img alt='Logo' src='/logo.png' className='h-[80px] w-[80px]' />
      <SyncLoader color='#7a88ee' className='my-5' />
    </Box>
  )
}

export default FallbackSpinner
