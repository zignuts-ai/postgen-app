import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import PostCard from '../../views/history/PostCard'
import { Content } from 'src/types/contentTypes'

const Home = () => {
  const dataSample: Content[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/600x400.png?text=Cat+Meme',
      title: 'Hilarious Cat Meme',
      description: 'When your cat decides to judge your life choices',
      platform: 'Instagram',
      type: 'image',
      aiGenerated: true,
      createdAt: 1733576257
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false,
      createdAt: 1733576257
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false,
      createdAt: 1733057857
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false,
      createdAt: 1733057857
    },
    {
      id: 5,
      image: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Funny Dance Meme',
      description: 'Epic dance moves that broke the internet',
      platform: 'TikTok',
      type: 'video',
      aiGenerated: false,
      createdAt: 1733057857
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/600x400.png?text=Work+Meme',
      title: 'Work Struggles',
      description: 'When Monday hits you like a truck',
      platform: 'Facebook',
      type: 'image',
      aiGenerated: true,
      createdAt: 1733057857
    },
    {
      id: 7,
      image: 'https://www.w3schools.com/html/movie.mp4',
      title: 'Epic Fail Meme',
      description: 'Moments that left us speechless',
      platform: 'YouTube',
      type: 'video',
      aiGenerated: true,
      createdAt: 1733057857
    }
  ]

  const groupedData = dataSample
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt) // Sort by latest
    .reduce((acc: Record<string, Content[]>, meme) => {
      const date = new Date(meme.createdAt * 1000).toDateString() // Convert timestamp to date string
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(meme)

      return acc
    }, {})

  return (
    <Box sx={{ padding: 4, mx: 'auto' }}>
      {Object.entries(groupedData).map(([date, memes]) => (
        <Box key={date} sx={{ marginBottom: 4 }}>
          <Typography fontWeight={600} variant='h5' gutterBottom>
            {date}
          </Typography>
          <Grid container spacing={3}>
            {memes.map(meme => (
              <Grid item xs={12} sm={6} md={4} key={meme.id}>
                <PostCard {...meme} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default Home
