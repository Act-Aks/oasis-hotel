import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CabinForm from './CabinForm'

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Trigger opens={'cabin-form'}>
        <Button>Add new cabin</Button>
      </Modal.Trigger>
      <Modal.Content name={'cabin-form'}>
        <CabinForm />
      </Modal.Content>
    </Modal>
  )
}

export default AddCabin
