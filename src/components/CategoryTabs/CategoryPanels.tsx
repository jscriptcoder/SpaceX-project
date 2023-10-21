import { SearchCategory } from '@/constants/category'
import {
  Character,
  Planet,
  SearchResultValue,
  Species,
  Starship,
  Vehicle,
} from '@/constants/types'
import PeopleTable from './PeopleTable'
import PlanetsTable from './PlanetsTable'
import SpeciesTable from './SpeciesTable'
import StarshipsTable from './StarshipsTable'
import VehiclesTable from './VehiclesTable'
import LoadingTable from './LoadingTable'

type CategoryPanelsProps = {
  tab: SearchCategory
  loading: boolean
  results: SearchResultValue[]
}

export default function CategoryPanels({
  tab,
  loading,
  results = [],
}: CategoryPanelsProps) {
  if (loading) return <LoadingTable rows={11} />

  switch (tab) {
    case SearchCategory.PEOPLE:
      const people = results.find(
        (value) => value.category === SearchCategory.PEOPLE
      ) as SearchResultValue<Character>
      return <PeopleTable data={people?.data} />
    case SearchCategory.PLANETS:
      const planets = results.find(
        (value) => value.category === SearchCategory.PLANETS
      ) as SearchResultValue<Planet>
      return <PlanetsTable data={planets?.data} />
    case SearchCategory.SPECIES:
      const species = results.find(
        (value) => value.category === SearchCategory.SPECIES
      ) as SearchResultValue<Species>
      return <SpeciesTable data={species?.data} />
    case SearchCategory.STARSHIPTS:
      const ships = results.find(
        (value) => value.category === SearchCategory.STARSHIPTS
      ) as SearchResultValue<Starship>
      return <StarshipsTable data={ships?.data} />
    case SearchCategory.VEHICLES:
      const vehicles = results.find(
        (value) => value.category === SearchCategory.VEHICLES
      ) as SearchResultValue<Vehicle>
      return <VehiclesTable data={vehicles?.data} />
    default:
    // TODO: handle this case
  }
}
