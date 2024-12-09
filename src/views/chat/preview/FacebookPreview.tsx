import { Icon } from '@iconify/react'
import React from 'react'
import { useAuth } from 'src/hooks/useAuth'

type Props = {
  metadata: {
    caption: string
    imageUrl: string
  }
}

const FacebookPreview = ({ metadata }: Props) => {
  const { user } = useAuth()

  const { caption, imageUrl } = metadata

  return (
    <div className='post'>
      <div className='post__top'>
        <img
          className='user__avatar post__avatar object-cover rounded-full !w-11 !h-11'
          src={`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`}
          alt=''
        />
        <div className='post__topInfo'>
          <h3 className='text-black'>{user?.name ?? 'John Doe'}</h3>
          <p className='text-black'>25 April at 20:30</p>
        </div>
      </div>

      <div className='post__bottom !py-0'>
        <p className='text-black'>{caption}</p>
      </div>

      <div className='post__image'>
        <img src={imageUrl} alt='' />
      </div>

      <div className='post__options'>
        <div className='post__option'>
          <Icon icon='mdi:like' />
          <p>Like</p>
        </div>

        <div className='post__option'>
          <Icon icon='material-symbols:chat' />
          <p>Comment</p>
        </div>

        <div className='post__option'>
          <Icon icon='mdi:share' />
          <p>Share</p>
        </div>
      </div>
    </div>
  )
}

export default FacebookPreview
