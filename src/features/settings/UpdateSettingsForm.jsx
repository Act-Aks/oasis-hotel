import { SettingsHooks } from '../../hooks/settings/settings.hooks'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'

const UpdateSettingsForm = () => {
  const { settings, isSettingsLoading } = SettingsHooks.useGetSettings()
  const { updateSettings, isUpdatingSettings } = SettingsHooks.useUpdateSettings({})

  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings

  const handleSettingsUpdate = (event, fieldName) => {
    const value = event.target.value
    const hasNoChange = !value || settings[fieldName].toString() === value

    if (hasNoChange) return

    updateSettings({ [fieldName]: value })
  }

  if (isSettingsLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdatingSettings}
          onBlur={e => handleSettingsUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdatingSettings}
          onBlur={e => handleSettingsUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdatingSettings}
          onBlur={e => handleSettingsUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdatingSettings}
          onBlur={e => handleSettingsUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
