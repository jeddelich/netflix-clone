export interface Genre {
  id: number
  name: string
}

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}

export interface Price {
  id: string
  currency: string
  unit_amount: number | null
  interval: 'day' | 'week' | 'month' | 'year'
  interval_count: number
}

export interface Product {
  id: string
  name: string
  description: string | null
  active: boolean
  images: string[]
  prices: Price[]
  metadata: {
    role?: string
    videoQuality: string
    resolution: string
    portability: string
    watchDevices: string
    downloadDevices: string
    ads: string
  }
}

export interface Subscription {
  id: string
  created?: {
    seconds: number
    nanoseconds: number
  }
  cancel_at_period_end?: boolean
  product?: string
  role: string | null
  status: string
  current_period_start?: number
  current_period_end?: number
}