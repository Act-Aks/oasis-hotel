import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import Button from '../../ui/Button'

const CheckoutButton = ({ bookingId }) => {
  const { checkOut, isCheckingOut } = BookingsHooks.useCheckOut({})

  const handleCheckOut = () => {
    checkOut(bookingId)
  }

  return (
    <Button $variant='primary' size='small' onClick={handleCheckOut} disabled={isCheckingOut}>
      Check out
    </Button>
  )
}

export default CheckoutButton
