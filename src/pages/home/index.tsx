// import React from 'react'
// import { Grid, Box } from '@mui/material'
// import MemeCard from './components/MemeImageCard'

// const Home = () => {
//   const memeSamples = [
//     {
//       id: 1,
//       image: '/images/testimonials/jessica-saunders.png',
//       title: 'Hilarious Cat Meme',
//       description: 'When your cat decides to judge your life choices',
//       platform: 'Instagram',
//       type: 'image',
//       aiGenerated: true
//     },
//     {
//       id: 2,
//       image: 'https://www.w3schools.com/html/mov_bbb.mp4',
//       title: 'Funny Dance Meme',
//       description: 'Epic dance moves that broke the internet',
//       platform: 'TikTok',
//       type: 'video',
//       aiGenerated: false
//     },
//     {
//       id: 3,
//       image: '/images/testimonials/jessica-saunders.png',
//       title: 'Another Cat Meme',
//       description: 'Cats being cats!',
//       platform: 'Facebook',
//       type: 'image',
//       aiGenerated: true
//     }
//   ]

//   return (
//     <Grid container spacing={4} sx={{ padding: 3 }}>
//       {memeSamples.map(meme => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={meme.id}>
//           <MemeCard {...meme} />
//         </Grid>
//       ))}
//     </Grid>
//   )
// }

// export default Home

import React, { useState } from 'react'
import { Grid, Box, Typography, Modal } from '@mui/material'
import MemeCard from './components/MemeImageCard'

const Home = () => {
  const [selectedMeme, setSelectedMeme] = useState(null)

  const memeSamples = [
    {
      id: 1,
      image: 'https://via.placeholder.com/600x400.png?text=Cat+Meme',
      title: 'Hilarious Cat Meme',
      description: 'When your cat decides to judge your life choices',
      platform: 'Instagram',
      type: 'image',
      aiGenerated: true
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/600x400.png?text=Dog+Meme',
      title: 'Dog Humor',
      description: 'When your dog is too excited for a walk',
      platform: 'Twitter',
      type: 'image',
      aiGenerated: false
    },
    {
      id: 5,
      image: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Funny Dance Meme',
      description: 'Epic dance moves that broke the internet',
      platform: 'TikTok',
      type: 'video',
      aiGenerated: false
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/600x400.png?text=Work+Meme',
      title: 'Work Struggles',
      description: 'When Monday hits you like a truck',
      platform: 'Facebook',
      type: 'image',
      aiGenerated: true
    },
    {
      id: 7,
      image: 'https://www.w3schools.com/html/movie.mp4',
      title: 'Epic Fail Meme',
      description: 'Moments that left us speechless',
      platform: 'YouTube',
      type: 'video',
      aiGenerated: true
    }
  ]

  const imageMemes = memeSamples.filter(meme => meme.type === 'image')
  const videoMemes = memeSamples.filter(meme => meme.type === 'video')

  const handleCardClick = meme => setSelectedMeme(meme)
  const handleCloseModal = () => setSelectedMeme(null)

  return (
    <Box sx={{ padding: 4, mx: 'auto' }}>
      {/* Image Memes Section */}
      <Typography variant='h4' gutterBottom>
        Image Memes
      </Typography>
      <Grid container spacing={3}>
        {imageMemes.map(meme => (
          <Grid item xs={12} sm={6} md={4} lg={3} columnSpacing={4} key={meme.id}>
            <MemeCard {...meme} onClick={() => handleCardClick(meme)} />
          </Grid>
        ))}
      </Grid>

      {/* Video Memes Section */}
      <Typography variant='h4' gutterBottom sx={{ marginTop: 4 }}>
        Video Memes
      </Typography>
      <Grid container spacing={3}>
        {videoMemes.map(meme => (
          <Grid item xs={12} sm={6} md={4} key={meme.id}>
            <MemeCard {...meme} onClick={() => handleCardClick(meme)} />
          </Grid>
        ))}
      </Grid>

      {/* Modal for Enlarged View */}
      {selectedMeme && (
        <Modal open={!!selectedMeme} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: 'none',
              width: '80%',
              maxWidth: 800
            }}
          >
            {selectedMeme.type === 'image' ? (
              <img
                src={selectedMeme.image}
                alt={selectedMeme.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            ) : (
              <video width='100%' controls style={{ maxHeight: '70vh' }}>
                <source src={selectedMeme.image} type='video/mp4' />
              </video>
            )}
            <Typography variant='h6' mt={2}>
              {selectedMeme.title}
            </Typography>
            <Typography variant='body2' color='text.secondary' mt={1}>
              {selectedMeme.description}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  )
}

export default Home
