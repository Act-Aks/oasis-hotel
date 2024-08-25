import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../constants/misc'
import { QueryKeys } from '../../constants/queryKeys'
import { getBookings } from '../../services/bookingsService'

const useGetBookings = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  /* Filter bookings */
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }
  /* Sort bookings */
  const sortedBy = searchParams.get('sortBy') || 'startDate-desc'
  const [sortField, sortOrder] = sortedBy.split('-')
  const sortBy = { field: sortField, value: sortOrder }
  /* Pagination */
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const {
    data: { data, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKeys.Bookings, filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  /* Pre-fetching */
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.Bookings, filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [QueryKeys.Bookings, filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
  }

  return {
    bookings: data,
    bookingsCount: count,
    bookingsLoading: isLoading,
    bookingsError: error,
  }
}

export const BookingsHooks = {
  useGetBookings,
}
