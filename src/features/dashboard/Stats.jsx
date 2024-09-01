import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
import Stat from './Stat'

const Stats = ({ bookings, confirmedStays, numDays, cabinsCount }) => {
  const numberOfBookings = bookings?.length
  const numberOfCheckIns = confirmedStays?.length
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0)
  const occupancy = confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinsCount)

  return (
    <>
      <Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase />} value={numberOfBookings} />
      <Stat title={'Sales'} color={'green'} icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title={'Check ins'} color={'indigo'} icon={<HiOutlineCalendarDays />} value={numberOfCheckIns} />
      <Stat
        title={'Occupancy rate'}
        color={'yellow'}
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancy * 100)}%`}
      />
    </>
  )
}

export default Stats
