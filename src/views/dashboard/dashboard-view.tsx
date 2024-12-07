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
  Typography
} from '@mui/material'
import { Icon } from '@iconify/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from 'src/components/common/form/CustomTextField'

// Define types
export type platformTypes = 'instagram' | 'linkedin'
export type toneTypes =
  | 'Polite'
  | 'Witty'
  | 'Enthusiastic'
  | 'Friendly'
  | 'Informational'
  | 'Funny'
  | 'Formal'
  | 'Informal'
  | 'Humorous'
  | 'Serious'
  | 'Optimistic'
  | 'Motivating'
export type postTypes = 'text' | 'image' | 'memes'

// Define constants
export const PLATFORM_TYPE = [
  {
    value: 'linkedin',
    name: 'LinkedIn',
    icon: 'mdi:linkedin'
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'mdi:instagram'
  }
]

export const TONE_TYPE = [
  { value: 'Polite' },
  { value: 'Witty' },
  { value: 'Enthusiastic' },
  { value: 'Friendly' },
  { value: 'Informational' },
  { value: 'Funny' },
  { value: 'Formal' },
  { value: 'Informal' },
  { value: 'Humorous' },
  { value: 'Serious' },
  { value: 'Optimistic' },
  { value: 'Motivating' }
]

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
  post_type: yup
    .mixed<postTypes>()
    .oneOf(['text', 'image', 'memes'], 'Please Select Post Type')
    .required('Post Type is required'),
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
const defaultValues: FormData = {
  platform_type: 'linkedin',
  tone_types: 'Polite',
  post_type: 'text',
  prompt: ''
}

const DashboardView = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<platformTypes>('linkedin')
  const [selectedTone, setSelectedTone] = useState<toneTypes>('Polite')
  const [selectedPostType, setSelectedPostType] = useState<postTypes>('text')

  // Anchor states for dropdowns
  const [platformAnchorEl, setPlatformAnchorEl] = useState<null | HTMLElement>(null)
  const [toneAnchorEl, setToneAnchorEl] = useState<null | HTMLElement>(null)
  const [postTypeAnchorEl, setPostTypeAnchorEl] = useState<null | HTMLElement>(null)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
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
    <Box sx={{ my: 10, mt: 15 }}>
      <Box sx={{ my: 10, mt: 10 }}>
        <Typography textAlign={'center'} variant='h5' fontWeight={700} color='white'>
          Generate social media posts in seconds for free
        </Typography>
        <Typography textAlign={'center'} variant='subtitle1' fontWeight={400} sx={{ mt: 1 }}>
          Stay consistent, creative, and productive with SocialBee's free AI social media post generator.
        </Typography>
      </Box>
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          p: 4,
          borderRadius: 3
        }}
      >
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={3}>
              {/* Prompt Input */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <CustomTextField
                    control={control}
                    name='prompt'
                    label='Write your post content here'
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
                      startIcon={<Icon icon={PLATFORM_TYPE.find(p => p.value === selectedPlatform)?.icon || ''} />}
                    >
                      {PLATFORM_TYPE.find(p => p.value === selectedPlatform)?.name}
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
                    <Button onClick={handleToneOpen} variant='outlined'>
                      {selectedTone}
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
                      onClick={handlePostTypeOpen}
                      variant='outlined'
                      startIcon={<Icon icon={POST_TYPE.find(p => p.value === selectedPostType)?.icon || ''} />}
                    >
                      {POST_TYPE.find(p => p.value === selectedPostType)?.name}
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
                    endIcon={<Icon icon='ri:quill-pen-ai-line' />}
                    type='submit'
                    variant='contained'
                    sx={{
                      borderRadius: 2,
                      padding: '10px 20px',
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'
                      }
                    }}
                  >
                    Generate
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
