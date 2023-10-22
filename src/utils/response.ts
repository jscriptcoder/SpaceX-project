import { SearchCategory } from '@/constants/category'
import { swapApiURL } from '@/constants/config'
import { Entity, SearchResponse, SearchResultValue } from '@/constants/types'

/**
 * Extracts the data from the response and returns it in a SearchResultValue.
 * If any error occurs during the process, it will be returned in the error field.
 */
export async function processResponse(
  category: SearchCategory,
  response: Response
) {
  const resultValue: SearchResultValue = { category }

  // TODO: reconsider this. We might actually want to
  //       better return the error status to the client.

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

/**
 * Replaces the pagination URLs with our route, which will proxy to swapi.dev
 */
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
