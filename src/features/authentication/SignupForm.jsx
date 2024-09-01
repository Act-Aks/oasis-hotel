import { useForm } from 'react-hook-form'
import { AuthHooks } from '../../hooks/auth/auth.hooks'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

// Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
  const { signUp, signUpLoading } = AuthHooks.useSignUp()
  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState

  const onSubmit = ({ passwordConfirm, ...signUpInput }) => {
    signUp(signUpInput, {
      onSettled: () => reset(),
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', { required: 'Full name is required' })}
          disabled={signUpLoading}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Please provide valid email' },
          })}
          disabled={signUpLoading}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password should have minimum of 8 characters' },
          })}
          disabled={signUpLoading}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            validate: value => getValues().password === value || 'Password does not match',
          })}
          disabled={signUpLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variant='secondary' type='reset' disabled={signUpLoading}>
          Cancel
        </Button>
        <Button disabled={signUpLoading}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
