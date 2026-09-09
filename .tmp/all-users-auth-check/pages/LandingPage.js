// pages/LandingPage.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { ArrowRight, ShieldCheck, BookOpen, Zap, Layers, Users, Brain, ExternalLink, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var footerContent = {
  "Quem Somos": {
    title: "Quem Somos",
    content: "A Vetius \xE9 uma plataforma desenvolvida por veterin\xE1rios para veterin\xE1rios, com a miss\xE3o de transformar a rotina cl\xEDnica atrav\xE9s de tecnologia e evid\xEAncia cient\xEDfica. Nascemos da necessidade de ter informa\xE7\xF5es confi\xE1veis e ferramentas de c\xE1lculo precisas na palma da m\xE3o, unindo praticidade e rigor t\xE9cnico em um s\xF3 lugar."
  },
  "Nossa Miss\xE3o": {
    title: "Nossa Miss\xE3o",
    content: "Democratizar o acesso \xE0 informa\xE7\xE3o veterin\xE1ria de alta qualidade, proporcionando seguran\xE7a e efici\xEAncia na tomada de decis\xE3o cl\xEDnica. Queremos empoderar veterin\xE1rios de todo o pa\xEDs, salvando vidas e valorizando a profiss\xE3o atrav\xE9s do conhecimento acess\xEDvel e ferramentas inteligentes."
  },
  "Time Veterin\xE1rio": {
    title: "Nosso Time",
    content: "Contamos com um conselho cient\xEDfico formado por especialistas diplomados e mestres/doutores nas \xE1reas de Medicina Intensiva, Cardiologia, Neurologia, Anestesiologia e Cl\xEDnica M\xE9dica de Pequenos Animais. Cada m\xF3dulo \xE9 curado por um expert da \xE1rea para garantir a m\xE1xima precis\xE3o."
  },
  "Parceiros": {
    title: "Parceiros",
    content: "Trabalhamos em conjunto com grandes centros de refer\xEAncia, hospitais escolas e universidades para garantir que nosso conte\xFAdo esteja sempre atualizado e validado. Nossos parceiros nos ajudam a manter o Vetius na vanguarda da medicina veterin\xE1ria."
  },
  "Pol\xEDtica de Privacidade": {
    title: "Pol\xEDtica de Privacidade",
    content: "Levamos a prote\xE7\xE3o de dados a s\xE9rio. Seus dados pessoais e informa\xE7\xF5es de uso s\xE3o criptografados e armazenados com seguran\xE7a, em total conformidade com a LGPD. N\xE3o compartilhamos suas informa\xE7\xF5es com terceiros sem seu consentimento expl\xEDcito. Sua privacidade \xE9 nossa prioridade."
  },
  "Termos de Uso": {
    title: "Termos de Uso",
    content: "Ao utilizar o Vetius, voc\xEA concorda que a plataforma \xE9 uma ferramenta de suporte \xE0 decis\xE3o e N\xC3O substitui o julgamento profissional do m\xE9dico veterin\xE1rio. O usu\xE1rio \xE9 o \xFAnico respons\xE1vel pelas decis\xF5es cl\xEDnicas, diagn\xF3sticos e tratamentos institu\xEDdos. Recomendamos a verifica\xE7\xE3o cruzada de doses em pacientes cr\xEDticos."
  },
  "Ouvidoria": {
    title: "Ouvidoria",
    content: "Este \xE9 um canal exclusivo para sugest\xF5es, reclama\xE7\xF5es e den\xFAncias de \xE9tica ou conduta. Nosso compromisso \xE9 com a transpar\xEAncia e a melhoria cont\xEDnua dos nossos servi\xE7os. Todas as mensagens s\xE3o tratadas com sigilo e seriedade."
  },
  "Reportar Problema": {
    title: "Reportar Problema",
    content: "Encontrou algum erro cl\xEDnico ou dificuldade de uso? Relate aqui para que a situa\xE7\xE3o seja analisada e corrigida."
  },
  "Contato": {
    title: "Contato",
    content: "Fale conosco! Estamos dispon\xEDveis para d\xFAvidas comerciais, suporte ou parcerias.\n\nE-mail: contato@vetius.com\nWhatsApp: (11) 99999-9999\n\nAtendimento de segunda a sexta, das 9h \xE0s 18h."
  }
};
var testimonials = [
  {
    name: "Dra. Camila Rodrigues",
    state: "SP",
    specialty: "Cl\xEDnica Geral",
    initials: "CR",
    color: "from-blue-500 to-cyan-400",
    text: "O Vetius virou meu companheiro de plant\xE3o. O acesso r\xE1pido \xE0s ferramentas cl\xEDnicas reduziu meu tempo de decis\xE3o e deixou a rotina muito mais segura."
  },
  {
    name: "Dr. Felipe Ara\xFAjo",
    state: "MG",
    specialty: "Emergenciologia",
    initials: "FA",
    color: "from-violet-500 to-purple-400",
    text: "Trabalho em UPA veterin\xE1ria e os protocolos de emerg\xEAncia j\xE1 salvaram pacientes. A base liter\xE1ria s\xF3lida passa confian\xE7a real nas decis\xF5es cr\xEDticas."
  },
  {
    name: "Dra. Larissa Mendes",
    state: "RS",
    specialty: "Neurologia",
    initials: "LM",
    color: "from-emerald-500 to-teal-400",
    text: "A \xE1rea de neurologia \xE9 impressionante. A l\xF3gica de diagn\xF3stico diferencial me ajuda a estruturar o racioc\xEDnio cl\xEDnico de forma muito mais eficiente."
  },
  {
    name: "Dr. Rafael Costa",
    state: "RJ",
    specialty: "Anestesiologia",
    initials: "RC",
    color: "from-orange-500 to-amber-400",
    text: "A calculadora de infus\xE3o de drogas \xE9 fant\xE1stica. Posso calcular CRI de cetamina e dexmedetomidina em tempo real durante o procedimento."
  },
  {
    name: "Dra. Beatriz Santos",
    state: "BA",
    specialty: "Cl\xEDnica Geral",
    initials: "BS",
    color: "from-pink-500 to-rose-400",
    text: "Uso diariamente na minha cl\xEDnica em Salvador. A facilidade de ter todo o conhecimento do Nelson & Couto acess\xEDvel no celular \xE9 algo que n\xE3o tem pre\xE7o."
  },
  {
    name: "Dr. Thiago Oliveira",
    state: "PR",
    specialty: "Medicina Interna",
    initials: "TO",
    color: "from-sky-500 to-blue-400",
    text: "Recomendo para todos os colegas. A integra\xE7\xE3o entre as diferentes \xE1reas facilita o racioc\xEDnio cl\xEDnico desde o diagn\xF3stico at\xE9 o tratamento."
  }
];
var valueProps = [
  {
    icon: BookOpen,
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-400/40",
    glowColor: "hover:shadow-blue-500/10",
    title: "Baseado em Evid\xEAncias Cient\xEDficas",
    description: "Conte\xFAdo extra\xEDdo das melhores refer\xEAncias: Plumb's, Nelson & Couto, Ettinger, BSAVA, ACVIM e muito mais. Cada protocolo tem respaldo liter\xE1rio s\xF3lido.",
    tags: ["Plumb's", "Nelson & Couto", "ACVIM", "BSAVA"]
  },
  {
    icon: Layers,
    color: "from-violet-500/20 to-violet-600/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-400/40",
    glowColor: "hover:shadow-violet-500/10",
    title: "Todas as \xC1reas Integradas",
    description: "De emerg\xEAncias \xE0 neurologia, de hemogasometria \xE0 anestesiologia, tudo junto em um ecossistema cl\xEDnico completo para c\xE3es e gatos.",
    tags: ["Neurologia", "Emerg\xEAncias", "CRI/Infus\xE3o", "Hemogasometria"]
  },
  {
    icon: Zap,
    color: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-400/40",
    glowColor: "hover:shadow-emerald-500/10",
    title: "Aliado Inteligente no Plant\xE3o",
    description: "Interface projetada para decis\xF5es r\xE1pidas e precisas. Menos tempo calculando, mais tempo cuidando. Perfeito para o ritmo intenso da rotina veterin\xE1ria.",
    tags: ["Decis\xE3o r\xE1pida", "Plant\xE3o", "Mobile-friendly", "Offline"]
  }
];
function LandingPage() {
  const navigate = useNavigate();
  const valueRef = useRef(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-screen flex items-end sm:items-center overflow-hidden pb-10 sm:pb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/HERO.png",
            alt: "Hero Vetius",
            className: "hero-image-moving w-full h-full object-cover object-center",
            loading: "eager"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 sm:bg-gradient-to-r sm:from-background/85 sm:via-background/50 sm:to-transparent z-[1] pointer-events-none hidden dark:block" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full px-4 sm:px-8 lg:px-16 pointer-events-none h-full flex items-end sm:items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-lg md:max-w-xl mr-auto pointer-events-auto group", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-2.5 rounded-2xl sm:rounded-3xl overflow-hidden blur-xl opacity-60 dark:opacity-80 z-0",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("div", { className: "hero-neon-glow" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "hero-neon-border-track pointer-events-none absolute -inset-[1.5px] rounded-2xl sm:rounded-3xl z-20 overflow-hidden",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("div", { className: "hero-neon-beam" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl animate-in fade-in slide-in-from-bottom sm:slide-in-from-left duration-700\n                              bg-[#0a1532] border border-white/10 sm:border-blue-500/20 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-50 leading-[1.1] mb-4 sm:mb-6 drop-shadow-sm", children: [
              "Medicina Veterin\xE1ria de",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400", children: "Alta Precis\xE3o" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed font-medium mb-6 sm:mb-8 drop-shadow-sm", children: [
              "Ferramentas de decis\xE3o cl\xEDnica baseadas nas \xFAltimas evid\xEAncias, consensos e literatura atualizada (",
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Plumb's, Nelson & Couto, Ettinger, BSAVA, ACVIM, iCatCare, IRIS" }),
              " e muito mais!)"
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigate("/login?next=%2Fhub"),
                className: "w-full sm:w-auto h-13 sm:h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                children: [
                  "Explorar M\xF3dulos",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 shrink-0" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 items-center gap-2 text-xs sm:text-sm font-medium text-blue-100/80", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Literatura Atualizada" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { ref: valueRef, className: "py-16 sm:py-20 lg:py-28 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/5 rounded-full blur-[120px]" }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16 lg:mb-20", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsx(Brain, { className: "w-4 h-4" }),
            "Por que o Vetius?"
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight", children: [
            "Um companheiro de plant\xE3o",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400", children: "robusto e completo" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto", children: "Feito por veterin\xE1rios, para veterin\xE1rios. Cada funcionalidade foi pensada para resolver problemas reais da rotina cl\xEDnica." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3", children: valueProps.map((prop, idx) => {
          const Icon = prop.icon;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `group relative p-6 sm:p-8 rounded-2xl border border-border/60 bg-gradient-to-br ${prop.color}
                                    backdrop-blur-sm transition-all duration-300 cursor-default
                                    ${prop.borderHover} hover:shadow-2xl ${prop.glowColor} hover:-translate-y-1 active:scale-[0.99]`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background/60 border border-border/40 flex items-center justify-center mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 sm:w-7 sm:h-7 ${prop.iconColor}` }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 leading-snug", children: prop.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6", children: prop.description }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: prop.tags.map((tag) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-background/50 border border-border/60 text-muted-foreground",
                    children: tag
                  },
                  tag
                )) })
              ]
            },
            idx
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 sm:py-20 lg:py-28 relative bg-surface-2/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10 pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/8 rounded-full blur-[150px] opacity-50" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-emerald-500/5 rounded-full blur-[120px] opacity-40" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16 lg:mb-20", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 rounded-full px-4 py-2 text-sm font-semibold mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
            "Depoimentos Reais"
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight", children: [
            "O que nossos veterin\xE1rios",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400", children: "est\xE3o dizendo" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-xl mx-auto", children: "De norte a sul do Brasil, o Vetius est\xE1 transformando a rotina cl\xEDnica." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3", children: testimonials.map((t, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseEnter: () => setHoveredTestimonial(idx),
            onMouseLeave: () => setHoveredTestimonial(null),
            className: `relative p-5 sm:p-6 rounded-2xl border bg-background/60 backdrop-blur-sm transition-all duration-300 cursor-default
                                    ${hoveredTestimonial === idx ? "border-primary/40 shadow-2xl shadow-primary/10 -translate-y-1 bg-background/90" : hoveredTestimonial !== null ? "border-border/30 opacity-60 scale-[0.98]" : "border-border/60"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-3 sm:mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) }),
              /* @__PURE__ */ jsxs("p", { className: "text-foreground/85 leading-relaxed text-sm mb-5 sm:mb-6 italic", children: [
                '"',
                t.text,
                '"'
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: `w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`, children: t.initials }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground text-sm", children: t.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-xs", children: [
                    t.specialty,
                    " \xB7 ",
                    t.state
                  ] })
                ] })
              ] })
            ]
          },
          idx
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 sm:py-20 lg:py-28 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
          "Acesso protegido"
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight", children: [
          "Ferramentas exclusivas para",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400", children: "usu\xE1rios cadastrados" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-muted-foreground mb-2 sm:mb-3 max-w-xl mx-auto", children: "Os m\xF3dulos cl\xEDnicos do Vetius s\xE3o protegidos. Qualquer usu\xE1rio cadastrado no Supabase pode entrar com suas credenciais e acessar as ferramentas." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground/70 mb-8 sm:mb-12", children: "Sua sess\xE3o permanece segura e pode ser encerrada a qualquer momento." }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/login?next=%2Fhub"),
            className: "mx-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-8 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-primary/90 hover:to-purple-500 hover:shadow-primary/50 active:scale-[0.98] sm:h-14",
            children: [
              "Entrar no Vetius",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/40 bg-background/80", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-8 sm:gap-10 grid-cols-2 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3 sm:mb-4", children: [
            /* @__PURE__ */ jsx(Logo, { className: "w-7 h-7 sm:w-8 sm:h-8" }),
            /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl font-bold text-foreground", children: "Vetius" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-xs mb-5 sm:mb-6", children: "Plataforma de suporte \xE0 decis\xE3o cl\xEDnica veterin\xE1ria, baseada em evid\xEAncias cient\xEDficas e desenvolvida por veterin\xE1rios para veterin\xE1rios." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => navigate("/login?next=%2Fhub"),
              className: "inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 active:bg-primary/30 text-primary rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer",
              children: [
                "Acessar Plataforma",
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4", children: "Institucional" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 sm:space-y-3", children: ["Quem Somos", "Nossa Miss\xE3o", "Time Veterin\xE1rio", "Parceiros"].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveModal(link),
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer text-left",
              children: link
            }
          ) }, link)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4", children: "Legal & Suporte" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 sm:space-y-3", children: [
            "Pol\xEDtica de Privacidade",
            "Termos de Uso",
            "Ouvidoria",
            "Reportar Problema",
            "Contato"
          ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveModal(link),
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer text-left",
              children: link
            }
          ) }, link)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/40 flex flex-col items-center sm:flex-row sm:justify-between gap-3 text-xs text-muted-foreground/70 text-center sm:text-left", children: [
        /* @__PURE__ */ jsx("p", { children: "\xA9 2025 Vetius. Todos os direitos reservados." }),
        /* @__PURE__ */ jsxs("p", { className: "max-w-xs sm:max-w-none", children: [
          "Ferramenta de ",
          /* @__PURE__ */ jsx("strong", { children: "suporte \xE0 decis\xE3o cl\xEDnica" }),
          ". N\xE3o substitui o julgamento profissional."
        ] })
      ] })
    ] }) }),
    activeModal && footerContent[activeModal] && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:p-4",
        onClick: () => setActiveModal(null),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "landing-footer-modal-title",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-5 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModal(null),
                  className: "absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface/50 hover:text-foreground sm:right-4 sm:top-4",
                  "aria-label": "Fechar janela",
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx("h3", { id: "landing-footer-modal-title", className: "mb-4 pr-10 text-2xl font-bold text-foreground", children: footerContent[activeModal].title }),
              /* @__PURE__ */ jsx("div", { className: "prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed whitespace-pre-wrap", children: footerContent[activeModal].content }),
              /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModal(null),
                  className: "min-h-11 rounded-lg bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20",
                  children: "Fechar"
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
export {
  LandingPage
};
