import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import Empty from '../../ui/Empty'
import Menus from '../../ui/Menus'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import BookingRow from './BookingRow'

const BookingTable = () => {
  const { bookings, bookingsCount, bookingsLoading } = BookingsHooks.useGetBookings()

  if (bookingsLoading) return <Spinner />
  if (!bookings || !bookings.length) return <Empty resource={'bookings'} />

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Content data={bookings} render={booking => <BookingRow key={booking.id} booking={booking} />} />

        <Table.Footer>
          <Pagination count={bookingsCount} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default BookingTable
