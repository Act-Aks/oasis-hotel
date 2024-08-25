import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={'discount'}
        options={[
          { label: 'All', value: 'all' },
          { label: 'No discount', value: 'no-discount' },
          { label: 'With discount', value: 'with-discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by low price' },
          { value: 'regularPrice-desc', label: 'Sort by high price' },
          { value: 'maxCapacity-asc', label: 'Sort by low max capacity' },
          { value: 'maxCapacity-desc', label: 'Sort by high max capacity' },
        ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations
