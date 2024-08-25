import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { CabinHooks } from '../../hooks/cabins/cabins.hooks'
import Empty from '../../ui/Empty'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

const CabinTable = () => {
  const [searchParams] = useSearchParams()
  const { cabins, cabinsLoading } = CabinHooks.useGetCabins()

  const filterBy = searchParams.get('discount')
  const filterCabins = useMemo(() => {
    switch (filterBy) {
      case 'no-discount':
        return cabins?.filter(cabin => cabin.discount === 0)
      case 'with-discount':
        return cabins?.filter(cabin => cabin.discount > 0)
      case 'all':
      default:
        return cabins
    }
  }, [filterBy, cabins])

  const sortBy = searchParams.get('sortBy') || 'name-asc'
  const [sortField, sortOrder] = sortBy.split('-')
  const modifier = sortOrder === 'asc' ? 1 : -1
  const sortedCabins = filterCabins?.sort((a, b) => (a?.[sortField] - b?.[sortField]) * modifier)

  if (cabinsLoading) return <Spinner />
  if (!cabins || !cabins.length) return <Empty resource={'cabins'} />

  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header role='row'>
          <div />
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div />
        </Table.Header>

        <Table.Content data={sortedCabins} render={cabin => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}

export default CabinTable
