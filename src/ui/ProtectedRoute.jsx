import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import routes from '../constants/routes'
import { AuthHooks } from '../hooks/auth/auth.hooks'
import Spinner from './Spinner'

const Page = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { isUserLoading, isAuthenticated } = AuthHooks.useUser()

  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) {
      navigate(`/${routes.Login}`)
    }
  }, [isAuthenticated, isUserLoading, navigate])

  if (isUserLoading) {
    return (
      <Page>
        <Spinner />
      </Page>
    )
  }

  if (isAuthenticated) return children
}

export default ProtectedRoute
