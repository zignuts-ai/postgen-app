import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the context type
interface ProfilePictureContextType {
  imgSrc: string
  setImgSrc: (src: string) => void
}

// Create the context
const ProfilePictureContext = createContext<ProfilePictureContextType | undefined>(undefined)

// Provider component
export const ProfilePictureProvider = ({ children }: { children: ReactNode }) => {
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  return <ProfilePictureContext.Provider value={{ imgSrc, setImgSrc }}>{children}</ProfilePictureContext.Provider>
}

// Hook to use the ProfilePictureContext
export const useProfilePicture = () => {
  const context = useContext(ProfilePictureContext)
  if (!context) {
    throw new Error('useProfilePicture must be used within a ProfilePictureProvider')
  }

  return context
}
