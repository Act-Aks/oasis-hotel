import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../constants/misc'
import { QueryKeys } from '../../constants/queryKeys'
import routes from '../../constants/routes'
import {
  deleteBooking,
  getBooking,
  getBookings,
  getBookingsAfterDate,
  getStaysAfterDate,
  updateBooking,
} from '../../services/bookingsService'

const DEFAULT_NUMBER_OF_DAYS = 7

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

const useGetBooking = bookingId => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.Booking, bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  })

  return {
    booking: data,
    isBookingLoading: isLoading,
    bookingError: error,
  }
}

const useCheckIn = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked in.`)
      queryClient.invalidateQueries({
        active: true,
      })
      onSuccess?.()
      navigate(routes.Home)
    },
    onError: () => {
      toast.success(`Unable to check in currently. Please try again later.`)
      onError?.()
    },
  })

  return {
    checkIn: mutate,
    isCheckingIn: isPending,
    checkInError: error,
  }
}

const useCheckOut = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: bookingId => updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked out.`)
      queryClient.invalidateQueries({ active: true })
      onSuccess?.()
    },
    onError: () => {
      toast.success(`Unable to check out currently. Please try again later.`)
      onError?.()
    },
  })

  return {
    checkOut: mutate,
    isCheckingOut: isPending,
    checkOutError: error,
  }
}

const useDeleteBooking = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success('Successfully deleted')
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Bookings],
      })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    deleteBooking: mutate,
    isDeleting: isPending,
  }
}

const useRecentBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const numberDays = !searchParams.get('last') ? DEFAULT_NUMBER_OF_DAYS : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numberDays).toISOString()
  const { data, error, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: [QueryKeys.Bookings, `last-${numberDays}`],
  })

  return {
    recentBookings: data,
    recentBookingsLoading: isLoading,
    recentBookingsError: error,
    numberDays,
  }
}

const useRecentStays = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const numberDays = !searchParams.get('last') ? DEFAULT_NUMBER_OF_DAYS : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numberDays).toISOString()
  const { data, error, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: [QueryKeys.Stays, `last-${numberDays}`],
  })

  const confirmedStays = data?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

  return {
    recentStays: data,
    recentStaysLoading: isLoading,
    recentStaysError: error,
    confirmedStays,
    numberDays,
  }
}

export const BookingsHooks = {
  useCheckIn,
  useCheckOut,
  useDeleteBooking,
  useGetBooking,
  useGetBookings,
  useRecentBookings,
  useRecentStays,
}
