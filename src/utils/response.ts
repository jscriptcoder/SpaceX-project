import { SearchCategory } from '@/constants/category'
import { swapApiURL } from '@/constants/config'
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
      resultValue.data = (await response.json()) as SearchResponse
    } catch (err) {
      resultValue.error = `${err}`
    }
  }

  return resultValue
}

export function replacePagination(resultValue: SearchResultValue) {
  if (resultValue.data?.next) {
    resultValue.data.next = resultValue.data.next.replace(swapApiURL, 'api')
  }

  if (resultValue.data?.previous) {
    resultValue.data.previous = resultValue.data.previous.replace(
      swapApiURL,
      'api'
    )
  }
}
