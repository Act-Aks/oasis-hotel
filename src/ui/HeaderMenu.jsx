import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../constants/routes'
import Logout from '../features/authentication/Logout'
import ButtonIcon from './ButtonIcon'
import DarkModeToggle from './DarkModeToggle'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

const HeaderMenu = () => {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate(routes.Account)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
