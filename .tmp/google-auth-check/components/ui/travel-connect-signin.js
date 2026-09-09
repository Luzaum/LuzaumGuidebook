// components/ui/travel-connect-signin.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var cn = (...classes) => classes.filter(Boolean).join(" ");
var Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 px-3",
        size === "lg" && "h-11 px-8",
        variant === "outline" && "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800",
        className
      ),
      ...props
    }
  );
});
Button.displayName = "Button";
var Input = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        className: cn(
          "flex h-11 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var AUTH_SLIDES_4K = [
  {
    id: "slide-01",
    src: "/images/auth/jadevermelho.jpg",
    alt: "Dog portrait with warm light",
    title: "Acesso seguro em qualquer plant\xE3o",
    subtitle: "Seus dados cl\xEDnicos ficam protegidos e sincronizados na nuvem."
  },
  {
    id: "slide-02",
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=3840&q=80",
    alt: "Happy golden retriever",
    title: "Continue de onde parou",
    subtitle: "Abra o Vetius em qualquer dispositivo e retome seu trabalho."
  },
  {
    id: "slide-03",
    src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=3840&q=80",
    alt: "Curious puppy in close-up",
    title: "Conta \xFAnica para todos os m\xF3dulos",
    subtitle: "Seu perfil acompanha voc\xEA em toda a plataforma."
  },
  {
    id: "slide-04",
    src: "/images/auth/whisk.png",
    alt: "Dog running in open field",
    title: "Fluxo r\xE1pido e intuitivo",
    subtitle: "Menos cliques para emitir receitas com qualidade."
  },
  {
    id: "slide-05",
    src: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog resting calmly",
    title: "Nuvem para nunca perder dados",
    subtitle: "Tudo salvo com confiabilidade para sua rotina cl\xEDnica."
  },
  {
    id: "slide-06",
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog face outdoors",
    title: "Escala com seguran\xE7a",
    subtitle: "Base pronta para cl\xEDnicas, equipes e crescimento."
  },
  {
    id: "slide-07",
    src: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog lying on grass",
    title: "Experi\xEAncia premium",
    subtitle: "Interface moderna para usar com foco total no paciente."
  },
  {
    id: "slide-08",
    src: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog by the sea",
    title: "Autentica\xE7\xE3o pr\xE1tica",
    subtitle: "Entrar com e-mail ou Google em segundos."
  },
  {
    id: "slide-09",
    src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog portrait in city light",
    title: "Padr\xE3o profissional",
    subtitle: "Tudo preparado para uso cl\xEDnico di\xE1rio."
  },
  {
    id: "slide-10",
    src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=3840&q=80",
    alt: "Dog and owner outdoors",
    title: "Pronto para atender melhor",
    subtitle: "Login e cadastro com transi\xE7\xF5es fluidas e confi\xE1veis."
  }
];
var slideMotionVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 64 : -64,
    scale: 1.04
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -64 : 64,
    scale: 0.98
  })
};
function TravelConnectSignIn({
  mode = "login",
  loading = false,
  errorMessage = "",
  successMessage = "",
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
  onGoToSignup,
  onGoToLogin,
  onBackToVetius,
  restrictedAccess = false
}) {
  const isLogin = mode === "login";
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [localError, setLocalError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const slideCount = AUTH_SLIDES_4K.length;
  const currentError = errorMessage || localError;
  const active = useMemo(() => AUTH_SLIDES_4K[activeSlide], [activeSlide]);
  const paginateSlide = useCallback(
    (direction) => {
      if (slideCount <= 1) return;
      setSlideDirection(direction);
      setActiveSlide((prev) => (prev + direction + slideCount) % slideCount);
    },
    [slideCount]
  );
  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => paginateSlide(1), 6500);
    return () => window.clearInterval(timer);
  }, [paginateSlide, slideCount]);
  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");
    setResetMessage("");
    try {
      await onSubmit({ email: email.trim(), password });
    } catch (error) {
      const message = error instanceof Error ? error.message : isLogin ? "Falha ao entrar." : "Falha ao criar conta.";
      setLocalError(message);
    }
  }
  async function handleForgotPassword() {
    if (!onForgotPassword) return;
    setForgotLoading(true);
    setLocalError("");
    setResetMessage("");
    try {
      const normalizedEmail = email.trim();
      if (!normalizedEmail) {
        throw new Error("Informe seu usu\xE1rio ou email para recuperar a senha.");
      }
      await onForgotPassword(normalizedEmail);
      setResetMessage("Enviamos um link de recuperacao para seu email.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao solicitar recuperacao de senha.";
      setLocalError(message);
    } finally {
      setForgotLoading(false);
    }
  }
  async function handleGoogleButton() {
    if (!onGoogleSignIn) return;
    setGoogleLoading(true);
    setLocalError("");
    setResetMessage("");
    try {
      await onGoogleSignIn();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao autenticar com Google.";
      setLocalError(message);
    } finally {
      setGoogleLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full bg-gradient-to-br from-[#060818] via-[#0b1024] to-[#0d1a2e] p-4 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onBackToVetius,
        className: "inline-flex h-10 items-center justify-center rounded-full border border-slate-400/40 bg-slate-900/60 px-5 text-sm font-semibold text-slate-100 backdrop-blur-xl transition hover:border-[#72ff58]/55 hover:bg-slate-900/75",
        children: "Voltar para Vetius"
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        className: "grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#090b13] text-white shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:grid-cols-2",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative hidden h-[640px] overflow-hidden border-r border-slate-800 md:block", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", custom: slideDirection, children: /* @__PURE__ */ jsx(
              motion.img,
              {
                src: active.src,
                alt: active.alt,
                className: "absolute inset-0 h-full w-full object-cover",
                variants: slideMotionVariants,
                custom: slideDirection,
                initial: "enter",
                animate: "center",
                exit: "exit",
                transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
              },
              active.id
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/35 to-[#020617]/28" }),
            slideCount > 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Foto anterior",
                  onClick: () => paginateSlide(-1),
                  className: "absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/35 bg-white/14 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-white/22",
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Proxima foto",
                  onClick: () => paginateSlide(1),
                  className: "absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/35 bg-white/14 p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-white/22",
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 z-10 space-y-4 p-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold leading-tight", children: active.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-md text-sm text-slate-200", children: active.subtitle })
              ] }),
              slideCount > 1 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1.5", children: AUTH_SLIDES_4K.map((slide, index) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Ir para foto ${index + 1}`,
                  "aria-current": activeSlide === index ? "true" : void 0,
                  onClick: () => {
                    setSlideDirection(index > activeSlide ? 1 : -1);
                    setActiveSlide(index);
                  },
                  className: cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-transparent p-0 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                    activeSlide === index && "bg-white/10"
                  ),
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "block h-2 w-2 rounded-full transition-all",
                        activeSlide === index ? "scale-125 bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]" : "bg-white/45"
                      )
                    }
                  )
                },
                slide.id
              )) }) : null
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex min-h-[640px] flex-col justify-center p-6 sm:p-10", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45 },
              className: "mx-auto w-full max-w-md",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: restrictedAccess ? "Entrar no Vetius" : isLogin ? "Bem-vindo de volta" : "Criar conta Vetius" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-400", children: restrictedAccess ? "Use sua conta cadastrada no Supabase para acessar todos os m\xF3dulos." : isLogin ? "Entre para continuar seu trabalho cl\xEDnico com seguran\xE7a." : "Cadastre sua conta para salvar seu trabalho na nuvem." })
                ] }),
                !restrictedAccess && onGoogleSignIn ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-6 flex min-h-[44px] w-full justify-center", children: /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "h-11 w-full gap-3 rounded-lg border-slate-700 bg-white text-slate-900 hover:bg-slate-100",
                      onClick: handleGoogleButton,
                      disabled: loading || googleLoading,
                      children: [
                        googleLoading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", className: "h-5 w-5", children: [
                          /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4h5.4a4.7 4.7 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z" }),
                          /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 22c2.7 0 5-.9 6.7-2.4L15.4 17c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z" }),
                          /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M6.4 13.9A6 6 0 0 1 6.1 12c0-.7.1-1.3.3-1.9V7.4H3A10 10 0 0 0 2 12c0 1.6.4 3.2 1 4.6l3.4-2.7Z" }),
                          /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7C7.2 7.8 9.4 6 12 6Z" })
                        ] }),
                        isLogin ? "Entrar com Google" : "Cadastrar com Google"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-slate-800" }) }),
                    /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase tracking-[0.18em]", children: /* @__PURE__ */ jsx("span", { className: "bg-[#090b13] px-2 text-slate-400", children: "ou" }) })
                  ] })
                ] }) : null,
                /* @__PURE__ */ jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { htmlFor: `${mode}-email`, className: "mb-1 block text-sm font-medium text-slate-300", children: [
                      isLogin ? "Usu\xE1rio ou e-mail" : "E-mail",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: `${mode}-email`,
                        type: isLogin ? "text" : "email",
                        placeholder: isLogin ? "ex.: usu\xE1rio ou nome@gmail.com" : "Digite seu e-mail",
                        value: email,
                        onChange: (event) => setEmail(event.target.value),
                        autoComplete: "username",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { htmlFor: `${mode}-password`, className: "mb-1 block text-sm font-medium text-slate-300", children: [
                      "Senha ",
                      /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: `${mode}-password`,
                          type: isPasswordVisible ? "text" : "password",
                          placeholder: "Digite sua senha",
                          value: password,
                          onChange: (event) => setPassword(event.target.value),
                          autoComplete: isLogin ? "current-password" : "new-password",
                          required: true,
                          className: "pr-10"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-200",
                          onClick: () => setIsPasswordVisible((prev) => !prev),
                          "aria-label": isPasswordVisible ? "Ocultar senha" : "Mostrar senha",
                          children: isPasswordVisible ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      type: "submit",
                      className: "h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 justify-center",
                      disabled: loading,
                      children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
                        isLogin ? "Entrando..." : "Criando conta..."
                      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        isLogin ? "Entrar" : "Criar conta",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                      ] })
                    }
                  )
                ] }),
                currentError ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-red-400", children: currentError }) : null,
                successMessage ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-emerald-400", children: successMessage }) : null,
                resetMessage ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-emerald-400", children: resetMessage }) : null,
                restrictedAccess ? /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-sm text-slate-500", children: "Acesso dispon\xEDvel para todos os usu\xE1rios cadastrados." }) : /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between gap-3 text-sm", children: [
                  isLogin ? /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleForgotPassword,
                      disabled: !onForgotPassword || forgotLoading,
                      className: "text-blue-400 transition-colors hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50",
                      children: forgotLoading ? "Enviando..." : "Esqueceu sua senha?"
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Cadastro r\xE1pido e seguro" }),
                  isLogin ? /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: onGoToSignup,
                      className: "text-slate-300 transition-colors hover:text-white",
                      children: [
                        "N\xE3o tem conta? ",
                        /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-400", children: "Criar conta" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: onGoToLogin,
                      className: "text-slate-300 transition-colors hover:text-white",
                      children: [
                        "Ja tem conta? ",
                        /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-400", children: "Entrar" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] }) });
}
export {
  AUTH_SLIDES_4K,
  TravelConnectSignIn as default
};
