import React from 'react'
import { LANDING_DATA } from 'src/constants/fakeData'
import { Item } from 'src/types/landing'
import { Avatar, AvatarImage } from 'src/ui/avatar'
import { Card, CardContent } from 'src/ui/card'

const TestimonialCard = ({ item }: { item: Item }) => (
  <Card className='my-4'>
    <CardContent className='pt-6'>
      <blockquote>
        <p>"{item.description}"</p>
      </blockquote>
      <div className='mt-6 flex items-center gap-x-4'>
        <Avatar>
          <AvatarImage src={item.avatar?.src} alt={item.avatar?.title} />
        </Avatar>
        <div>
          <div className='font-semibold'>{item.name}</div>
          <div className='text-zinc-200'>{item.title}</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const TestimonialsGrid = ({ items }: { items: Item[] }) => (
  <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
    {items.map((item: Item, idx: number) => (
      <TestimonialCard key={idx} item={item} />
    ))}
  </div>
)

export default function () {
  return (
    <div className='py-8 sm:py-16'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='text-center my-8'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>{LANDING_DATA.testimonial?.title}</h2>
          <div className='mt-4 text-sm font-semibold tracking-wide'>{LANDING_DATA.testimonial?.description}</div>
        </div>
        {LANDING_DATA.testimonial?.items && <TestimonialsGrid items={LANDING_DATA.testimonial?.items} />}
      </div>
    </div>
  )
}
