import { useState } from 'react'
import CabinForm from '../features/cabins/CabinForm'
import CabinTable from '../features/cabins/CabinTable'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

const Cabins = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm(t => !t)}>Add new cabin</Button>

        {showForm && <CabinForm />}
      </Row>
    </>
  )
}

export default Cabins
