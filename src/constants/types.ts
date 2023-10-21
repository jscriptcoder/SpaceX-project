import { SearchCategory } from './category'

export interface SearchQuery {
  search: string
  category: SearchCategory
}

export interface Datable {
  created: Date
  edited: Date
}

export interface Film extends Datable {
  characters: string[]
  director: string
  episode_id: number
  opening_crawl: string
  planets: string[]
  producer: string
  release_date: string
  species: string[]
  starships: string[]
  title: string
  url: string
  vehicles: string[]
}

export interface Entity extends Datable {
  name: string
  films: string[]
  url: string
}

export interface People extends Entity {
  birth_year: string
  eye_color: string
  gender: 'Male' | 'Female' | 'unknown' | 'n/a'
  hair_color: string
  height: number
  homeworld: string
  mass: number
  skin_color: string
  species: string[]
  starships: string[]
  vehicles: string[]
}

export interface Planet extends Entity {
  climate: string
  diameter: number
  gravity: number
  orbital_period: number
  population: number
  residents: string[]
  rotation_period: number
  surface_water: number
  terrain: string
}

export interface Starship extends Entity {
  MGLT: string
  cargo_capacity: number
  consumables: string
  cost_in_credits: number
  crew: number
  hyperdrive_rating: number
  length: number
  manufacturer: string
  max_atmosphering_speed: number | 'n/a'
  model: string
  passengers: number
  pilots: []
  starship_class: string
}

export interface Vehicle extends Entity {
  cargo_capacity: number
  consumables: string
  cost_in_credits: number
  crew: number
  length: number
  manufacturer: string
  max_atmosphering_speed: number
  model: string
  passengers: number
  pilots: []
  vehicle_class: 'wheeled' | 'Repulsorcraft'
}

export interface Species extends Entity {
  average_height: number
  average_lifespan: number
  classification: 'mammal' | 'reptile' | 'artificial' | 'sentient' | 'gastropod'
  designation: 'sentient' | 'reptile'
  eye_colors: string
  hair_colors: string
  homeworld: string
  language: string
  people: string[]
  skin_colors: string
}

export interface SearchResponse<T = Entity> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface SearchResultValue<T = Entity> {
  category: SearchCategory
  error?: string
  data?: SearchResponse<T>
}
