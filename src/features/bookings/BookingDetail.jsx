import styled from 'styled-components'

import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'
import Tag from '../../ui/Tag'
import BookingDataBox from './BookingDataBox'

import { useNavigate, useParams } from 'react-router-dom'
import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import { useMoveBack } from '../../hooks/useMoveBack'
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
  const moveBack = useMoveBack()
  const navigate = useNavigate()

  if (isBookingLoading) return <Spinner />

  const { status } = booking
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
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
        <Button $variant='secondary' onClick={moveBack}>
          Back
        </Button>

        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/${getRoute('CheckIn', { bookingId })}`)}>Check in</Button>
        )}
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
