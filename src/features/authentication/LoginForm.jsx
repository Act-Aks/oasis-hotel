import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import routes from '../../constants/routes'
import { AuthHooks } from '../../hooks/auth/auth.hooks'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'

const LoginForm = () => {
  const [email, setEmail] = useState('aks@aks.com')
  const [password, setPassword] = useState('aks@123')

  const { login, isLoggingIn } = AuthHooks.useLogin()
  const { isAuthenticated } = AuthHooks.useUser()

  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password) return

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }

  if (isAuthenticated && !isLoggingIn) {
    return <Navigate to={`/${routes.Dashboard}`} replace />
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRow>
      <FormRow label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRow>
      <FormRow>
        <Button size='large' disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default LoginForm
