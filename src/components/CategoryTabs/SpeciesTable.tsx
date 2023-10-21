import { SearchResultValue, Species } from '@/constants/types'
import EntityTable from './EntityTable'

export default function SpeciesTable({
  result,
}: {
  result?: SearchResultValue<Species>
}) {
  if (!result) return null

  const { data } = result

  return (
    <EntityTable data={data}>
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
          {data?.results.map((species) => (
            <tr key={species.url} className="capitalize">
              <td>{species.name}</td>
              <td>{species.language}</td>
              <td align="center">{species.designation}</td>
              <td align="center">{species.classification}</td>
              <td>{species.eye_colors}</td>
              <td>{species.hair_colors}</td>
              <td>{species.skin_colors}</td>
              <td align="center">{species.average_height}</td>
              <td align="center">{species.average_lifespan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
