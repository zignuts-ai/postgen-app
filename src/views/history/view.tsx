import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import PostCard from '../../views/history/PostCard'
import { Content } from 'src/types/contentTypes'
import { dataSample } from 'src/constants/fakeData'

const HistoryView = () => {
  const groupedData = dataSample
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .reduce((acc: Record<string, Content[]>, meme) => {
      const date = new Date(meme.createdAt * 1000).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(meme)

      return acc
    }, {})

  return (
    <Box sx={{ padding: 4, mx: 'auto' }}>
      {Object.entries(groupedData).map(([date, memes]) => (
        <Box key={date} sx={{ marginBottom: 5 }}>
          <Typography fontWeight={600} variant='h5' gutterBottom>
            {date}
          </Typography>
          <Grid container spacing={3}>
            {memes.map(meme => (
              <Grid item xs={12} sm={6} md={3} key={meme.id}>
                <PostCard {...meme} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default HistoryView
