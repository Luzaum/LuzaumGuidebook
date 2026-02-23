import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Eye, EyeOff, Loader2 } from 'lucide-react'
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

type AuthSlide = {
  id: string
  src: string
  alt: string
  title: string
  subtitle: string
}

export const AUTH_SLIDES_4K: AuthSlide[] = [
  {
    id: 'slide-01',
    src: '/images/auth/jadevermelho.jpg',
    alt: 'Dog portrait with warm light',
    title: 'Acesso seguro em qualquer plantão',
    subtitle: 'Seus dados clínicos ficam protegidos e sincronizados na nuvem.',
  },
  {
    id: 'slide-02',
    src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=3840&q=80',
    alt: 'Happy golden retriever',
    title: 'Continue de onde parou',
    subtitle: 'Abra o Vetius em qualquer dispositivo e retome seu trabalho.',
  },
  {
    id: 'slide-03',
    src: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=3840&q=80',
    alt: 'Curious puppy in close-up',
    title: 'Conta única para todos os módulos',
    subtitle: 'Seu perfil acompanha você em toda a plataforma.',
  },
  {
    id: 'slide-04',
    src: '/images/auth/whisk.png',
    alt: 'Dog running in open field',
    title: 'Fluxo rápido e intuitivo',
    subtitle: 'Menos cliques para emitir receitas com qualidade.',
  },
  {
    id: 'slide-05',
    src: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog resting calmly',
    title: 'Nuvem para nunca perder dados',
    subtitle: 'Tudo salvo com confiabilidade para sua rotina clínica.',
  },
  {
    id: 'slide-06',
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog face outdoors',
    title: 'Escala com segurança',
    subtitle: 'Base pronta para clínicas, equipes e crescimento.',
  },
  {
    id: 'slide-07',
    src: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog lying on grass',
    title: 'Experiência premium',
    subtitle: 'Interface moderna para usar com foco total no paciente.',
  },
  {
    id: 'slide-08',
    src: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog by the sea',
    title: 'Autenticação prática',
    subtitle: 'Entrar com e-mail ou Google em segundos.',
  },
  {
    id: 'slide-09',
    src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog portrait in city light',
    title: 'Padrão profissional',
    subtitle: 'Tudo preparado para uso clínico diário.',
  },
  {
    id: 'slide-10',
    src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=3840&q=80',
    alt: 'Dog and owner outdoors',
    title: 'Pronto para atender melhor',
    subtitle: 'Login e cadastro com transições fluidas e confiáveis.',
  },
]

type AuthMode = 'login' | 'signup'

type TravelConnectSignInProps = {
  mode?: AuthMode
  loading?: boolean
  errorMessage?: string
  successMessage?: string
  onSubmit: (payload: { email: string; password: string }) => Promise<void> | void
  onGoogleSignIn?: () => Promise<void> | void
  onForgotPassword?: (email: string) => Promise<void> | void
  onGoToSignup?: () => void
  onGoToLogin?: () => void
  onBackToVetius?: () => void
}

const slideMotionVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 64 : -64,
    scale: 1.04,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -64 : 64,
    scale: 0.98,
  }),
}

