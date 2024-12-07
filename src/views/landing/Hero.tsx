import { Button } from '@mui/material'
import { Element as ScrollElement, Link as LinkScroll } from 'react-scroll'

const Hero = () => {
  return (
    <section className='relative pt-60 pb-52 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 w-full '>
      {/* @ts-ignore */}
      <ScrollElement name='hero'>
        <div className='container'>
          <div className='relative z-2 max-w-512 max-lg:max-w-388 '>
            <div className='caption small-2 uppercase text-p3'>Video Editing</div>
            <h1 className='mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12'>
              News -AI
              {/* NewsAI: Your Intelligent Content Generator */}
            </h1>
            <p className='w-[900px] mb-14 body-1 max-md:mb-10 m-auto'>
              Bringing stories to life with creativity—where news evolves into stunning visuals, clever memes, and
              dynamic formats that captivate and inspire.
            </p>
            {/* @ts-ignore */}
            <LinkScroll to='features' offset={-100} spy smooth>
              <Button variant='contained'>Try it now</Button>
            </LinkScroll>
          </div>

          {/* <div className='absolute -top-32 left-[calc(50%-340px)] w-[1200px] pointer-events-none hero-img_res'>
            <img src='/images/hero.png' className='size-230 max-lg:h-auto' alt='hero' />
          </div> */}
        </div>
      </ScrollElement>
    </section>
  )
}

export default Hero
