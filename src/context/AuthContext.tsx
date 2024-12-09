// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, UserDataType } from './types'
import { useMutation } from '@tanstack/react-query'
import { login, logout, signup } from 'src/queries/auth'
import toast from 'react-hot-toast'
import { formatMessage } from 'src/utils/utils'
import { ACCESS_TOKEN_KEY, USER_DATA_KEY } from 'src/constants/constant'

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
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        setUser(null)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = useMutation({
    mutationFn: login,
    onSuccess: data => {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, data.data.token)
      window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user))
      toast.success('Login successful')
      setUser(data.data.user)
      router.push('/chat')
      setLoading(false)
    },
    onError: (err: any) => {
      toast.error(formatMessage(err.response?.data?.message) ?? 'Someting Went Wrong')
    }
  })

  const handleRegister = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, data.data.token)
      window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.data.user))
      toast.success('Register successful')
      setLoading(false)
      setUser(data.data.user)
      router.push('/chat')
    },
    onError: (err: any) => {
      toast.error(formatMessage(err.response?.data?.message) ?? 'Someting Went Wrong')
    }
  })

  const handleLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(USER_DATA_KEY)
      setUser(null)
      setLoading(false)
      toast.success('Logout Successfully')
      router.push('/')
    },
    onError: (err: any) => {
      toast.error(formatMessage(err.response?.data?.message) ?? 'Something Went Wrong')
    }
  })

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
