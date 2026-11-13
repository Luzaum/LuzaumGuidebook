import React, { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

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
  restrictedAccess?: boolean
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
  restrictedAccess = false,
}: TravelConnectSignInProps) {
  const isLogin = mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [localError, setLocalError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  const currentError = errorMessage || localError

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

  async function handleForgotPassword() {
    if (!onForgotPassword) return
    setForgotLoading(true)
    setLocalError('')
    setResetMessage('')
    try {
      const normalizedEmail = email.trim()
      if (!normalizedEmail) {
        throw new Error('Informe seu usuário ou email para recuperar a senha.')
      }
      await onForgotPassword(normalizedEmail)
      setResetMessage('Enviamos um link de recuperação para seu e-mail.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao solicitar recuperação de senha.'
      setLocalError(message)
    } finally {
      setForgotLoading(false)
    }
  }

  async function handleGoogleButton() {
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

  return (
    <div className="relative isolate min-h-dvh w-full overflow-x-hidden bg-[#081329] text-white">
      <img src="/HERO.png" alt="As três gatinhas do Vetius no jardim" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061125]/65 via-[#061125]/10 to-transparent" />
      <div className="mx-auto grid min-h-dvh w-full max-w-[1800px] items-center gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(360px,510px)_1fr] lg:px-14 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[510px] justify-self-center overflow-hidden rounded-[28px] border border-cyan-400/50 bg-[#0b1531] shadow-[0_24px_90px_rgba(0,0,0,0.4)] lg:justify-self-start"
        >
          {/* Column 2: Form */}
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full max-w-md"
            >
              <div className="mb-6">
                <div className="mb-5 flex items-center gap-3">
                  <img src="/apps/vetius-emblema.png" alt="Logo Vetius" className="h-14 w-14 rounded-xl object-contain" />
                  <span className="text-xl font-extrabold tracking-wide">Vetius</span>
                </div>
                <p className="mb-5 text-2xl font-extrabold leading-tight sm:text-3xl">Medicina Veterinária de <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Alta Precisão</span></p>
                <h1 className="text-xl font-bold">
                  {restrictedAccess ? 'Entrar no Vetius' : isLogin ? 'Bem-vindo de volta' : 'Criar conta Vetius'}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {restrictedAccess
                    ? 'Entre com sua conta para acessar as ferramentas clínicas.'
                    : isLogin
                    ? 'Entre para continuar seu trabalho clínico com segurança.'
                    : 'Crie sua conta para acessar a base clínica e os Mini-apps.'}
                </p>
              </div>

              {!restrictedAccess && onGoogleSignIn ? (
                <>
                  <div className="mb-6 flex min-h-[44px] w-full justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 w-full gap-3 rounded-lg border-slate-700 bg-white text-slate-900 hover:bg-slate-100"
                      onClick={handleGoogleButton}
                      disabled={loading || googleLoading}
                    >
                      {googleLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                          <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4h5.4a4.7 4.7 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z" />
                          <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4L15.4 17c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z" />
                          <path fill="#FBBC05" d="M6.4 13.9A6 6 0 0 1 6.1 12c0-.7.1-1.3.3-1.9V7.4H3A10 10 0 0 0 2 12c0 1.6.4 3.2 1 4.6l3.4-2.7Z" />
                          <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7C7.2 7.8 9.4 6 12 6Z" />
                        </svg>
                      )}
                      {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
                    </Button>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-[0.18em]">
                      <span className="bg-[#0b1531] px-2 text-slate-400">ou</span>
                    </div>
                  </div>
                </>
              ) : null}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor={`${mode}-email`} className="mb-1 block text-sm font-medium text-slate-300">
                    {isLogin ? 'Usuário ou e-mail' : 'E-mail'} <span className="text-blue-400">*</span>
                  </label>
                  <Input
                    id={`${mode}-email`}
                    type={isLogin ? 'text' : 'email'}
                    placeholder={isLogin ? 'ex.: usuário ou nome@gmail.com' : 'Digite seu e-mail'}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="username"
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
                      minLength={isLogin ? undefined : 6}
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
                  className="h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 justify-center"
                  disabled={loading || googleLoading || forgotLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
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

              {currentError ? <p role="alert" className="mt-4 text-sm text-red-400">{currentError}</p> : null}
              {successMessage ? <p role="status" className="mt-4 text-sm text-emerald-400">{successMessage}</p> : null}
              {resetMessage ? <p role="status" className="mt-4 text-sm text-emerald-400">{resetMessage}</p> : null}

              {restrictedAccess ? (
                <p className="mt-6 text-center text-sm text-slate-500">
                  Acesso disponível para todos os usuários cadastrados.
                </p>
              ) : <div className="mt-6 flex items-center justify-between gap-3 text-sm">
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
                    Já tem conta? <span className="font-semibold text-blue-400">Entrar</span>
                  </button>
                )}
              </div>}
            </motion.div>
          </div>
        </motion.div>
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </div>
  )
}
