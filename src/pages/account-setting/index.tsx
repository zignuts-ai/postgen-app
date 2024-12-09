import React, { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/components/common/form/CustomTextField'
import { useProfilePictureGenerator } from '../../views/account-setting/profilepicturegenerator'
import { useProfilePicture } from 'src/context/ProfilePictureContext'
import { useAuth } from 'src/hooks/useAuth'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const TabAccount = () => {
  const { imgSrc, setImgSrc } = useProfilePicture()
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { generateProfilePicture } = useProfilePictureGenerator()
  const { user } = useAuth()

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: { prompt: '' }
  })

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`)
  }

  const onSubmitAIGeneration = async (data: { prompt: string }) => {
    if (!data.prompt.trim()) {
      alert('Please provide a description for AI image generation')

      return
    }

    setIsLoading(true)
    try {
      const generatedImage = await generateProfilePicture(data.prompt)
      setImgSrc(generatedImage)
      reset()
    } catch (error) {
      console.error('Failed to generate profile picture', error)
      alert('Failed to generate profile picture')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Account Details' />
          <form onSubmit={handleSubmit(onSubmitAIGeneration)}>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 7 }}>
                    <Button size='medium' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        value={inputValue}
                        accept='image/png, image/jpeg'
                        onChange={handleInputImageChange}
                        id='account-settings-upload-image'
                      />
                    </Button>
                    <Button color='secondary' variant='outlined' onClick={handleInputImageReset}>
                      Remove
                    </Button>
                  </div>
                  <Typography sx={{ mt: 6, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div>
              </Box>
            </CardContent>
            <CardContent>
              <FormControl fullWidth>
                <CustomTextField
                  control={control}
                  name='prompt'
                  label='Regenerate your profile with AI'
                  multiline
                  rows={5}
                />
              </FormControl>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isLoading || !watch('prompt')}
                endIcon={
                  isLoading ? <Icon icon='line-md:loading-twotone-loop' /> : <Icon icon='ri:quill-pen-ai-line' />
                }
                sx={{
                  py: 1.5,
                  mt: 4,
                  color: 'white',
                  '&:disabled': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: 'primary.main'
                  }
                }}
              >
                {isLoading ? 'Generating...' : 'Re-Generate'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabAccount
