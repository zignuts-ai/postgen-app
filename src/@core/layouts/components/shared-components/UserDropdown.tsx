// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { ACCESS_TOKEN_KEY } from 'src/constants/constant'
import { useProfilePicture } from 'src/context/ProfilePictureContext'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()
  const { mutate } = logout!

  // ** Vars
  const { direction } = settings

  const { imgSrc } = useProfilePicture()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    await mutate(token)
    handleDropdownClose()
  }

  const handleuserSeeting = () => {
    router.push('/account-setting')
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='John Doe' src={imgSrc} onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 2, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src={imgSrc} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box
  sx={{
   ml:5

  }}
>
            <Typography sx={{ fontWeight: 500, textAlign: 'center' }}>
  {user?.name ?? 'John Doe'}
</Typography>
              {/* <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {user?.role ?? 'Admin'}
              </Typography> */}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem
          onClick={handleuserSeeting}
          sx={{
            py: 2,
            px: 4,
            color: 'text.secondary',
            '& svg': { mr: 2, fontSize: '1.25rem', color: 'text.secondary' }
          }}
        >
          <Icon icon='bx:cog' />
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            px: 4,
            color: 'text.secondary',
            '& svg': { mr: 2, fontSize: '1.25rem', color: 'text.secondary' }
          }}
        >
          <Icon icon='bx:power-off' />
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
