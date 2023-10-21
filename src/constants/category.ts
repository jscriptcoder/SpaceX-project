export enum SearchCategory {
  ALL = 'all',
  PEOPLE = 'people',
  SPECIES = 'species',
  PLANETS = 'planets',
  VEHICLES = 'vehicles',
  STARSHIPTS = 'starships',
}

export const searchCategories = Object.values(SearchCategory)

export const categories = searchCategories.filter(
  (category) => category !== SearchCategory.ALL
)
