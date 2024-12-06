import { useState } from 'react'

interface UseLoadingReturnType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  toggleLoading: () => void
  setLoading: (state: boolean) => void
}

const useLoading = (initialState = false): UseLoadingReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)
  const toggleLoading = () => setIsLoading(prevState => !prevState)
  const setLoading = (state: boolean) => setIsLoading(state)

  return { isLoading, startLoading, stopLoading, toggleLoading, setLoading }
}

export default useLoading
