import { format, isToday } from 'date-fns'
import styled from 'styled-components'

import Table from '../../ui/Table'
import Tag from '../../ui/Tag'

import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import { formatCurrency, formatDistanceFromNow, getRoute } from '../../utils/helpers'

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`

const BookingRow = ({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) => {
  const navigate = useNavigate()
  const { checkOut, isCheckingOut } = BookingsHooks.useCheckOut({})
  const { deleteBooking, isDeleting } = BookingsHooks.useDeleteBooking({})

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  const handleCheckOut = () => {
    checkOut(bookingId)
  }
  const handleCheckIn = () => {
    navigate(`/${getRoute('BookingDetails', { bookingId })}`)
  }
  const handleDeleteBooking = () => {
    deleteBooking(bookingId)
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash; {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye />} onClick={handleCheckIn}>
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/${getRoute('CheckIn', { bookingId })}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button icon={<HiArrowUpOnSquare />} onClick={handleCheckOut} disabled={isCheckingOut}>
                Check out
              </Menus.Button>
            )}

            <Modal.Trigger opens={'delete'}>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Trigger>
          </Menus.List>
        </Menus.Menu>

        <Modal.Content name={'delete'}>
          <ConfirmDelete resourceName={'booking'} disabled={isDeleting} onConfirm={handleDeleteBooking} />
        </Modal.Content>
      </Modal>
    </Table.Row>
  )
}

export default BookingRow
