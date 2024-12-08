import { ChatMessage } from 'src/types/chatContextType'
import { Content } from 'src/types/contentTypes'

export const CHAT_DATA: ChatMessage[] = [
  {
    message: 'Hi',
    timestamp: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
    id: 'dsdsddsde',
    role: 'user',
    type: 'text'
  },
  {
    message: 'Hello. How can I help You?',
    timestamp: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
    id: 'ss384ddu8',
    role: 'ai',
    type: 'text'
  },
  {
    message: 'Can I get details of my last transaction I made last month? 🤔',
    timestamp: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
    id: 'ss384u8',
    role: 'user',
    type: 'text'
  },
  {
    message: 'We need to check if we can provide you such information.',
    timestamp: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
    id: 'ss38sdds4u8',
    role: 'ai',
    type: 'meme'
  },
  {
    message: 'I will inform you as I get update on this.',
    timestamp: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
    id: 'ss383r34u8',
    role: 'ai',
    type: 'text'
  },
  {
    message: 'If it takes long you can mail me at my mail address.',
    timestamp: '2024-12-05T11:57:12.761Z',
    id: 'ss3r3r384u8',
    role: 'user',
    type: 'text'
  }
]

export const dataSample: Content[] = [
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
