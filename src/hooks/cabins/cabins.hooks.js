import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { QueryKeys } from '../../constants/queryKeys'
import {
  createCabin,
  deleteCabin,
  getCabins,
} from '../../services/cabinsService'

const useGetCabins = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.Cabins],
    queryFn: getCabins,
  })

  return {
    cabins: data,
    cabinsLoading: isLoading,
    cabinsError: error,
  }
}

const useCreateCabin = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cabins],
      })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    createCabin: mutate,
    isCreatingCabin: isPending,
  }
}

const useDeleteCabin = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Successfully Deleted')
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cabins],
      })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    deleteCabin: mutate,
    isDeleting: isPending,
  }
}

export const CabinHooks = {
  useDeleteCabin,
  useGetCabins,
  useCreateCabin,
}
