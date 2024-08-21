import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import styled from 'styled-components'
import { CabinHooks } from '../../hooks/cabins/cabins.hooks'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import Table from '../../ui/Table'
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
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin

  const { deleteCabin, isDeleting } = CabinHooks.useDeleteCabin({})
  const { createCabin, isCreatingCabin } = CabinHooks.useCreateCabin({})

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
    <Table.Row role='row'>
      <Img src={image} loading='lazy' />
      <Cabin>{name}</Cabin>
      <div>Upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={onPressDuplicate}>
                Duplicate
              </Menus.Button>
              <Modal.Trigger opens={'edit-cabin'}>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Trigger>
              <Modal.Trigger opens={'delete-cabin'}>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Trigger>
            </Menus.List>

            <Modal.Content name={'edit-cabin'}>
              <CabinForm cabin={cabin} />
            </Modal.Content>
            <Modal.Content name={'delete-cabin'}>
              <ConfirmDelete resourceName={'cabins'} onConfirm={onPressDelete} disabled={isDeleting} />
            </Modal.Content>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
