import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, CardContent, Fade, Container } from '@mui/material'
import PostCard from '../../views/history/PostCard'
import { useAuth } from 'src/hooks/useAuth'
import { GuestHistoryType, HistoryType } from 'src/types/chatContextType'
import { CHAT } from 'src/queries/query-keys'
import { useQuery } from '@tanstack/react-query'
import { getAllChats } from 'src/queries/chat'
import BeatLoader from 'react-spinners/BeatLoader'
import { LOCAL_CHAT_SESSION_KEY } from 'src/constants/constant'

const HistoryView = () => {
  const [groupedData, setGroupedData] = React.useState<Record<string, HistoryType[]>>({})
  const { user } = useAuth()
  const [guestHistory, setGuestHistory] = useState<GuestHistoryType[]>([])

  const allUserChatsQuery = useQuery({
    queryKey: [CHAT.ALL_USER_CHATS],
    queryFn: getAllChats,
    enabled: !!user
  })

  const formatData = (data: any) =>
    data
      .slice()
      .sort((a: any, b: any) => b.createdAt - a.createdAt)
      .reduce((acc: Record<string, HistoryType[]>, post: any) => {
        const date = new Date(post.createdAt * 1000).toDateString()
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(post)

        return acc
      }, {})

  const hasData = Object.keys(groupedData).length > 0

  useEffect(() => {
    if (user) {
      setGroupedData(formatData(allUserChatsQuery.data?.data ?? []))
    } else {
      setGroupedData(formatData(guestHistory))
    }
    // eslint-disable-next-line
  }, [user, allUserChatsQuery.data?.data, guestHistory])

  useEffect(() => {
    if (!user) {
      const storedHistory = localStorage.getItem(LOCAL_CHAT_SESSION_KEY)
      if (storedHistory) {
        try {
          const parsedHistory = JSON.parse(storedHistory)
          setGuestHistory(parsedHistory)
        } catch (error) {
          console.error('Error parsing guest history', error)
          localStorage.removeItem(LOCAL_CHAT_SESSION_KEY)
        }
      }
    }
  }, [user])

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          backgroundColor: 'background.default'
        }}
      >
        {allUserChatsQuery?.isFetching ? (
          <div className='flex flex-col items-center justify-center w-full min-h-[50vh]'>
            <div className='flex items-center space-x-4'>
              <BeatLoader color='#7a88ee' size={15} />
            </div>
            <p className='mt-4 text-sm text-gray-500'>Please wait while we process your request...</p>
          </div>
        ) : hasData ? (
          <Fade in={true} timeout={500}>
            <Box>
              {Object.entries(groupedData).map(([date, memes]) => (
                <Box
                  key={date}
                  sx={{
                    marginBottom: 6,
                    padding: 2,
                    paddingBottom: 4,
                    paddingInline: 6,
                    borderRadius: 3,
                    backgroundColor: '#41424f',
                    boxShadow: 3
                  }}
                >
                  <Typography
                    fontWeight={700}
                    variant='h6'
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
