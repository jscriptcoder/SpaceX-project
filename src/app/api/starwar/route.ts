import { swapApiURL } from '@/constants/config'
import {
  Entity,
  SearchCategory,
  SearchResponse,
  SearchResultValue,
} from '@/constants/types'
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
    // There is a search term, so we search for it in the categories
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

  const resultValuePromises = responses.map(async (response, idx) => {
    const category = categoriesToSearchIn[idx]
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
  })

  const resultValues = await Promise.all(resultValuePromises)

  const responseBody = resultValues.sort((r1, r2) =>
    Number(r1.data?.count) < Number(r2.data?.count) ? 1 : -1
  )

  return NextResponse.json(responseBody)
}
