// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import { useChat } from 'src/hooks/useChat'
import { Controller } from 'react-hook-form'
import { FormType } from 'src/types/chatContextType'

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps & { hasError: boolean }>(({ theme, hasError }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: hasError ? theme.palette.error.main : theme.palette.divider
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const SendMsgForm = () => {
  const { methods } = useChat()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = (data: FormType) => {
    console.log('Message Sent:', data.prompt)
    reset({ prompt: '' })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ChatFormWrapper hasError={!!errors?.prompt}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Controller
            name='prompt'
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                {...field}
                fullWidth
                size='small'
                placeholder='Type your message here…'
                sx={{
                  '& .MuiOutlinedInput-input': { pl: 0 },
                  '& fieldset': { border: '0 !important' },
                  '& .Mui-focused': { boxShadow: 'none !important' }
                }}
                rows={2}

                // error={!!errors?.prompt}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained'>
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  )
}

export default SendMsgForm
