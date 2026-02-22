import React, { useMemo, useState, useEffect } from 'react'
import { ArrowRight, Eye, EyeOff, Loader2, PawPrint } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        size === 'default' && 'h-10 px-4 py-2',
        size === 'sm' && 'h-9 px-3',
        size === 'lg' && 'h-11 px-8',
        variant === 'outline' && 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800',
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

type DogSlide = {
  id: string
  src: string
  alt: string
  title: string
  subtitle: string
}

export const DOG_SLIDES_4K: DogSlide[] = [
  {
    id: 'dog-slide-1',
    src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=3840&q=80',
    alt: 'Golden retriever sorrindo ao ar livre',
    title: 'Acesso seguro em qualquer plantão',
    subtitle: 'Seus dados clínicos ficam protegidos e sincronizados na nuvem.',
  },
  {
    id: 'dog-slide-2',
    src: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=3840&q=80',
    alt: 'Filhote de cachorro observando a câmera',
    title: 'Continue de onde parou',
    subtitle: 'Abra o Vetius no celular ou computador e retome seu trabalho.',
  },
  {
    id: 'dog-slide-3',
    src: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=3840&q=80',
    alt: 'Cachorro correndo em campo aberto',
    title: 'Fluxo intuitivo para a rotina clínica',
    subtitle: 'Entrar, acessar módulos e manter tudo organizado em poucos cliques.',
  },
  {
    id: 'dog-slide-4',
    src: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=3840&q=80',
    alt: 'Cachorro deitado com expressão tranquila',
    title: 'Perfil sempre disponível',
    subtitle: 'Suas preferências e dados da conta acompanham você em todos os módulos.',
  },
]

type TravelConnectSignInProps = {
  loading?: boolean
  errorMessage?: string
  onSubmit: (payload: { email: string; password: string }) => Promise<void> | void
  onGoogleSignIn?: () => Promise<void> | void
  onForgotPassword?: (email: string) => Promise<void> | void
  onGoToSignup?: () => void
}

export default function TravelConnectSignIn({
  loading = false,
  errorMessage = '',
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
  onGoToSignup,
}: TravelConnectSignInProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [localError, setLocalError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const currentError = errorMessage || localError

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DOG_SLIDES_4K.length)
    }, 5500)

    return () => window.clearInterval(timer)
  }, [])

  const active = useMemo(() => DOG_SLIDES_4K[activeSlide], [activeSlide])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLocalError('')
    setResetMessage('')

    try {
      await onSubmit({ email: email.trim(), password })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao entrar.'
      setLocalError(message)
    }
  }

  async function handleGoogleSignIn() {
    if (!onGoogleSignIn) return
    setGoogleLoading(true)
    setLocalError('')
    setResetMessage('')
    try {
      await onGoogleSignIn()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao entrar com Google.'
      setLocalError(message)
    } finally {
      setGoogleLoading(false)
    }
  }

  async function handleForgotPassword() {
    if (!onForgotPassword) return
    setForgotLoading(true)
    setLocalError('')
    setResetMessage('')
    try {
      const normalizedEmail = email.trim()
      if (!normalizedEmail) {
        throw new Error('Informe seu email para recuperar a senha.')
      }
      await onForgotPassword(normalizedEmail)
      setResetMessage('Enviamos um link de recuperação para seu email.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao solicitar recuperação de senha.'
      setLocalError(message)
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#090b13] text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:grid-cols-2"
        >
          <div className="relative hidden h-[640px] overflow-hidden border-r border-slate-800 md:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.src}
                alt={active.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0.25, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.25, scale: 0.98 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/35 to-[#020617]/30" />

            <div className="absolute bottom-0 left-0 right-0 z-10 space-y-4 p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
                <PawPrint className="h-3.5 w-3.5" />
                VETIUS CLOUD
              </div>

              <div>
                <h2 className="text-2xl font-bold leading-tight">{active.title}</h2>
                <p className="mt-2 max-w-md text-sm text-slate-200">{active.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                {DOG_SLIDES_4K.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Ir para slide ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      activeSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/45 hover:bg-white/70'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-[640px] flex-col justify-center p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full max-w-md"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
                <p className="mt-2 text-sm text-slate-400">
                  Entre para continuar seu trabalho clínico com segurança.
                </p>
              </div>

              <div className="mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-lg border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  onClick={handleGoogleSignIn}
                  disabled={!onGoogleSignIn || googleLoading || loading}
                >
                  {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  <span>{googleLoading ? 'Conectando...' : 'Entrar com Google'}</span>
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-[0.18em]">
                  <span className="bg-[#090b13] px-2 text-slate-400">ou</span>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-300">
                    Email <span className="text-blue-400">*</span>
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seuemail@clinica.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-300">
                    Senha <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-200"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                      aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {currentError ? <p className="mt-4 text-sm text-red-400">{currentError}</p> : null}
              {resetMessage ? <p className="mt-4 text-sm text-emerald-400">{resetMessage}</p> : null}

              <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={!onForgotPassword || forgotLoading}
                  className="text-blue-400 transition-colors hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {forgotLoading ? 'Enviando...' : 'Esqueceu sua senha?'}
                </button>

                <button
                  type="button"
                  onClick={onGoToSignup}
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  Não tem conta? <span className="font-semibold text-blue-400">Criar conta</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
