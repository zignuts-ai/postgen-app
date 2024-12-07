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
// const defaultProvider: AuthValuesType = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   register: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

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

  console.log('user', user)

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const userData = window.localStorage.getItem('user')!
      if (userData) {
        setLoading(true)

        setLoading(false)
        setUser(JSON.parse(userData))

        // })
        // .catch(() => {
        //   localStorage.removeItem('userData')
        //   localStorage.removeItem('refreshToken')
        //   localStorage.removeItem('accessToken')
        //   setUser(null)
        //   setLoading(false)
        //   if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //     router.replace('/login')
        //   }
        // })
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

    // If the mutation fails, the error is caught and returned.
    onSuccess: data => {
      window.localStorage.setItem(authConfig.storageTokenKeyName, JSON.stringify(data.data.token))
      window.localStorage.setItem(authConfig.userData, JSON.stringify(data.data.user))
      toast.success('Login successful')
      setLoading(false)
      setUser(data.data.user)
      router.push('/history')
    },
    onError: (err: any) => {
      console.log({ err })

      // toast.error(formatErrorMessage(err.response?.data?.error_message?.details[0]) || 'Login failed')
    }
  })

  const handleRegister = useMutation({
    mutationFn: signup,

    // If the mutation fails, the error is caught and returned.
    onSuccess: data => {
      // localStorage.setItem('userData', JSON.stringify(data?.user))
      // Cookies.set(REFRESH_TOKEN_KEY, data.refresh, { expires: 30 })
      // Cookies.set(ACCESS_TOKEN_KEY, data.token)
      window.localStorage.setItem(authConfig.storageTokenKeyName, JSON.stringify(data.data.token))
      window.localStorage.setItem(authConfig.userData, JSON.stringify(data.data.user))
      toast.success('Register successful')
      setLoading(false)
      setUser(data.data.user)
      router.push('/history')
    },
    onError: (err: any) => {
      console.log({ err })

      // toast.error(formatErrorMessage(err.response?.data?.error_message?.details[0]) || 'Login failed')
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
