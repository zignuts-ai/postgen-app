import React from 'react'
import { Icon } from '@iconify/react'
import { useAuth } from 'src/hooks/useAuth'

type Props = {
  metadata: {
    caption: string
    title: string
    imageUrl: string
  }
}

const RedditPreview = ({ metadata }: Props) => {
  const { caption, title, imageUrl } = metadata
  const { user } = useAuth()

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex border border-gray-300 bg-white rounded-md overflow-hidden  '>
        <div className='flex flex-col items-center bg-gray-100 p-2 w-10'>
          <Icon icon={'bx:upvote'} color='gray' fontSize={23} />
          <span className='text-xs font-semibold my-1 text-black'>42</span>
          <Icon icon={'bx:downvote'} color='gray' fontSize={23} />
        </div>

        <div className='flex-grow py-2'>
          <div className='p-2.5'>
            <div className='flex items-center text-xs text-gray-500 mb-1 flex-wrap'>
              <img
                src={`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`}
                className='rounded-full mr-2 w-4 h-4'
                alt='Community Logo'
              />
              <span className='font-bold mr-1 hover:underline'>r/JavaScript</span>
              <span className='mx-1'>•</span>
              <span>Posted by u/CodeMaster 3 hours ago</span>
            </div>

            <h2 className='text-black font-semibold mb-1'>{title}</h2>

            <p className='text-sm text-gray-700 mb-2'>{caption}</p>

            <div className='flex justify-center mb-2'>
              <img src={imageUrl} alt='Post Image' className='max-h-[460px] w-auto object-contain' />
            </div>

            <div className='flex text-gray-500 text-xs font-semibold'>
              <div className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer mr-1'>
                <i className='fas fa-comment mr-1'></i>
                <span>45 Comments</span>
              </div>
              <div className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer mr-1'>
                <i className='fas fa-share mr-1'></i>
                <span>Share</span>
              </div>
              <div className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer mr-1'>
                <i className='fas fa-bookmark mr-1'></i>
                <span>Save</span>
              </div>
              <div className='flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer'>
                <i className='fas fa-trash mr-1'></i>
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedditPreview
