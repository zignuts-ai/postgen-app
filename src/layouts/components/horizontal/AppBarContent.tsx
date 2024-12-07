// ** MUI Imports
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}
const AppBarContent = (props: Props) => {
  // ** Props
  const { settings, saveSettings } = props

  const { user } = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {user ? (
        <UserDropdown settings={settings} />
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
