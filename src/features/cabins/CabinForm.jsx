import { useForm } from 'react-hook-form'
import { CabinHooks } from '../../hooks/cabins/cabins.hooks'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'

const CabinForm = ({ cabin = {} }) => {
  const { id: cabinId, ...cabinValues } = cabin
  const isEditMode = Boolean(cabinId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditMode ? cabinValues : {} })
  const { createCabin, isCreatingCabin } = CabinHooks.useCreateCabin({
    onSuccess: () => reset(),
  })

  const onSubmit = data => createCabin({ ...data, image: data.image[0] })
  const onError = errors => {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreatingCabin}
          {...register('name', { required: 'Name is required' })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreatingCabin}
          {...register('maxCapacity', {
            required: 'Maximum capacity is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreatingCabin}
          {...register('regularPrice', {
            required: 'Regular price is required',
            min: {
              value: 1,
              message: 'Price should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreatingCabin}
          {...register('discount', {
            required: 'Discount is required',
            validate: value =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreatingCabin}
          {...register('description', { required: 'Description is required' })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isCreatingCabin}
          {...register('image', { required: 'Image is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant='secondary' type='reset' disabled={isCreatingCabin}>
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>
          {isEditMode ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CabinForm
