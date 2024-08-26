import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import { SettingsHooks } from '../../hooks/settings/settings.hooks'
import { useMoveBack } from '../../hooks/useMoveBack'
import Checkbox from '../../ui/Checkbox'
import Spinner from '../../ui/Spinner'
import { formatCurrency } from '../../utils/helpers'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  const { bookingId } = useParams()
  const { settings, isSettingsLoading } = SettingsHooks.useGetSettings()
  const { booking, isBookingLoading } = BookingsHooks.useGetBooking(bookingId)
  const { checkIn, isCheckingIn } = BookingsHooks.useCheckIn({})
  const moveBack = useMoveBack()

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid])

  if (isBookingLoading || isSettingsLoading) return <Spinner />

  const { guests, totalPrice, numGuests, hasBreakfast, numNights } = booking
  const optionalBreakfastPrice = settings?.breakfastPrice * numGuests

  const handleCheckin = () => {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkIn({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={addBreakfast || isCheckingIn}
            onChange={() => {
              setAddBreakfast(add => !add)
              setConfirmPaid(false)
            }}
            id={'breakfast'}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id={'confirm'}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variant='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
