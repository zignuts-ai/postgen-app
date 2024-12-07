import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Chip, FormControl, Grid, Typography } from '@mui/material'
import { platformTypes, toneTypes } from 'src/types/constantTypes'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PLATFORM_TYPE, TONE_TYPE } from 'src/constants/constant'
import UseBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'
import { Icon } from '@iconify/react'
import CustomTextField from 'src/components/common/form/CustomTextField'

const schema = yup.object().shape({
  platform_type: yup
    .mixed<platformTypes>()
    .oneOf(['instagram', 'linkedin'], 'Please Select platform')
    .required('Platform Type is required'),
  tone_types: yup
    .mixed<toneTypes>()
    .oneOf(
      [
        'Polite',
        'Witty',
        'Enthusiastic',
        'Friendly',
        'Informational',
        'Funny',
        'Formal',
        'Informal',
        'Humorous',
        'Serious',
        'Optimistic',
        'Motivating'
      ],
      'Please Select Tone'
    )
    .required('Tone is required'),
  prompt: yup.string().min(5, 'Prompt should be at least 5 characters').required('Prompt is required')
})

interface FormData {
  platform_type: platformTypes
  tone_types: toneTypes
  prompt: string
}

const defaultValues: FormData = {
  platform_type: 'linkedin',
  tone_types: 'Polite',
  prompt: ''
}

const DashboardView = () => {
  // ** Hooks
  const bgColors: UseBgColorType = UseBgColor()

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const platform_type = watch('platform_type')
  const tone_types = watch('tone_types')

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <Box sx={{ my: 10, mt: 15 }}>
        <Typography textAlign={'center'} variant='h5' fontWeight={600} color='white'>
          Generate social media posts in seconds for free
        </Typography>
        <Typography textAlign={'center'} variant='subtitle1' fontWeight={400}>
          Stay consistent, creative, and productive with SocialBee's free AI social media post generator.
        </Typography>
      </Box>
      <Card
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '& $arrowIcon': {
              transform: 'translateX(4px)'
            }
          },
          p: 5,
          px: 7
        }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 900,
              margin: 'auto'
            }}
          >
            <Grid container spacing={6}>
              {/* select platform starts */}
              <CardHeader sx={{ px: 0, pb: 3 }} title='Select your platform' />
              <Grid container spacing={6}>
                {PLATFORM_TYPE.map(ele => (
                  <Grid key={ele.value} item sm={6} xs={12}>
                    <Box
                      sx={{
                        py: 3,
                        px: 4,
                        borderRadius: 1,
                        cursor: 'pointer',
                        ...(platform_type === ele.value
                          ? { ...bgColors.primaryLight }
                          : { backgroundColor: 'action.hover' }),
                        border: theme =>
                          `1px solid ${
                            platform_type === ele.value ? theme.palette.primary.main : theme.palette.divider
                          }`
                      }}
                      onClick={() => setValue('platform_type', ele.value)}
                    >
                      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                        <Icon fontSize={23} icon={ele.icon} />
                        <Typography
                          variant='h6'
                          sx={{
                            ...(platform_type === ele.value ? { color: 'primary.main' } : {})
                          }}
                        >
                          {ele.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {/* select platform ends */}

              {/* Select Tone starts */}
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <CardHeader sx={{ px: 0, pb: 3 }} title='Tone of your post' />
                  <Box display='flex' gap={2} flexWrap='wrap'>
                    {TONE_TYPE.map(ele => (
                      <div key={ele.value}>
                        <Chip
                          onClick={() => setValue('tone_types', ele.value)}
                          label={ele.value}
                          variant={tone_types === ele.value ? 'filled' : 'outlined'}
                          color='primary'
                          sx={{
                            '.MuiChip-label': {
                              textTransform: 'none'
                            }
                          }}
                        />
                      </div>
                    ))}
                  </Box>
                </Grid>
              </Grid>
              {/* Select Tone ends */}

              {/* Add Prompt Starts */}
              <CardHeader sx={{ px: 0, pb: 3 }} title='Your prompt' />
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <CustomTextField
                      control={control}
                      name='prompt'
                      label='Prompt'
                      multiline
                      rows={5}
                      errors={errors?.prompt}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {/* Add Prompts ends */}

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button endIcon={<Icon icon='ri:quill-pen-ai-line' />} type='submit' variant='contained'>
                    Generate
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  )
}

export default DashboardView
