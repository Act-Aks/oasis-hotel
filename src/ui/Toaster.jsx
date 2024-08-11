import { Toaster as RHTToaster } from 'react-hot-toast'

const Toaster = () => {
  return (
    <RHTToaster
      position={'top-center'}
      gutter={12}
      containerStyle={{
        margin: 8,
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
        style: {
          fontSize: 16,
          maxWidth: 500,
          padding: 16,
          paddingInline: 12,
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)',
        },
      }}
    />
  )
}

export default Toaster
