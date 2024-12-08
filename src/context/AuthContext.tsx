// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, UserDataType } from './types'
import { useMutation } from '@tanstack/react-query'
import { login, signup } from 'src/queries/auth'
import toast from 'react-hot-toast'

// ** Defaults
const AuthContext = createContext({} as AuthValuesType)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true)
      const userData = window.localStorage.getItem('user')!
      if (userData) {
        setUser(JSON.parse(userData))
        setLoading(false)
      } else {
        setLoading(false)
        localStorage.removeItem('user')
        localStorage.removeItem(authConfig.storageTokenKeyName)
        setUser(null)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = useMutation({
    mutationFn: login,
    onSuccess: data => {
      window.localStorage.setItem(authConfig.storageTokenKeyName, data.data.token)
      window.localStorage.setItem(authConfig.userData, JSON.stringify(data.data.user))
      toast.success('Login successful')
      setUser(data.data.user)
      router.push('/chat')
      setLoading(false)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? 'Someting Went Wrong')
    }
  })

  const handleRegister = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      window.localStorage.setItem(authConfig.storageTokenKeyName, data.data.token)
      window.localStorage.setItem(authConfig.userData, JSON.stringify(data.data.user))
      toast.success('Register successful')
      setLoading(false)
      setUser(data.data.user)
      router.push('/chat')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? 'Someting Went Wrong')
    }
  })

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
