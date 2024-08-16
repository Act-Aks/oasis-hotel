import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { QueryKeys } from '../../constants/queryKeys'
import { getSettings, updateSetting } from '../../services/settingsService'

const useGetSettings = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: getSettings,
    queryKey: [QueryKeys.Settings],
  })

  return {
    settings: data || {},
    settingsError: error,
    isSettingsLoading: isLoading,
  }
}

const useUpdateSettings = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings successfully updated')
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Settings],
      })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.message)
      onError?.()
    },
  })

  return {
    updateSettings: mutate,
    isUpdatingSettings: isPending,
  }
}

export const SettingsHooks = {
  useGetSettings,
  useUpdateSettings,
}
