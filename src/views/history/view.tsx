import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Fade, Container } from '@mui/material'
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

  const hasData = Object.keys(groupedData).length > 0

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          backgroundColor: 'background.default',
          minHeight: '100vh'
        }}
      >
        {hasData ? (
          <Fade in={true} timeout={500}>
            <Box>
              {Object.entries(groupedData).map(([date, memes]) => (
                <Box
                  key={date}
                  sx={{
                    marginBottom: 6,
                    padding: 2,
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: 3
                  }}
                >
                  <Typography
                    fontWeight={700}
                    variant='h4'
                    color='text.primary'
                    sx={{
                      marginBottom: 3,
                      paddingBottom: 1
                    }}
                  >
                    {date}
                  </Typography>
                  <Grid
                    container
                    spacing={4}
                    sx={{
                      justifyContent: { xs: 'center', md: 'flex-start' }
                    }}
                  >
                    {memes.map(meme => (
                      <Grid
                        item
                        key={meme.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Fade in={true} timeout={750}>
                          <Box sx={{ width: '100%', maxWidth: 300 }}>
                            <PostCard {...meme} />
                          </Box>
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          </Fade>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70vh'
            }}
          >
            <Card
              sx={{
                maxWidth: 400,
                textAlign: 'center',
                padding: 4,
                backgroundColor: 'background.paper',
                boxShadow: 4,
                borderRadius: 3
              }}
            >
              <CardContent>
                <Typography variant='h4' color='text.primary' gutterBottom sx={{ fontWeight: 700 }}>
                  No History Found
                </Typography>
                <Typography variant='subtitle1' color='text.secondary' sx={{ mt: 2 }}>
                  Start creating chats to populate your history
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default HistoryView