export default function TravelConnectSignIn({
  mode = 'login',
  loading = false,
  errorMessage = '',
  successMessage = '',
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
  onGoToSignup,
  onGoToLogin,
  onBackToVetius,
}: TravelConnectSignInProps) {
  const isLogin = mode === 'login'
  const [activeSlide, setActiveSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [localError, setLocalError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const slideCount = AUTH_SLIDES_4K.length
  const currentError = errorMessage || localError
  const active = useMemo(() => AUTH_SLIDES_4K[activeSlide], [activeSlide])

  const paginateSlide = useCallback(
    (direction: 1 | -1) => {
      if (slideCount <= 1) return
      setSlideDirection(direction)
      setActiveSlide((prev) => (prev + direction + slideCount) % slideCount)
    },
    [slideCount]
  )

  useEffect(() => {
    if (slideCount <= 1) return
    const timer = window.setInterval(() => paginateSlide(1), 6500)
    return () => window.clearInterval(timer)
  }, [paginateSlide, slideCount])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLocalError('')
    setResetMessage('')

    try {
      await onSubmit({ email: email.trim(), password })
    } catch (error) {
      const message = error instanceof Error ? error.message : isLogin ? 'Falha ao entrar.' : 'Falha ao criar conta.'
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
      const message = error instanceof Error ? error.message : 'Falha ao autenticar com Google.'
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
      setResetMessage('Enviamos um link de recuperacao para seu email.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao solicitar recuperacao de senha.'
      setLocalError(message)
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4">
        <button
          type="button"
          onClick={onBackToVetius}
          className="inline-flex h-10 items-center justify-center rounded-full border border-slate-400/40 bg-slate-900/60 px-5 text-sm font-semibold text-slate-100 backdrop-blur-xl transition hover:border-[#72ff58]/55 hover:bg-slate-900/75"
        >
          Voltar para Vetius
        </button>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#090b13] text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:grid-cols-2"
        >
          <div className="relative hidden h-[640px] overflow-hidden border-r border-slate-800 md:block">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.img
                key={active.id}
                src={active.src}
                alt={active.alt}
                className="absolute inset-0 h-full w-full object-cover"
                variants={slideMotionVariants}
                custom={slideDirection}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/35 to-[#020617]/28" />

            {slideCount > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Foto anterior"
                  onClick={() => paginateSlide(-1)}
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/35 bg-white/14 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-white/22"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Proxima foto"
                  onClick={() => paginateSlide(1)}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/35 bg-white/14 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-white/22"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-0 left-0 right-0 z-10 space-y-4 p-8">
              <div>
                <h2 className="text-2xl font-bold leading-tight">{active.title}</h2>
                <p className="mt-2 max-w-md text-sm text-slate-200">{active.subtitle}</p>
              </div>

              {slideCount > 1 ? (
                <div className="flex items-center gap-2">
                  {AUTH_SLIDES_4K.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Ir para foto ${index + 1}`}
                      onClick={() => {
                        setSlideDirection(index > activeSlide ? 1 : -1)
                        setActiveSlide(index)
                      }}
                      className={cn(
                        'h-2 rounded-full transition-all',
                        activeSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/45 hover:bg-white/70'
                      )}
                    />
                  ))}
                </div>
              ) : null}
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
                <h1 className="text-3xl font-bold">{isLogin ? 'Bem-vindo de volta' : 'Criar conta Vetius'}</h1>
                <p className="mt-2 text-sm text-slate-400">
                  {isLogin
                    ? 'Entre para continuar seu trabalho clínico com segurança.'
                    : 'Cadastre sua conta para salvar seu trabalho na nuvem.'}
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
                  <span>{googleLoading ? 'Conectando...' : isLogin ? 'Entrar com Google' : 'Criar conta com Google'}</span>
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
                  <label htmlFor={`${mode}-email`} className="mb-1 block text-sm font-medium text-slate-300">
                    Email <span className="text-blue-400">*</span>
                  </label>
                  <Input
                    id={`${mode}-email`}
                    type="email"
                    placeholder="seuemail@clínica.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor={`${mode}-password`} className="mb-1 block text-sm font-medium text-slate-300">
                    Senha <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id={`${mode}-password`}
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
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
                      {isLogin ? 'Entrando...' : 'Criando conta...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Entrar' : 'Criar conta'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {currentError ? <p className="mt-4 text-sm text-red-400">{currentError}</p> : null}
              {successMessage ? <p className="mt-4 text-sm text-emerald-400">{successMessage}</p> : null}
              {resetMessage ? <p className="mt-4 text-sm text-emerald-400">{resetMessage}</p> : null}

              <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                {isLogin ? (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={!onForgotPassword || forgotLoading}
                    className="text-blue-400 transition-colors hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {forgotLoading ? 'Enviando...' : 'Esqueceu sua senha?'}
                  </button>
                ) : (
                  <span className="text-slate-500">Cadastro rápido e seguro</span>
                )}

                {isLogin ? (
                  <button
                    type="button"
                    onClick={onGoToSignup}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    Não tem conta? <span className="font-semibold text-blue-400">Criar conta</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onGoToLogin}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    Ja tem conta? <span className="font-semibold text-blue-400">Entrar</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
