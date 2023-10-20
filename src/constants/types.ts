export enum SearchCategory {
  ALL = 'all',
  PEOPLE = 'people',
  PLANETS = 'planets',
  STARSHIPTS = 'starships',
  VEHICLES = 'vehicles',
}

export interface SearchQuery {
  search: string
  category: SearchCategory
}

export interface Film {
  characters: string[]
  created: Date
  director: string
  edited: Date
  episode_id: 4
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

export interface Entity {
  name: string
  films: string[]
  url: string
}

export interface Character extends Entity {
  birth_year: string
  eye_color: string
  gender: 'Male' | 'Female' | 'unknown' | 'n/a'
  hair_color: string
  height: number
  homeworld: string
  mass: number
  skin_color: string
  created: Date
  edited: Date
  species: string[]
  starships: string[]
  vehicles: string[]
}

export interface Planet extends Entity {
  climate: string
  created: Date
  diameter: number
  edited: Date
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
  created: Date
  crew: number
  edited: Date
  hyperdrive_rating: number
  length: number
  manufacturer: string
  max_atmosphering_speed: number | 'n/a'
  model: string
  passengers: number
  pilots: []
  starship_class: string
}

export interface Vehicle {
  cargo_capacity: number
  consumables: string
  cost_in_credits: number
  created: Date
  crew: number
  edited: Date
  length: number
  manufacturer: string
  max_atmosphering_speed: number
  model: string
  passengers: number
  pilots: []
  vehicle_class: 'wheeled' | 'Repulsorcraft'
}

export interface SearchResponse<T> {
  count: number
  next: string | null
  previews: string | null
  results: T[]
}

export interface SearchResultValue {
  category: SearchCategory
  error?: string
  data?: SearchResponse<Entity>
}
