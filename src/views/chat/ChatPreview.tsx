import React, { useEffect, useMemo } from 'react'
import { Box, Card, CardContent, DialogTitle, useMediaQuery } from '@mui/material'
import InstagramPreview from './preview/InstagramPreview'
import { useChat } from 'src/hooks/useChat'
import { ChatMessage } from 'src/types/chatContextType'
import XPreview from './preview/XPreview'
import RedditPreview from './preview/RedditPreview'
import LinkedInPreview from './preview/LinkedInPreview'
import FacebookPreview from './preview/FacebookPreview'

const ChatPreview = () => {
  const { previewData, chatDetails, setPreviewData } = useChat()

  const isDownMd = useMediaQuery('(min-width:1200px)')

  const platformType: 'instagram' | 'linkedin' | 'x' | 'facebook' | 'reddit' | '' = useMemo(() => {
    return 'reddit'
    const validData = validType(chatDetails?.data.messages ?? [])
    const platform = validData?.item?.metadata?.platform
    if (['instagram', 'linkedin', 'x', 'facebook', 'reddit'].includes(platform)) {
      return platform
    }

    return 'instagram'
  }, [chatDetails?.data?.messages])

  function validType(data: ChatMessage[]) {
    if (!Array.isArray(data)) {
      throw new Error('Input must be an array')
    }

    const reversedData = [...data].reverse()
    const lastValidType = reversedData.find(item => typeof item.type === 'string' && item.type) || null

    return {
      type: lastValidType ? lastValidType.type : null,
      item: lastValidType
    }
  }

  useEffect(() => {
    const validData = validType(chatDetails?.data?.messages ?? [])
    if (validData.type) {
      if (validData.type === 'image') {
        setPreviewData({
          caption: '',
          imageUrl:
            validData?.item?.message ??
            'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
          title: '',
          type: 'image'
        })
      }
    } else {
      setPreviewData({
        caption: '',
        imageUrl:
          'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
        title: '',
        type: 'image'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDetails])

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' height='100%' maxWidth={500} margin='auto'>
      <Card>
        {isDownMd && <DialogTitle id='alert-dialog-slide-title'>Social Preview</DialogTitle>}
        <CardContent sx={{ pt: 0 }}>
          {platformType === 'x' && (
            <XPreview
              metadata={{
                caption: previewData?.caption ?? 'Excited to share our latest project updates! #FeatureFriday',
                imageUrl: [previewData.imageUrl] ?? ['/images/testimonials/jessica-saunders.png']
              }}
            />
          )}
          {platformType === 'linkedin' && (
            <LinkedInPreview
              metadata={{
                caption:
                  previewData?.caption ??
                  'React has become one of the most popular JavaScript libraries for building user interfaces. In this post ll share some tips and best practices Ive learned over the years.',
                imageUrl:
                  previewData.imageUrl ??
                  'https://www.socialchamp.io/wp-content/uploads/2023/12/Content-Blog-Banner_Q4-2023_1125x600_30_What-to-Post-on-LinkedIn.png'
              }}
            />
          )}
          {platformType === 'reddit' && (
            <RedditPreview
              metadata={{
                caption:
                  previewData?.caption ??
                  'React has become one of the most popular JavaScript libraries for building user interfaces. In this post ll share some tips and best practices Ive learned over the years.',
                imageUrl:
                  previewData.imageUrl ??
                  'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms/uploads/2023/11/007-90989375-reddit-redesign.jpg',
                title: 'Learning React: Best Practices and Tips'
              }}
            />
          )}
          {platformType === 'facebook' && (
            <FacebookPreview
              metadata={{
                caption:
                  previewData?.caption ??
                  'Its better to be an initial noted version of yourself, rather than a second noted version of someone else. ',
                imageUrl:
                  previewData.imageUrl ??
                  'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds'
              }}
            />
          )}
          {platformType === 'instagram' && (
            <InstagramPreview
              metadata={{
                caption: previewData?.caption ?? 'Please add a caption',
                imageUrl:
                  previewData.imageUrl ??
                  'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
                type: previewData.type ?? 'image'
              }}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ChatPreview
