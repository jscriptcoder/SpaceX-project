import { SearchResponse, Starship } from '@/constants/types'
import EntityTable from './EntityTable'
import { useState } from 'react'

export default function StarshipsTable({
  data,
}: {
  data?: SearchResponse<Starship>
}) {
  const [searchResponse, setSearchResponse] = useState<
    SearchResponse<Starship> | undefined
  >(data)

  return (
    <EntityTable
      data={searchResponse}
      onPage={(res?: SearchResponse<Starship>) => setSearchResponse(res)}
    >
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th align="center">Crew</th>
            <th align="center">Passengers</th>
            <th align="center">Cargo Capacity</th>
            <th align="center">Length</th>
            <th>Manufacturer</th>
            <th align="center">Consumables</th>
            <th align="center">Cost In Credits</th>
          </tr>
        </thead>
        <tbody>
          {searchResponse?.results.map((ship) => (
            <tr key={ship.url} className="capitalize">
              <td>{ship.name}</td>
              <td>{ship.model}</td>
              <td align="center">{ship.crew}</td>
              <td align="center">{ship.passengers}</td>
              <td align="center">{ship.cargo_capacity}</td>
              <td align="center">{ship.length}</td>
              <td>{ship.manufacturer}</td>
              <td align="center">{ship.consumables}</td>
              <td align="center">{ship.cost_in_credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
