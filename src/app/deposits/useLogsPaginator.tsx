import { useMemo } from 'react'

type UseLogsPaginatorArgs = {
  page: number
  pageSize: number
  totalItems: number
  buttonsToShow: number
}

/**
 * This hook will gives us all the information we need to build a paginator UI
 * that shows first, previous, a fixed amount (buttonsToShow) of buttons to directly
 * navigate to a page, next and last buttons.
 */
export default function useLogsPaginator({
  page,
  pageSize,
  totalItems,
  buttonsToShow,
}: UseLogsPaginatorArgs) {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  )

  // TODO: I noticed an issue when getting close to the last page.
  //       Tha amount of buttonsToShow is not respected. Look into it.
  const buttons = useMemo(
    () => Math.min(buttonsToShow, totalPages),
    [buttonsToShow, totalPages]
  )

  const startPage = useMemo(
    () => Math.max(1, page - Math.floor(buttons / 2)),
    [page, buttons]
  )

  const endPage = useMemo(
    () => Math.min(totalPages, startPage + buttons - 1),
    [totalPages, startPage, buttons]
  )

  const pages = useMemo(() => {
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      return startPage + i
    })
  }, [startPage, endPage])

  return {
    pages,
    totalPages,
  }
}
