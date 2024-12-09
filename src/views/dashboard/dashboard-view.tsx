import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material'
import { Icon } from '@iconify/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from 'src/components/common/form/CustomTextField'
import themeConfig from 'src/configs/themeConfig'
import { platformTypes, toneTypes } from 'src/types/constantTypes'
import { PLATFORM_TYPE, TONE_TYPE } from 'src/constants/constant'
import { UUID } from 'src/utils/utils'
import { useChat } from 'src/hooks/useChat'
import useLoading from 'src/hooks/useLoading'

export type postTypes = 'text' | 'image' | 'memes'

export const POST_TYPE = [
  {
    value: 'text',
    name: 'Text Post',
    icon: 'ri:file-text-line'
  },
  {
    value: 'image',
    name: 'Image Post',
    icon: 'ri:image-line'
  },
  {
    value: 'memes',
    name: 'Memes',
    icon: 'ri:emotion-laugh-line'
  }
]

// Validation Schema
const schema = yup.object().shape({
  // platform_type: yup
  //   .mixed<platformTypes>()
  //   .oneOf(['instagram', 'linkedin'], 'Please Select platform')
  //   .required('Platform Type is required'),
  // tone_types: yup
  //   .mixed<toneTypes>()
  //   .oneOf(
  //     ['Informative', 'Educative', 'Humorous', 'Funny', 'Meme', 'Serious', 'Professional', 'Concerning', 'Exciting'],
  //     'Please Select Tone'
  //   )
  //   .required('Tone is required'),
  // post_type: yup
  //   .mixed<postTypes>()
  //   .oneOf(['text', 'image', 'memes'], 'Please Select Post Type')
  //   .required('Post Type is required'),
  prompt: yup.string().min(5, 'Prompt should be at least 5 characters').required('Prompt is required')
})

// Form Data Interface
interface FormData {
  platform_type: platformTypes
  tone_types: toneTypes
  post_type: postTypes
  prompt: string
}

// Default Values

const DashboardView = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<platformTypes | null>(null)
  const [selectedTone, setSelectedTone] = useState<toneTypes | null>(null)
  const [selectedPostType, setSelectedPostType] = useState<postTypes | null>(null)

  // Anchor states for dropdowns
  const [platformAnchorEl, setPlatformAnchorEl] = useState<null | HTMLElement>(null)
  const [toneAnchorEl, setToneAnchorEl] = useState<null | HTMLElement>(null)
  const [postTypeAnchorEl, setPostTypeAnchorEl] = useState<null | HTMLElement>(null)

  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    handleCraeteSessionChat: { mutate }
  } = useChat()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const sessionId = UUID()
    const payLoad = {
      platform: selectedPlatform,
      tone: selectedTone,
      postType: selectedPostType,
      prompt: data.prompt,
      sessionId
    }
    startLoading()
    await mutate(payLoad)
    stopLoading()
  }

  // Dropdown handlers
  const handlePlatformOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPlatformAnchorEl(event.currentTarget)
  }

  const handlePlatformClose = () => {
    setPlatformAnchorEl(null)
  }

  const handleToneOpen = (event: React.MouseEvent<HTMLElement>) => {
    setToneAnchorEl(event.currentTarget)
  }

  const handleToneClose = () => {
    setToneAnchorEl(null)
  }

  const handlePostTypeOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPostTypeAnchorEl(event.currentTarget)
  }

  const handlePostTypeClose = () => {
    setPostTypeAnchorEl(null)
  }

  return (
    <Box sx={{ my: 10, mt: 15, px: 2 }}>
      <Box sx={{ my: 10, mt: 10 }}>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-2 md:mb-6 drop-shadow-md'>
            Generate social media posts in seconds for free
          </h2>
          <p className='text-sm sm:text-lg text-muted-foreground mb-8'>
            Stay consistent, creative, and productive with {themeConfig.templateName}'s free AI social media post
            generator.
          </p>
        </div>
      </Box>
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          p: 4,
          borderRadius: 3
        }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit as any)}>
          <CardContent>
            <Grid container spacing={3}>
              {/* Prompt Input */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <CustomTextField
                    control={control}
                    name='prompt'
                    label='Write your prompt here'
                    multiline
                    rows={5}
                    errors={errors?.prompt}
                  />
                </FormControl>
              </Grid>

              {/* Selection Row */}
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {/* Platform Selection */}
                  <Grid item>
                    <Button
                      onClick={handlePlatformOpen}
                      variant='outlined'
                      size='small'
                      startIcon={<Icon icon={PLATFORM_TYPE.find(p => p.value === selectedPlatform)?.icon || ''} />}
                    >
                      {PLATFORM_TYPE.find(p => p.value === selectedPlatform)?.name ?? 'Platform'}
                    </Button>
                    <Menu anchorEl={platformAnchorEl} open={Boolean(platformAnchorEl)} onClose={handlePlatformClose}>
                      {PLATFORM_TYPE.map(platform => (
                        <MenuItem
                          key={platform.value}
                          onClick={() => {
                            setSelectedPlatform(platform.value as any)
                            handlePlatformClose()
                          }}
                        >
                          <ListItemIcon>
                            <Icon icon={platform.icon} />
                          </ListItemIcon>
                          <ListItemText primary={platform.name} />
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>

                  {/* Tone Selection */}
                  <Grid item>
                    <Button size='small' onClick={handleToneOpen} variant='outlined'>
                      {selectedTone ? selectedTone : 'TONE'}
                    </Button>
                    <Menu anchorEl={toneAnchorEl} open={Boolean(toneAnchorEl)} onClose={handleToneClose}>
                      {TONE_TYPE.map(tone => (
                        <MenuItem
                          key={tone.value}
                          onClick={() => {
                            setSelectedTone(tone.value as any)
                            handleToneClose()
                          }}
                        >
                          <ListItemText primary={tone.value} />
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>

                  {/* Post Type Selection */}
                  <Grid item>
                    <Button
                      size='small'
                      onClick={handlePostTypeOpen}
                      variant='outlined'
                      startIcon={<Icon icon={POST_TYPE.find(p => p.value === selectedPostType)?.icon || ''} />}
                    >
                      {POST_TYPE.find(p => p.value === selectedPostType)?.name
                        ? POST_TYPE.find(p => p.value === selectedPostType)?.name
                        : 'POST TYPE'}
                    </Button>
                    <Menu anchorEl={postTypeAnchorEl} open={Boolean(postTypeAnchorEl)} onClose={handlePostTypeClose}>
                      {POST_TYPE.map(postType => (
                        <MenuItem
                          key={postType.value}
                          onClick={() => {
                            setSelectedPostType(postType.value as any)
                            handlePostTypeClose()
                          }}
                        >
                          <ListItemIcon>
                            <Icon icon={postType.icon} />
                          </ListItemIcon>
                          <ListItemText primary={postType.name} />
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    endIcon={isLoading ? <CircularProgress size={20} /> : <Icon icon='ri:quill-pen-ai-line' />}
                    type='submit'
                    variant='contained'
                    sx={{
                      borderRadius: 1,
                      padding: '5px 10px',
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'
                      }
                    }}
                  >
                    {isLoading ? 'generating...' : 'Generate'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Box>
  )
}

export default DashboardView
