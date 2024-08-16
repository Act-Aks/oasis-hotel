import supabase from './supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export const createCabin = async newCabin => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single()

  if (error) {
    console.log(error)
    throw new Error('Cabin could not be added')
  }

  /* Uploading the cabin image */
  if (hasImagePath) return data
  const { error: imageUploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  /* If error on cabin image upload */
  if (imageUploadError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.log(error)
    throw new Error(
      'Cabin image could not be uploaded and failed to create cabin',
    )
  }

  return data
}

export const updateCabin = async (modifiedCabin, id) => {
  const hasImagePath = modifiedCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${modifiedCabin.image.name}`.replace(
    '/',
    '',
  )
  const imagePath = hasImagePath
    ? modifiedCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...modifiedCabin, image: imagePath })
    .eq('id', id)

  if (error) {
    console.log(error)
    throw new Error('Cabin could not be updated')
  }

  /* Uploading the cabin image */
  if (hasImagePath) return data
  const { error: imageUploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, modifiedCabin.image)

  /* If error on cabin image upload */
  if (imageUploadError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.log(error)
    throw new Error(
      'Cabin image could not be uploaded and failed to update cabin',
    )
  }

  return data
}

export const deleteCabin = async cabinId => {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)

  if (error) {
    console.log(error)
    throw new Error(`Cabin with id ${cabinId} could not be delete`)
  }

  return data
}
