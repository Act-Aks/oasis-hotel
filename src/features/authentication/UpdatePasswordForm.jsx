import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import styled from 'styled-components'
import { AuthHooks } from '../../hooks/auth/auth.hooks'
import SpinnerMini from '../../ui/SpinnerMini'

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState

  const { updateUser, updateUserLoading: isUpdating } = AuthHooks.useUpdateUser()

  const onSubmit = ({ password }) => {
    updateUser({ password }, { onSuccess: () => reset() })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Password (min 8 characters)' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Confirm password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value => getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' $variant='secondary' disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          <LoadingWrapper>
            {isUpdating && <SpinnerMini />}
            {'Update password'}
          </LoadingWrapper>
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
