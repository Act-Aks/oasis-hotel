import { createContext, useCallback, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => setIsDarkMode(isDark => !isDark), [setIsDarkMode])

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

const useDarkMode = () => {
  const darkModeContext = useContext(DarkModeContext)

  if (!darkModeContext) throw new Error('DarkModeContext is used outside of DarkModeProvider')

  return darkModeContext
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode }
