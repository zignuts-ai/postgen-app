// ** MUI Imports
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const { user } = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='bx:menu' />
          </IconButton>
        ) : null}

        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      {user ? (
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          <UserDropdown settings={settings} />
        </Box>
      ) : (
        <div className='flex gap-3 mx-4'>
          <Link href='/login'>
            <Button variant='contained'>Login</Button>
          </Link>
          <Link href='/register'>
            <Button variant='outlined'>Register</Button>
          </Link>
        </div>
      )}
    </Box>
  )
}

export default AppBarContent
