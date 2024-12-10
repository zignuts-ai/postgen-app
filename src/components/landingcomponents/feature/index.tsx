import { LANDING_DATA } from 'src/constants/fakeData'
import { Item } from 'src/types/landing'

export default function FeatureSection() {
  const section = LANDING_DATA.feature

  return (
    <div className='bg-gradient-to-t py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl'>
      <div className='mx-auto max-w-2xl text-center mb-16'>
        <h2 className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>{section?.title}</h2>
        <div className='mt-4 text-sm font-semibold tracking-wide'>{section?.description}</div>
        <p className='mt-6 text-lg leading-8 text-muted-foreground'>{section?.tip}</p>
      </div>
      <div className='mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
          {section?.items?.map((item: Item, idx: number) => (
            <div
              key={idx}
              className='text-center p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-shadow duration-300'
            >
              {item.avatar && item.avatar.src && (
                <div className='mb-4 text-primary-500'>
                  <img src={item.avatar?.src} alt={item.avatar?.title} className='w-10 h-10 mx-auto object-contain' />
                </div>
              )}
              <h3 className='text-md font-semibold mb-2 whitespace-nowrap'>{item.title}</h3>
              <p className='text-gray-400 text-center'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
