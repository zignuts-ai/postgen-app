import React from 'react'
import { Avatar as MUIAvatar, AvatarProps as MUIAvatarProps, AvatarGroup } from '@mui/material'

// Avatar component
export const Avatar = React.forwardRef<HTMLDivElement, MUIAvatarProps>(({ children, ...props }, ref) => (
  <MUIAvatar ref={ref} {...props}>
    {children}
  </MUIAvatar>
))

Avatar.displayName = 'Avatar'

// AvatarImage component (uses src prop of MUI Avatar)
export const AvatarImage = ({ src, alt, ...props }: any) => <Avatar src={src} alt={alt} {...props} />
AvatarImage.displayName = 'AvatarImage'

// AvatarFallback component
export const AvatarFallback = ({ children, ...props }: any) => <Avatar {...props}>{children}</Avatar>
AvatarFallback.displayName = 'AvatarFallback'

// Optional: AvatarGroup for grouping avatars
export { AvatarGroup }

// Example usage
export const AvatarExample = () => <Avatar alt='Profile Picture' src='/path/to/image.jpg' />
