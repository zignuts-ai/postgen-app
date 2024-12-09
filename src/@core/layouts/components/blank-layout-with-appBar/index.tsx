// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'
import { Button } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import UserDropdown from '../shared-components/UserDropdown'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings } = useSettings()
  const { user } = useAuth()
  const { skin } = settings
  const pathname = usePathname()

  const isLandingPage = pathname === '/'

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={skin === 'bordered' ? 0 : 3}
      sx={{
        backgroundColor: 'background.paper',
        ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
      }}
    >
      <Toolbar
        sx={{
          justifyContent: { xs: 'center', sm: 'space-between' },
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          padding: { xs: `${theme.spacing(2, 6)} !important`, md: 0 },
          gap: 3
        }}
      >
        <LinkStyled href='/'>
          <img alt='Logo' src='/logo.png' className='h-[40px] w-[40px] object-contain' />
          <Typography
            variant='h5'
            sx={{
              ml: 2,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: '-0.45px',
              fontSize: '1.75rem !important'

              // textTransform: 'lowercase',
            }}
          >
            {themeConfig.templateName}
          </Typography>
        </LinkStyled>
        {user ? (
          <div className='flex gap-3 mx-4 items-center'>
            {isLandingPage && (
              <Link href='/history'>
                <Button size='small' variant='contained' startIcon={<Icon icon='material-symbols:history' />}>
                  History
                </Button>
              </Link>
            )}
            <UserDropdown settings={settings} />
          </div>
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
      </Toolbar>
    </AppBar>
  )
}

export default BlankLayoutAppBar
