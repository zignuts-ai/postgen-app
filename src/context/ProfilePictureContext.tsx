import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

// Define the context type
interface ProfilePictureContextType {
  imgSrc: string
  setImgSrc: (src: string) => void
}

// Create the context
const ProfilePictureContext = createContext<ProfilePictureContextType | undefined>(undefined)

// Provider component
export const ProfilePictureProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [imgSrc, setImgSrc] = useState<string>(
    `https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`
  )

  useEffect(() => {
    setImgSrc(`https://avatar.vercel.sh/rauchg.svg?text=${user?.name?.slice(0, 2)?.toUpperCase()}`)
  }, [user])

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
