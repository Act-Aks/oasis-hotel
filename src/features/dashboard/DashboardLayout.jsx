import styled from 'styled-components'
import { BookingsHooks } from '../../hooks/bookings/bookings.hooks'
import { CabinHooks } from '../../hooks/cabins/cabins.hooks'
import Spinner from '../../ui/Spinner'
import Stats from './Stats'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

const DashboardLayout = () => {
  const { recentBookings, recentBookingsLoading } = BookingsHooks.useRecentBookings()
  const { recentStays, recentStaysLoading, confirmedStays, numberDays } = BookingsHooks.useRecentStays()
  const { cabins, cabinsLoading } = CabinHooks.useGetCabins()

  if (recentBookingsLoading || recentStaysLoading || cabinsLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numberDays}
        cabinsCount={cabins?.length}
      />
      <div>Todays</div>
      <div>chart</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
