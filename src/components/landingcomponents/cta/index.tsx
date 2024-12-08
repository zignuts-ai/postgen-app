import Link from 'next/link'
import { Section } from '../../../types/landing'
import { Button } from 'src/ui/button'

// import { BGShapeCircle } from "@/components/bg-shape-circle";

export default function ({ section }: { section: Section }) {
  if (section.disabled) {
    return
  }

  return (
    <section className='bg-gradient-to-t from-zinc-50 to-white dark:from-zinc-950 relative'>
      <div className="absolute bg-[url('/_convertfast/gradient-bg-0.svg')] bg-auto bg-no-repeat inset-0 top-0 bottom-0 left-0 right-0 grayscale bg-center"></div>
      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 relative z-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl'>{section.title}</h2>
          <p className='mt-6 text-xl leading-8 opacity-90 text-muted-foreground'>{section.description}</p>
          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
            {section.buttons?.map((v, idx) => (
              <Link key={idx} href={v.url || ''} target={v.target || '_blank'}>
                <Button
                  key={idx}
                  size='lg'
                  variant={v.theme === 'outline' ? 'outline' : 'default'}
                  className='w-full sm:w-auto'
                >
                  {v.title}
                </Button>
              </Link>
            ))}
          </div>
          <p className='mt-6 text-sm opacity-75 text-muted-foreground'>{section.tip}</p>
        </div>
      </div>
    </section>
  )
}
