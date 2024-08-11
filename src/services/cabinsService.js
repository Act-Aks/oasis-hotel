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
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.log(error)
    throw new Error('Cabin could not be added')
  }

  /* Uploading the cabin image */
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
