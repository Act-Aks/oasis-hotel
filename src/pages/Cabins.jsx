import AddCabin from '../features/cabins/AddCabin'
import CabinTable from '../features/cabins/CabinTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

const Cabins = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  )
}

export default Cabins
