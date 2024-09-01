import { useState } from 'react'

import styled from 'styled-components'
import { AuthHooks } from '../../hooks/auth/auth.hooks'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const UpdateUserDataForm = () => {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = AuthHooks.useUser()
  const { updateUser, updateUserLoading } = AuthHooks.useUpdateUser()

  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    if (!fullName || fullName === currentFullName) return
    updateUser(
      { fullName, avatar },
      {
        onSettled: () => {
          setAvatar(null)
          e.target.reset()
        },
      },
    )
  }

  const handleCancel = () => {
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          id='fullName'
          disabled={updateUserLoading}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={e => setAvatar(e.target.files[0])}
          disabled={updateUserLoading}
        />
      </FormRow>
      <FormRow>
        <Button type='reset' $variant='secondary' disabled={updateUserLoading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={updateUserLoading}>
          <LoadingWrapper>
            {updateUserLoading && <SpinnerMini />}
            {'Update account'}
          </LoadingWrapper>
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
