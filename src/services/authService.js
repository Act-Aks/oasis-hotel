import supabase from './supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)

  return data.user
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export const signUp = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: '',
        fullName,
      },
    },
  })
  if (error) throw new Error(error.message)

  return data
}

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  let updateUserData = {}

  if (password) updateUserData = { password }
  if (fullName) updateUserData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateUserData)
  if (error) throw new Error(error.message)

  if (!avatar) return data

  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const { error: avatarError } = await supabase.storage.from('avatars').upload(fileName, avatar)
  if (avatarError) throw new Error(avatarError.message)

  const { data: updatedUser, error: updateUserError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  })
  if (updateUserError) throw new Error(updateUserError.message)

  return updatedUser
}
