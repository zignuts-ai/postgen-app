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
    // handleCraeteSessionChat: { mutate }
    handleUpdateChat: { mutate }
  } = useChat()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
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
            AI Social Media Post Generator
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ p: 3 }}>
            {/* Selection Row */}
            <Grid container spacing={2}>
              {/* Prompt Input */}
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

              {/* Platform Selection */}
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  onClick={handlePlatformOpen}
                  startIcon={
                    <Icon icon={PLATFORM_TYPE.find(p => p.value === selectedPlatform)?.icon || 'ri:smartphone-line'} />
                  }
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
              <Grid item xs={4}>
                <Button fullWidth variant='outlined' onClick={handleToneOpen}>
                  {selectedTone ?? 'Tone'}
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
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant='outlined'
                  onClick={handlePostTypeOpen}
                  startIcon={
                    <Icon icon={POST_TYPE.find(p => p.value === selectedPostType)?.icon || 'ri:file-text-line'} />
                  }
                >
                  {POST_TYPE.find(p => p.value === selectedPostType)?.name ?? 'Post Type'}
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

            {/* Submit Button */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={isLoading}
              endIcon={
                isLoading ? <CircularProgress size={20} color='inherit' /> : <Icon icon='ri:quill-pen-ai-line' />
              }
              sx={{
                py: 1.5,
                background: 'linear-gradient(45deg, #9333ea 30%, #ec4899 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7e22ce 30%, #db2777 90%)'
                },
                mt: 4
              }}
            >
              {isLoading ? 'Generating...' : 'Generate Post'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </Box>
  )
}

export default DashboardView
