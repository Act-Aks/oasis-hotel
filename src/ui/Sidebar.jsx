import { Link } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../constants/routes'
import Uploader from '../data/Uploader'
import Logo from './Logo'
import MainNav from './MainNav'

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`
const Sidebar = () => {
  return (
    <StyledSidebar>
      <Link to={`/${routes.Dashboard}`}>
        <Logo />
      </Link>
      <MainNav />
      <Uploader />
    </StyledSidebar>
  )
}

export default Sidebar
