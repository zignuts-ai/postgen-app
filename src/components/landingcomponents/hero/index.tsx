import { LANDING_DATA } from 'src/constants/fakeData'

export default function () {
  return (
    <div
      style={{ boxShadow: '-2px 12px 45px 40px rgba(0, 0, 0, 0.45)' }}
      className='bg-gradient-to-t from-zinc-50 to-white dark:from-zinc-950 dark:to-black relative'
    >
      <div className="absolute bg-[url('/_convertfast/gradient-bg-0.svg')] bg-auto bg-no-repeat z-0 inset-0 top-0 bottom-0 left-0 right-0 grayscale"></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl  font-bold tracking-tight text-primary mb-6 drop-shadow-md'>
            {LANDING_DATA.hero?.title}
          </h2>
          <p className='text-sm sm:text-lg text-muted-foreground mb-8'>{LANDING_DATA.hero?.description}</p>

          {LANDING_DATA.hero?.tip && <p className='mt-4 text-sm text-gray-500'>{LANDING_DATA.hero?.tip}</p>}
        </div>

        {LANDING_DATA.hero?.image?.src && (
          <img
            alt={LANDING_DATA.hero?.image?.title}
            src={LANDING_DATA.hero?.image?.src}
            className='mt-8 max-w-full md:max-w-5xl mx-auto rounded-md shadow-2xl border sm:mt-12 block '
          />
        )}
      </div>
    </div>
  )
}
