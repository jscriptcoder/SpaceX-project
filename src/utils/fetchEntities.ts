import { Entity, SearchResultValue } from '@/constants/types'

const cache = new Map<string, Promise<SearchResultValue>>()

/**
 * Fetches entities from the given URL, and caches the result.
 * This is useful when we want to paginate through the results,
 * since Swapi is quite slow.
 */
export default async function fetchEntities<T extends Entity>(
  url: string
): Promise<SearchResultValue<T>> {
  if (cache.has(url)) {
    // TODO: I noticed that sometimes, when there is no search term, the URL
    //       comes without the `search` query parameter, causing wrong cache.
    //       Need to investigate this.
    return cache.get(url) as Promise<SearchResultValue<T>>
  }

  // TODO: handle errors
  const result = await fetch(url).then((res) => res.json())
  cache.set(url, result)

  return result
}
