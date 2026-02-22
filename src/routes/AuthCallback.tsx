import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AuthCallback() {
  const nav = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        nav('/app')
      } else {
        nav('/login')
      }
    })
  }, [nav])

  return <div className="p-6">Finalizando autenticacao...</div>
}
