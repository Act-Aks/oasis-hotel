import { Children } from 'react'

const List = ({ of, render }) => Children.toArray(of.map(render))

export default List
