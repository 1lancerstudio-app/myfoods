import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LS_KEYS, normalizePhone, readJson, writeJson } from '@/lib/storage'

type AuthState = {
  verifiedPhone: string | null
  setVerifiedPhone: (phone: string) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [verifiedPhone, setVerifiedPhoneState] = useState<string | null>(() => {
    const raw = readJson<{ phone: string } | null>(LS_KEYS.auth, null)
    return raw?.phone ? normalizePhone(raw.phone) : null
  })

  useEffect(() => {
    if (verifiedPhone) writeJson(LS_KEYS.auth, { phone: verifiedPhone })
    else localStorage.removeItem(LS_KEYS.auth)
  }, [verifiedPhone])

  const setVerifiedPhone = useCallback((phone: string) => {
    setVerifiedPhoneState(normalizePhone(phone) || null)
  }, [])

  const clearAuth = useCallback(() => {
    setVerifiedPhoneState(null)
  }, [])

  const value = useMemo(
    () => ({ verifiedPhone, setVerifiedPhone, clearAuth }),
    [verifiedPhone, setVerifiedPhone, clearAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
