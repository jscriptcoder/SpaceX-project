import { SearchCategory } from '@/constants/category'
import { Entity, SearchResponse, SearchResultValue } from '@/constants/types'

export async function processResponse(
  category: SearchCategory,
  response: Response
) {
  const resultValue: SearchResultValue = { category }

  if (response.status >= 400) {
    resultValue.error = `Swapi came back with status ${response.status}`
  } else {
    try {
      resultValue.data = (await response.json()) as SearchResponse<Entity>
    } catch (err) {
      resultValue.error = `${err}`
    }
  }

  return resultValue
}
