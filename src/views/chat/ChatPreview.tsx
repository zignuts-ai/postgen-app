import React from 'react'
import { Box, Card, CardContent } from '@mui/material'
import FacebookPreview from './FacebookPreview'

const ChatPreview = () => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column' height='100%'>
      <Card>
        <CardContent>
          <FacebookPreview
            metadata={{
              caption:
                'It’s better to be an initial noted version of yourself, rather than a second noted version of someone else. ',
              imageUrl:
                'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds'
            }}
          />
          {/* <InstagramPreview
            metadata={{
              caption: 'Responsive clone of Instagram UI. Made with ❤ for study purposes.',
              imageUrl:
                'https://plus.unsplash.com/premium_photo-1688645554172-d3aef5f837ce?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwbW91bnRhaW5zfGVufDB8fDB8fHww'
            }}
          /> */}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ChatPreview
