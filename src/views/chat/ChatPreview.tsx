import React from 'react'
import { Box, Card, CardContent } from '@mui/material'
import InstagramPreview from './preview/InstagramPreview'
import { useChat } from 'src/hooks/useChat'

const ChatPreview = () => {
  const { previewData } = useChat()

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' height='100%' maxWidth={500} margin='auto'>
      <Card>
        <CardContent>
          {/* <XPreview
            metadata={{
              caption: 'Excited to share our latest project updates! #FeatureFriday',
              imageUrl: ['/images/testimonials/jessica-saunders.png']
            }}
          /> */}
          {/* <LinkedInPreview
            metadata={{
              caption:
                'React has become one of the most popular JavaScript libraries for building user interfaces. In this post ll share some tips and best practices Ive learned over the years.',
              imageUrl:
                'https://www.socialchamp.io/wp-content/uploads/2023/12/Content-Blog-Banner_Q4-2023_1125x600_30_What-to-Post-on-LinkedIn.png'
            }}
          /> */}
          {/* <RedditPreview
            metadata={{
              caption:
                'React has become one of the most popular JavaScript libraries for building user interfaces. In this post ll share some tips and best practices Ive learned over the years.',
              imageUrl:
                'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms/uploads/2023/11/007-90989375-reddit-redesign.jpg',
              title: 'Learning React: Best Practices and Tips'
            }}
          /> */}
          {/* <FacebookPreview
            metadata={{
              caption:
                'It’s better to be an initial noted version of yourself, rather than a second noted version of someone else. ',
              imageUrl:
                'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds'
            }}
          /> */}
          <InstagramPreview
            metadata={{
              caption: previewData?.caption ?? 'Please add a caption',
              imageUrl:
                previewData.imageUrl ??
                'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
              type: previewData.type ?? 'image'
            }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default ChatPreview
