import { SearchCategory } from '@/constants/category'
import { swapApiURL } from '@/constants/config'
import { processResponse, replacePagination } from '@/utils/response'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { category: SearchCategory } }
) {
  const { category } = params
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = searchParams.get('page') || 1

  const response = await fetch(
    `${swapApiURL}/${category}/?search=${encodeURIComponent(
      search
    )}&page=${page}`
  )

  const resultValue = await processResponse(category, response)

  replacePagination(resultValue)

  return NextResponse.json(resultValue)
}
