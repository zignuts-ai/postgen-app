export type platformTypes = 'instagram' | 'linkedin' | 'reddit' | 'x'
export type toneTypes =
  | 'Polite'
  | 'Witty'
  | 'Enthusiastic'
  | 'Friendly'
  | 'Informational'
  | 'Funny'
  | 'Formal'
  | 'Informal'
  | 'Humorous'
  | 'Serious'
  | 'Optimistic'
  | 'Motivating'

export type platformArrayTypes = {
  name: string
  value: platformTypes
  icon: string
}

export type toneTypeArrayTypes = {
  name: string
  value: toneTypes
}
