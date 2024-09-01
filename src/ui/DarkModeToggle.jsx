import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkMode } from '../context/darkModeContext'
import ButtonIcon from './ButtonIcon'

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return <ButtonIcon onClick={toggleDarkMode}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>
}

export default DarkModeToggle
