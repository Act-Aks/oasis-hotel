import { useEffect, useRef } from 'react'

const useOutsideClickHandler = ({ handler, listenToCapturing = true }) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler?.()
      }
    }

    document.addEventListener('click', handleClick, listenToCapturing)

    return () => {
      document.removeEventListener('click', handleClick, listenToCapturing)
    }
  }, [handler, listenToCapturing])

  return {
    ref,
  }
}

export default useOutsideClickHandler
