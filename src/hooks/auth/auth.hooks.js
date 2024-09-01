import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { QueryKeys } from '../../constants/queryKeys'
import routes from '../../constants/routes'
import { getCurrentUser, login, logout, signUp, updateCurrentUser } from '../../services/authService'

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

const useSignUp = ({ onSuccess, onError } = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      toast.success(`Account successfully created!. Please verify your new account's email`)
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    signUp: mutate,
    signUpLoading: isPending,
    signUpError: error,
  }
}

const useUpdateUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User account successfully updated')
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    updateUser: mutate,
    updateUserLoading: isPending,
    updateUserError: error,
  }
}

export const AuthHooks = {
  useLogin,
  useLogout,
  useUser,
  useSignUp,
  useUpdateUser,
}
