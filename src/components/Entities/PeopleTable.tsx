import { Character, SearchResponse } from '@/constants/types'
import EntityTable from './EntityTable'
import { useEffect, useState } from 'react'

export default function PeopleTable({
  data,
}: {
  data?: SearchResponse<Character>
}) {
  const [searchResponse, setSearchResponse] = useState<
    SearchResponse<Character> | undefined
  >(data)

  return (
    <EntityTable
      data={searchResponse}
      onPage={(res?: SearchResponse<Character>) => setSearchResponse(res)}
    >
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th align="center">Gender</th>
            <th align="center">Year of Birth</th>
            <th>Eye color</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th align="center">Height</th>
            <th align="center">Mass</th>
          </tr>
        </thead>
        <tbody>
          {searchResponse?.results.map((person) => (
            <tr key={person.url} className="capitalize">
              <td>{person.name}</td>
              <td align="center">{person.gender}</td>
              <td align="center">{person.birth_year}</td>
              <td>{person.eye_color}</td>
              <td>{person.hair_color}</td>
              <td>{person.skin_color}</td>
              <td align="center">{person.height}</td>
              <td align="center">{person.mass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </EntityTable>
  )
}
