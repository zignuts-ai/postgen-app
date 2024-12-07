import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, IconButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import UseBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'
import { PLATFORM_TYPE } from 'src/constants/constant'
import { platformTypes } from 'src/types/constantTypes'

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
  platform_type: yup
    .mixed<platformTypes>()
    .oneOf(['instagram', 'linkedin'], 'Please select platform')
    .required('Platform type is required')
})

interface FormData {
  platform_type: platformTypes
}

const defaultValues: FormData = {
  platform_type: 'linkedin'
}

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddPostModal = ({ isOpen, closeModal }: Props) => {
  // ** Hooks
  const bgColors: UseBgColorType = UseBgColor()

  const { handleSubmit, setValue, getValues } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      disableEscapeKeyDown
      PaperProps={{ sx: { overflow: 'visible' } }}
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          closeModal()
        }
      }}
    >
      <DialogTitle>
        <Typography variant='h5' component='span'>
          Create Post
        </Typography>
        <CustomCloseButton onClick={closeModal} disableRipple>
          <Icon icon='material-symbols:close' />
        </CustomCloseButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            {PLATFORM_TYPE.map(ele => (
              <Grid key={ele.value} item sm={6} xs={12}>
                <Box
                  sx={{
                    py: 3,
                    px: 4,
                    borderRadius: 1,
                    cursor: 'pointer',
                    ...(getValues('platform_type') === ele.value
                      ? { ...bgColors.primaryLight }
                      : { backgroundColor: 'action.hover' }),
                    border: theme =>
                      `1px solid ${
                        getValues('platform_type') === ele.value ? theme.palette.primary.main : theme.palette.divider
                      }`
                  }}
                  onClick={() => setValue('platform_type', ele.value)}
                >
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                    <Icon fontSize={23} icon={ele.icon} />
                    <Typography
                      variant='h6'
                      sx={{
                        ...(getValues('platform_type') === ele.value ? { color: 'primary.main' } : {})
                      }}
                    >
                      {ele.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={closeModal} variant='outlined'>
                  Cancel
                </Button>
                <Button variant='contained'>Create</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostModal
