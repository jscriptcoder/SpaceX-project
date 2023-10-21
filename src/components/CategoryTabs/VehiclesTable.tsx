import { SearchResultValue, Vehicle } from '@/constants/types'
import EntityTable from './EntityTable'

export default function VehiclesTable({
  result,
}: {
  result?: SearchResultValue<Vehicle>
}) {
  if (!result) return null

  const { data } = result

  return (
    <EntityTable data={data}>
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
          {data?.results.map((vehicle) => (
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
