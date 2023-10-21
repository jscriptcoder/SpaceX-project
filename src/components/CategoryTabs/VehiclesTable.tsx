import { SearchResponse, Vehicle } from '@/constants/types'
import EntityTable from './EntityTable'
import { useState } from 'react'

export default function VehiclesTable({
  data,
}: {
  data?: SearchResponse<Vehicle>
}) {
  const [searchResponse, setSearchResponse] = useState<
    SearchResponse<Vehicle> | undefined
  >(data)

  return (
    <EntityTable
      data={searchResponse}
      onPage={(res?: SearchResponse<Vehicle>) => setSearchResponse(res)}
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
          {searchResponse?.results.map((vehicle) => (
            <tr key={vehicle.url} className="capitalize">
              <td>{vehicle.name}</td>
              <td>{vehicle.model}</td>
              <td align="center">{vehicle.crew}</td>
              <td align="center">{vehicle.passengers}</td>
              <td align="center">{vehicle.cargo_capacity}</td>
              <td align="center">{vehicle.length}</td>
              <td>{vehicle.manufacturer}</td>
              <td align="center">{vehicle.consumables}</td>
              <td align="center">{vehicle.cost_in_credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
