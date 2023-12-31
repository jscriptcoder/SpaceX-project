import { SearchCategory, categories } from '@/constants/category'
import { swapApiURL } from '@/constants/config'
import { processResponse, replacePagination } from '@/utils/response'
import { NextResponse } from 'next/server'

/**
 * This endpoint helps us search for entities in all or specific categories
 * Examples:
 *    /api/search?term=luke&category=people => returns results for people with name containing "luke"
 *    /api/search?term=le&category=all => returns results for all categories with name containing "le"
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const term = searchParams.get('term')
  const category =
    (searchParams.get('category') as SearchCategory) || SearchCategory.ALL

  const categoriesToSearchIn: SearchCategory[] = []

  if (category === SearchCategory.ALL) {
    categoriesToSearchIn.push(...categories)
  } else {
    categoriesToSearchIn.push(category)
  }

  let fetchPromises: Promise<Response>[]
  if (term) {
    // There is a search term, so we search for it in all the categories
    fetchPromises = categoriesToSearchIn.map((category) =>
      fetch(`${swapApiURL}/${category}/?search=${encodeURIComponent(term)}`)
    )
  } else {
    // No search term, so we just fetch everything from the categories
    fetchPromises = categoriesToSearchIn.map((category) =>
      fetch(`${swapApiURL}/${category}`)
    )
  }

  const responses = await Promise.all(fetchPromises)

  const resultValuePromises = responses.map((response, idx) => {
    const category = categoriesToSearchIn[idx]
    return processResponse(category, response)
  })

  const resultValues = await Promise.all(resultValuePromises)

  resultValues.forEach(replacePagination)

  // Sort the categories by count in descending order.
  // We want to show the most popular categories first.
  const responseBody = resultValues.sort((r1, r2) =>
    Number(r1.data?.count) < Number(r2.data?.count) ? 1 : -1
  )

  return NextResponse.json(responseBody)
}
