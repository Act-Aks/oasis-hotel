import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { AuthHooks } from '../../hooks/auth/auth.hooks'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'

const Logout = () => {
  const { logout, isLoggingOut } = AuthHooks.useLogout()

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout
