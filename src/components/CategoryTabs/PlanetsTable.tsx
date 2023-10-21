import { Planet, SearchResultValue } from '@/constants/types'
import EntityTable from './EntityTable'
import { useEffect, useState } from 'react'

export default function PlanetsTable({
  result,
}: {
  result?: SearchResultValue<Planet>
}) {
  if (!result) return null

  const { data } = result

  return (
    <EntityTable data={data}>
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th>Terrain</th>
            <th align="center">Diameter</th>
            <th>Gravity</th>
            <th align="center">Surface Water</th>
            <th align="center">Population</th>
            <th align="center">Rotation Period</th>
            <th align="center">Orbital Period</th>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((planet) => (
            <tr key={planet.url} className="capitalize">
              <td>{planet.name}</td>
              <td>{planet.terrain}</td>
              <td align="center">{planet.diameter}</td>
              <td>{planet.gravity}</td>
              <td align="center">{planet.surface_water}</td>
              <td align="center">{planet.population}</td>
              <td align="center">{planet.rotation_period}</td>
              <td align="center">{planet.orbital_period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
