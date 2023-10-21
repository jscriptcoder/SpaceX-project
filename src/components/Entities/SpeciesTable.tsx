import { SearchResponse, Species } from '@/constants/types'
import EntityTable from './EntityTable'
import { useState } from 'react'

export default function SpeciesTable({
  data,
}: {
  data?: SearchResponse<Species>
}) {
  const [searchResponse, setSearchResponse] = useState<
    SearchResponse<Species> | undefined
  >(data)

  return (
    <EntityTable
      data={searchResponse}
      onPage={(res?: SearchResponse<Species>) => setSearchResponse(res)}
    >
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th align="center">Designation</th>
            <th align="center">Classification</th>
            <th>Eye color</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th align="center">Avg. Height</th>
            <th align="center">Avg. Lifespan</th>
          </tr>
        </thead>
        <tbody>
          {searchResponse?.results.map((specie) => (
            <tr key={specie.url} className="capitalize">
              <td>{specie.name}</td>
              <td>{specie.language}</td>
              <td align="center">{specie.designation}</td>
              <td align="center">{specie.classification}</td>
              <td>{specie.eye_colors}</td>
              <td>{specie.hair_colors}</td>
              <td>{specie.skin_colors}</td>
              <td align="center">{specie.average_height}</td>
              <td align="center">{specie.average_lifespan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
