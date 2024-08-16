import { useState } from 'react'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import { CabinHooks } from '../../hooks/cabins/cabins.hooks'
import { formatCurrency } from '../../utils/helpers'
import CabinForm from './CabinForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin
  const [showForm, setShowForm] = useState(false)

  const { deleteCabin, isDeleting } = CabinHooks.useDeleteCabin({})
  const { createCabin, isCreatingCabin } = CabinHooks.useCreateCabin({})

  const onPressEdit = () => setShowForm(show => !show)
  const onPressDelete = () => deleteCabin(cabinId)
  const onPressDuplicate = () =>
    createCabin({
      name: `Copy of ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    })

  const isDisabled = isDeleting || isCreatingCabin

  return (
    <>
      <TableRow role='row'>
        <Img src={image} loading='lazy' />
        <Cabin>{name}</Cabin>
        <div>Upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={onPressDuplicate} disabled={isDisabled}>
            <HiSquare2Stack />
          </button>
          <button onClick={onPressEdit} disabled={isDisabled}>
            <HiPencil />
          </button>
          <button onClick={onPressDelete} disabled={isDisabled}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CabinForm cabin={cabin} />}
    </>
  )
}

export default CabinRow
