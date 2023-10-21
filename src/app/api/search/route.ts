import { SearchCategory } from '@/constants/category'
import { swapApiURL } from '@/constants/config'
import { Entity, SearchResponse, SearchResultValue } from '@/constants/types'
import { processResponse, replacePagination } from '@/utils/response'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const category =
    (searchParams.get('category') as SearchCategory) || SearchCategory.ALL

  const categoriesToSearchIn: SearchCategory[] = []

  if (category === SearchCategory.ALL) {
    categoriesToSearchIn.push(
      ...Object.values(SearchCategory).filter(
        (category) => category !== SearchCategory.ALL // remove the ALL category
      )
    )
  } else {
    categoriesToSearchIn.push(category)
  }

  let fetchPromises: Promise<Response>[]
  if (search) {
    // There is a search term, so we search for it in all the categories
    fetchPromises = categoriesToSearchIn.map((category) =>
      fetch(`${swapApiURL}/${category}/?search=${encodeURIComponent(search)}`)
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

  // Replace pagination with our route, which will proxy to swapi.dev
  resultValues.forEach(replacePagination)

  // Sort the categories by count in descending order
  const responseBody = resultValues.sort((r1, r2) =>
    Number(r1.data?.count) < Number(r2.data?.count) ? 1 : -1
  )

  return NextResponse.json(responseBody)
}
