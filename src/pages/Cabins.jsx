import { useEffect } from 'react'
import { getCabins } from '../services/cabinsService'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Cabins() {
  useEffect(() => {
    getCabins()
  }, [])
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  )
}

export default Cabins
