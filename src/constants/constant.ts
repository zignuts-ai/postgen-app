import { platformArrayTypes, toneTypeArrayTypes } from 'src/types/constantTypes'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export const PLATFORM_TYPE: platformArrayTypes[] = [
  {
    name: 'Linkedin',
    value: 'linkedin',
    icon: 'devicon:linkedin'
  },
  {
    name: 'Instagram',
    value: 'instagram',
    icon: 'skill-icons:instagram'
  }
]

export const TONE_TYPE: toneTypeArrayTypes[] = [
  {
    name: 'Polite',
    value: 'Polite'
  },
  {
    name: 'Witty',
    value: 'Witty'
  },
  {
    name: 'Funny',
    value: 'Funny'
  },
  {
    name: 'Enthusiastic',
    value: 'Enthusiastic'
  },
  {
    name: 'Friendly',
    value: 'Friendly'
  },
  {
    name: 'Informational',
    value: 'Informational'
  }

  // {
  //   name: 'Formal',
  //   value: 'Formal'
  // },
  // {
  //   name: 'Informal',
  //   value: 'Informal'
  // },
  // {
  //   name: 'Humorous',
  //   value: 'Humorous'
  // },
  // {
  //   name: 'Serious',
  //   value: 'Serious'
  // },
  // {
  //   name: 'Optimistic',
  //   value: 'Optimistic'
  // },
  // {
  //   name: 'Motivating',
  //   value: 'Motivating'
  // }
]
