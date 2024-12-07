// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationWrapper from 'src/views/pages/auth/AuthIllustrationWrapper'
import CustomTextField from 'src/components/common/form/CustomTextField'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required')
})

const defaultValues = {
  name: '',
  orgName: '',
  email: '',
  password: ''
}

interface FormData {
  email: string
  password: string
  name: string
  orgName: string
}

const Register = () => {
  // ** Hook
  const theme = useTheme()

  const { register } = useAuth()
  const { mutate }: any = register!

  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    await mutate(data)
  }

  return (
    <Box className='content-center'>
      <AuthIllustrationWrapper>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(8, 8, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h5'
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.45px',
                  fontSize: '1.75rem !important'
                }}
              >
                Register
              </Typography>
            </Box>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>Create AI Powerd Dashboards 🚀</Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <CustomTextField control={control} label='Name' name='name' errors={errors?.name} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <CustomTextField control={control} label='Email' name='email' errors={errors?.email} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 5 }}>
                <CustomTextField
                  control={control}
                  label='Password'
                  name='password'
                  type='password'
                  errors={errors?.password}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox checked={isTermsChecked} onChange={e => setIsTermsChecked(e.target.checked)} />}
                sx={{
                  mb: 4,
                  mt: 1.5,
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: 'text.secondary' }
                }}
                label={
                  <>
                    <span>I agree to </span>
                    <LinkStyled href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Sign in instead</LinkStyled>
                </Typography>
              </Box>
              {/* <Divider sx={{ my: `${theme.spacing(6)} !important` }}>or</Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='bxl:facebook-circle' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='bxl:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme.palette.mode === 'light' ? '#272727' : 'grey.300' }}
                >
                  <Icon icon='bxl:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='bxl:google' />
                </IconButton>
              </Box> */}
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
