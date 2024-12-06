import { useState } from 'react'

interface UseModalReturnType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
  setModal: (state: boolean) => void
}

const useModal = (initialState = false): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const toggleModal = () => setIsOpen(prevState => !prevState)
  const setModal = (state: boolean) => setIsOpen(state)

  return { isOpen, openModal, closeModal, toggleModal, setModal }
}

export default useModal
