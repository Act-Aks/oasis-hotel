import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { QueryKeys } from '../../constants/queryKeys'
import routes from '../../constants/routes'
import { getCurrentUser, login, logout } from '../../services/authService'

const useLogin = ({ onSuccess, onError } = {}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      navigate(`/${routes.Dashboard}`)
      queryClient.setQueriesData([QueryKeys.User], data?.user)
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    login: mutate,
    isLoggingIn: isPending,
    loginError: error,
  }
}

const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.User],
    queryFn: getCurrentUser,
  })

  return {
    user: data,
    isUserLoading: isLoading,
    userError: error,
    isAuthenticated: data?.role === 'authenticated',
  }
}

const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries()
      navigate(`/${routes.Login}`, { replace: true })
    },
  })

  return {
    logout: mutate,
    isLoggingOut: isPending,
    logoutError: error,
  }
}

export const AuthHooks = {
  useLogin,
  useLogout,
  useUser,
}
