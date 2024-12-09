import React, { useEffect, useMemo } from 'react'
import { Box, Card, CardContent, DialogTitle, Typography, useMediaQuery } from '@mui/material'
import InstagramPreview from './preview/InstagramPreview'
import { useChat } from 'src/hooks/useChat'
import { ChatMessage } from 'src/types/chatContextType'
import XPreview from './preview/XPreview'
import RedditPreview from './preview/RedditPreview'
import LinkedInPreview from './preview/LinkedInPreview'
import FacebookPreview from './preview/FacebookPreview'
import { formatMessage } from 'src/utils/utils'

const ChatPreview = () => {
  const { previewData, chatDetails, setPreviewData } = useChat()

  const isDownMd = useMediaQuery('(min-width:1200px)')

  const platformType: 'instagram' | 'linkedin' | 'x' | 'facebook' | 'reddit' | 'text' | '' = useMemo(() => {
    const validData = validType(chatDetails?.data.messages ?? [])
    const platform = validData?.item?.metadata?.platform
    if (['instagram', 'linkedin', 'x', 'facebook', 'reddit'].includes(platform?.toLowerCase())) {
      return platform?.toLowerCase()
    }

    return 'text'
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
          caption:
            validData?.item?.metadata?.userPrompt?.length > 150
              ? validData?.item?.metadata?.userPrompt?.slice(0, 150) + '...'
              : validData?.item?.metadata?.userPrompt ?? '',
          imageUrl:
            validData?.item?.message ??
            'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
          title:
            validData?.item?.metadata?.userPrompt?.length > 150
              ? validData?.item?.metadata?.userPrompt?.slice(0, 150) + '...'
              : validData?.item?.metadata?.userPrompt ?? '',
          type: 'image'
        })
      } else if (validData.type === 'text') {
        setPreviewData({
          caption:
            validData?.item?.metadata?.userPrompt?.length > 150
              ? validData?.item?.metadata?.userPrompt?.slice(0, 150) + '...'
              : validData?.item?.metadata?.userPrompt ?? '',
          imageUrl:
            validData?.item?.message ??
            'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
          title:
            validData?.item?.metadata?.userPrompt?.length > 150
              ? validData?.item?.metadata?.userPrompt?.slice(0, 150) + '...'
              : validData?.item?.metadata?.userPrompt ?? '',
          type: 'text'
        })
      }
    } else {
      setPreviewData({
        caption: 'An sample caption would be here',
        imageUrl:
          'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
        title: 'This is an sample title of the post',
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
          {platformType === 'text' && (
            <Box
              sx={{
                p: 2,
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                backgroundColor: 'background.paper'
              }}
            >
              <Typography variant='body1' color={'text.primary'}>
                {formatMessage(previewData?.caption)?.length > 130
                  ? formatMessage(previewData?.caption)?.slice(0, 130) + '...'
                  : formatMessage(previewData?.caption) || 'Name not found'}
              </Typography>
            </Box>
          )}
          {platformType === 'x' && (
            <XPreview
              metadata={{
                caption: previewData?.caption ?? 'Excited to share our latest project updates! #FeatureFriday',
                imageUrl: previewData.imageUrl ?? '/images/testimonials/jessica-saunders.png',
                type: previewData.type ?? 'image'
              }}
            />
          )}
          {platformType === 'linkedin' && (
            <LinkedInPreview
              metadata={{
                caption: previewData?.caption ?? 'An sample caption would be here',
                imageUrl:
                  previewData.imageUrl ??
                  'https://www.socialchamp.io/wp-content/uploads/2023/12/Content-Blog-Banner_Q4-2023_1125x600_30_What-to-Post-on-LinkedIn.png',
                type: previewData.type ?? 'image'
              }}
            />
          )}
          {platformType === 'reddit' && (
            <RedditPreview
              metadata={{
                caption: previewData?.caption ?? 'An sample caption would be here',
                imageUrl:
                  previewData.imageUrl ??
                  'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms/uploads/2023/11/007-90989375-reddit-redesign.jpg',
                title: 'Learning React: Best Practices and Tips',
                type: previewData.type ?? 'image'
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
                  'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds',
                type: previewData.type ?? 'image'
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
