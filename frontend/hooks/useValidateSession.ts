import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '../utils/supabase'

export const useValidateSession = () => {
  const { push, pathname } = useRouter()

  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      push('/dashboard')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('dashboard')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    validateSession()
  }, [])
}
