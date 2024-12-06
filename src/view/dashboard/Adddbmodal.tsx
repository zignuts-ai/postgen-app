import React from 'react'
import Typography from '@mui/material/Typography'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  IconButtonProps
} from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from 'src/components/common/form/CustomTextField'
import { Icon } from '@iconify/react'
import CustomDropdown from 'src/components/common/form/CustomDropDown'

// ** Styled close button
const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: '2.25rem',
  borderRadius: 8,
  right: '0.75rem',
  position: 'absolute',
  padding: theme.spacing(1.5),
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(-6),
  transition: 'all .23s ease .1s',
  transform: 'translate(23px, -25px)',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translate(20px, -20px)',
    backgroundColor: theme.palette.background.paper
  }
}))

const schema = yup.object().shape({
  connection_name: yup.string().required('Connection Name is required'),
  connection_method: yup.string().required('Connection Method is required'),
  host_name: yup.string().required('Host Name is required'),
  port: yup.string().matches(/^\d+$/, 'Port must be a valid number').required('Port is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  default_schema: yup.string().required('Default Schema is required')
})

interface FormData {
  connection_name: string
  connection_method: string
  host_name: string
  port: string
  username: string
  password: string
  default_schema: string
}

const defaultValues: FormData = {
  connection_name: '',
  connection_method: '',
  host_name: '',
  port: '',
  username: '',
  password: '',
  default_schema: ''
}

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddDBmodal = ({ isOpen, closeModal }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  console.log(watch())
  console.log(errors)

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Dialog PaperProps={{ sx: { overflow: 'visible' } }} open={isOpen} onClose={closeModal}>
      <DialogTitle>
        <Typography variant='h5' component='span'>
          Setup New Connection
        </Typography>
        <CustomCloseButton disableRipple>
          <Icon icon='material-symbols:close' />
        </CustomCloseButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5
            }}
          >
            <FormControl fullWidth>
              <CustomTextField
                control={control}
                label='Connection Name'
                name='connection_name'
                errors={errors?.connection_name}
              />
            </FormControl>
            <FormControl fullWidth>
              <CustomDropdown
                control={control}
                label='Connection Name'
                name='connection_name'
                error={errors?.connection_name}
                options={[{ name: 'Standard (TCP/IP)' }, { name: 'Second Option' }]}
              />
            </FormControl>
            <FormControl fullWidth>
              <CustomTextField
                control={control}
                label='Connection Name'
                name='connection_name'
                errors={errors?.connection_name}
              />
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <CustomTextField control={control} label='Host Name' name='host_name' errors={errors?.host_name} />
              </FormControl>
              <FormControl fullWidth>
                <CustomTextField control={control} label='Port' name='port' errors={errors?.port} />
              </FormControl>
            </Box>
            <FormControl fullWidth>
              <CustomTextField control={control} label='Username' name='username' errors={errors?.username} />
            </FormControl>
            <FormControl fullWidth>
              <CustomTextField control={control} label='Password' name='password' errors={errors?.password} />
            </FormControl>
            <FormControl fullWidth>
              <CustomTextField
                control={control}
                label='Default Schema'
                name='default_schema'
                errors={errors?.password}
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant='outlined'>Configure Server Management</Button>
              <Button variant='outlined'>Test Connection</Button>
              <Button onClick={closeModal} variant='outlined'>
                Cancel
              </Button>
              <Button variant='contained'>OK</Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDBmodal
