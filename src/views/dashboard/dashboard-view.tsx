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
import { LOCAL_CHAT_SESSION_KEY, PLATFORM_TYPE, TONE_TYPE } from 'src/constants/constant'
import { UUID } from 'src/utils/utils'
import { useRouter } from 'next/router'
import { updateCurrentChat } from 'src/queries/chat'
import { useAuth } from 'src/hooks/useAuth'
import useLoading from 'src/hooks/useLoading'
import { toast } from 'react-hot-toast'

// Updated type to include 'none'
export type postTypes = 'text' | 'image' | 'memes' | 'video' | 'none'
export type platformTypesExtended = platformTypes | 'none'
export type toneTypesExtended = toneTypes | 'none'

// Update POST_TYPE to include 'none'
export const POST_TYPE = [
  {
    value: 'text',
    name: 'Text Post',
    icon: 'ri:file-text-line'
  },
  {
    value: 'image',
    name: 'Post with Image',
    icon: 'ri:image-line'
  },
  {
    value: 'video',
    name: 'Post with Video',
    icon: 'ri:video-line'
  },
  {
    value: 'memes',
    name: 'Meme',
    icon: 'ri:emotion-laugh-line'
  },
  {
    value: 'none',
    name: 'None',
    icon: 'ri:delete-bin-line'
  }
]

// Validation Schema (commented out for flexibility)
const schema = yup.object().shape({
  prompt: yup.string().min(5, 'Prompt should be at least 5 characters').required('Prompt is required')
})

// Updated Form Data Interface
interface FormData {
  platform_type: platformTypesExtended
  tone_types: toneTypesExtended
  post_type: postTypes
  prompt: string
}

const DashboardView = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<platformTypesExtended | null>(null)
  const [selectedTone, setSelectedTone] = useState<toneTypesExtended | null>(null)
  const [selectedPostType, setSelectedPostType] = useState<postTypes | null>(null)
  const [platformAnchorEl, setPlatformAnchorEl] = useState<null | HTMLElement>(null)
  const [toneAnchorEl, setToneAnchorEl] = useState<null | HTMLElement>(null)
  const [postTypeAnchorEl, setPostTypeAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const { user } = useAuth()
  const { isLoading, startLoading, stopLoading } = useLoading()
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

    try {
      startLoading()
      const res = await updateCurrentChat({ sessionId, prompt: data.prompt }, user)
      stopLoading()

      if (!user) {
        const guestHistory = JSON.parse(localStorage.getItem(LOCAL_CHAT_SESSION_KEY) || '[]')
        guestHistory.push({
          sessionId: sessionId,
          name: res?.data?.name,
          createdAt: res?.data?.createdAt
        })
        localStorage.setItem(LOCAL_CHAT_SESSION_KEY, JSON.stringify(guestHistory))
      }
      router.push(`/chat/${sessionId}`)
    } catch (error: any) {
      toast.error(error?.message || 'Failed to Generate Content')
      console.error('Error generating content:', error)
      stopLoading()
    }
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

  // Modified platform selection to handle 'none'
  const handlePlatformSelection = (platform: platformTypesExtended) => {
    if (platform === 'none') {
      setSelectedPlatform(null)
    } else {
      setSelectedPlatform(platform)
    }
    handlePlatformClose()
  }

  // Modified tone selection to handle 'none'
  const handleToneSelection = (tone: toneTypesExtended) => {
    if (tone === 'none') {
      setSelectedTone(null)
    } else {
      setSelectedTone(tone)
    }
    handleToneClose()
  }

  // Modified post type selection to handle 'none'
  const handlePostTypeSelection = (postType: postTypes) => {
    if (postType === 'none') {
      setSelectedPostType(null)
    } else {
      setSelectedPostType(postType)
    }
    handlePostTypeClose()
  }

  // Add 'None' option to platform types
  const PLATFORM_TYPE_WITH_NONE = [
    ...PLATFORM_TYPE,
    {
      value: 'none',
      name: 'None',
      icon: 'ri:delete-bin-line'
    }
  ]

  // Add 'None' option to tone types
  const TONE_TYPE_WITH_NONE = [
    ...TONE_TYPE,
    {
      value: 'none',
      name: 'None'
    }
  ]

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
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  size='small'
                  fullWidth
                  variant='outlined'
                  onClick={handlePlatformOpen}
                  startIcon={
                    <Icon
                      icon={
                        PLATFORM_TYPE_WITH_NONE.find(p => p.value === selectedPlatform)?.icon || 'ri:smartphone-line'
                      }
                    />
                  }
                >
                  {PLATFORM_TYPE_WITH_NONE.find(p => p.value === selectedPlatform)?.name ?? 'Platform'}
                </Button>
                <Menu anchorEl={platformAnchorEl} open={Boolean(platformAnchorEl)} onClose={handlePlatformClose}>
                  {PLATFORM_TYPE_WITH_NONE.map(platform => (
                    <MenuItem
                      key={platform.value}
                      onClick={() => handlePlatformSelection(platform.value as platformTypesExtended)}
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
              <Grid item xs={12} sm={6} md={4}>
                <Button size='small' fullWidth variant='outlined' onClick={handleToneOpen}>
                  {selectedTone ?? 'Tone'}
                </Button>
                <Menu anchorEl={toneAnchorEl} open={Boolean(toneAnchorEl)} onClose={handleToneClose}>
                  {TONE_TYPE_WITH_NONE.map(tone => (
                    <MenuItem key={tone.value} onClick={() => handleToneSelection(tone.value as toneTypesExtended)}>
                      <ListItemText primary={tone.value} />
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>

              {/* Post Type Selection */}
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  size='small'
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
                    <MenuItem key={postType.value} onClick={() => handlePostTypeSelection(postType.value as postTypes)}>
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
