import styled from 'styled-components'

import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'
import Tag from '../../ui/Tag'
import BookingDataBox from './BookingDataBox'

import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'
import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import { useMoveBack } from '../../hooks/useMoveBack'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'
import Modal from '../../ui/Modal'
import Spinner from '../../ui/Spinner'
import { getRoute } from '../../utils/helpers'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

const BookingDetail = () => {
  const { bookingId } = useParams()
  const { booking, isBookingLoading } = BookingsHooks.useGetBooking(bookingId)
  const { checkOut, isCheckingOut } = BookingsHooks.useCheckOut({})
  const { deleteBooking, isDeleting } = BookingsHooks.useDeleteBooking({})
  const moveBack = useMoveBack()
  const navigate = useNavigate()

  if (isBookingLoading) return <Spinner />
  if (!booking) return <Empty resource={'booking'} />

  const { status } = booking
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  const handleDeleteBooking = () => {
    deleteBooking(bookingId, {
      onSettled: () => moveBack(),
    })
  }

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/${getRoute('CheckIn', { bookingId })}`)}>Check in</Button>
        )}
        {status === 'checked-in' && (
          <Button icon={<HiArrowUpOnSquare />} onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Trigger opens={'delete'}>
            <Button $variant={'danger'} icon={<HiTrash />}>
              Delete booking
            </Button>
          </Modal.Trigger>

          <Modal.Content name={'delete'}>
            <ConfirmDelete resourceName={'booking'} disabled={isDeleting} onConfirm={handleDeleteBooking} />
          </Modal.Content>
        </Modal>

        <Button $variant='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
