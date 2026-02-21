import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RevealWaveImage } from '../components/ui/reveal-wave-image'
import Logo from '../components/Logo'
import { ArrowRight, ShieldCheck, BookOpen, Zap, Layers, Users, Brain, Mail, User, ChevronRight, ExternalLink, X } from 'lucide-react'

/* ─── Footer Content Data ───────────────────────────────────────── */
const footerContent: Record<string, { title: string; content: string }> = {
    'Quem Somos': {
        title: 'Quem Somos',
        content: 'A Vetius é uma plataforma desenvolvida por veterinários para veterinários, com a missão de transformar a rotina clínica através de tecnologia e evidência científica. Nascemos da necessidade de ter informações confiáveis e ferramentas de cálculo precisas na palma da mão, unindo praticidade e rigor técnico em um só lugar.',
    },
    'Nossa Missão': {
        title: 'Nossa Missão',
        content: 'Democratizar o acesso à informação veterinária de alta qualidade, proporcionando segurança e eficiência na tomada de decisão clínica. Queremos empoderar veterinários de todo o país, salvando vidas e valorizando a profissão através do conhecimento acessível e ferramentas inteligentes.',
    },
    'Time Veterinário': {
        title: 'Nosso Time',
        content: 'Contamos com um conselho científico formado por especialistas diplomados e mestres/doutores nas áreas de Medicina Intensiva, Cardiologia, Neurologia, Anestesiologia e Clínica Médica de Pequenos Animais. Cada módulo é curado por um expert da área para garantir a máxima precisão.',
    },
    'Parceiros': {
        title: 'Parceiros',
        content: 'Trabalhamos em conjunto com grandes centros de referência, hospitais escolas e universidades para garantir que nosso conteúdo esteja sempre atualizado e validado. Nossos parceiros nos ajudam a manter o Vetius na vanguarda da medicina veterinária.',
    },
    'Política de Privacidade': {
        title: 'Política de Privacidade',
        content: 'Levamos a proteção de dados a sério. Seus dados pessoais e informações de uso são criptografados e armazenados com segurança, em total conformidade com a LGPD. Não compartilhamos suas informações com terceiros sem seu consentimento explícito. Sua privacidade é nossa prioridade.',
    },
    'Termos de Uso': {
        title: 'Termos de Uso',
        content: 'Ao utilizar o Vetius, você concorda que a plataforma é uma ferramenta de suporte à decisão e NÃO substitui o julgamento profissional do médico veterinário. O usuário é o único responsável pelas decisões clínicas, diagnósticos e tratamentos instituídos. Recomendamos a verificação cruzada de doses em pacientes críticos.',
    },
    'Ouvidoria': {
        title: 'Ouvidoria',
        content: 'Este é um canal exclusivo para sugestões, reclamações e denúncias de ética ou conduta. Nosso compromisso é com a transparência e a melhoria contínua dos nossos serviços. Todas as mensagens são tratadas com sigilo e seriedade.',
    },
    'Reportar Problema': {
        title: 'Reportar Problema',
        content: 'Encontrou algum erro clínico, bug no sistema ou dificuldade técnica? Por favor, relate aqui! Nossa equipe de suporte técnico e conteudistas trabalharão rapidamente para investigar e corrigir qualquer inconsistência.',
    },
    'Contato': {
        title: 'Contato',
        content: 'Fale conosco! Estamos disponíveis para dúvidas comerciais, suporte ou parcerias.\n\nE-mail: contato@vetius.com\nWhatsApp: (11) 99999-9999\n\nAtendimento de segunda a sexta, das 9h às 18h.',
    },
}

/* ─── Testimonials Data ─────────────────────────────────────────── */
const testimonials = [
    {
        name: 'Dra. Camila Rodrigues',
        state: 'SP',
        specialty: 'Clínica Geral',
        initials: 'CR',
        color: 'from-blue-500 to-cyan-400',
        text: 'O Vetius virou meu companheiro de plantão. Os cálculos de fluidoterapia que antes me tomavam minutos, agora faço em segundos com total segurança.',
    },
    {
        name: 'Dr. Felipe Araújo',
        state: 'MG',
        specialty: 'Emergenciologia',
        initials: 'FA',
        color: 'from-violet-500 to-purple-400',
        text: 'Trabalho em UPA veterinária e o módulo de protocolos de emergência já salvou pacientes. A base literária sólida passa confiança real nas decisões críticas.',
    },
    {
        name: 'Dra. Larissa Mendes',
        state: 'RS',
        specialty: 'Neurologia',
        initials: 'LM',
        color: 'from-emerald-500 to-teal-400',
        text: 'O módulo de neurologia é impressionante. A lógica de diagnóstico diferencial me ajuda a estruturar o raciocínio clínico de forma muito mais eficiente.',
    },
    {
        name: 'Dr. Rafael Costa',
        state: 'RJ',
        specialty: 'Anestesiologia',
        initials: 'RC',
        color: 'from-orange-500 to-amber-400',
        text: 'A calculadora de infusão de drogas é fantástica. Posso calcular CRI de cetamina e dexmedetomidina em tempo real durante o procedimento.',
    },
    {
        name: 'Dra. Beatriz Santos',
        state: 'BA',
        specialty: 'Clínica Geral',
        initials: 'BS',
        color: 'from-pink-500 to-rose-400',
        text: 'Uso diariamente na minha clínica em Salvador. A facilidade de ter todo o conhecimento do Nelson & Couto acessível no celular é algo que não tem preço.',
    },
    {
        name: 'Dr. Thiago Oliveira',
        state: 'PR',
        specialty: 'Medicina Interna',
        initials: 'TO',
        color: 'from-sky-500 to-blue-400',
        text: 'Recomendo para todos os colegas. O app realmente integra as diferentes áreas e facilita o raciocínio clínico desde o diagnóstico até o tratamento.',
    },
]

/* ─── Value Props Data ──────────────────────────────────────────── */
const valueProps = [
    {
        icon: BookOpen,
        color: 'from-blue-500/20 to-blue-600/10',
        iconColor: 'text-blue-400',
        borderHover: 'hover:border-blue-400/40',
        glowColor: 'hover:shadow-blue-500/10',
        title: 'Baseado em Evidências Científicas',
        description:
            'Conteúdo extraído das melhores referências: Plumb\'s, Nelson & Couto, Ettinger, BSAVA, ACVIM e muito mais. Cada protocolo tem respaldo literário sólido.',
        tags: ["Plumb's", 'Nelson & Couto', 'ACVIM', 'BSAVA'],
    },
    {
        icon: Layers,
        color: 'from-violet-500/20 to-violet-600/10',
        iconColor: 'text-violet-400',
        borderHover: 'hover:border-violet-400/40',
        glowColor: 'hover:shadow-violet-500/10',
        title: 'Todas as Áreas Integradas',
        description:
            'Do cálculo de fluido à neurologia, de hemogasometria à anestesiologia — tudo junto, em um ecossistema clínico completo para cães e gatos.',
        tags: ['Neurologia', 'Emergências', 'CRI/Infusão', 'Fluidoterapia'],
    },
    {
        icon: Zap,
        color: 'from-emerald-500/20 to-emerald-600/10',
        iconColor: 'text-emerald-400',
        borderHover: 'hover:border-emerald-400/40',
        glowColor: 'hover:shadow-emerald-500/10',
        title: 'Aliado Inteligente no Plantão',
        description:
            'Interface projetada para decisões rápidas e precisas. Menos tempo calculando, mais tempo cuidando. Perfeito para o ritmo intenso da rotina veterinária.',
        tags: ['Decisão rápida', 'Plantão', 'Mobile-friendly', 'Offline'],
    },
]

/* ─── Component ─────────────────────────────────────────────────── */
export function LandingPage() {
    const navigate = useNavigate()
    const valueRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [submitted, setSubmitted] = useState(false)
    const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)
    const [activeModal, setActiveModal] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.name && formData.email) {
            setSubmitted(true)
        }
    }

    return (
        <div className="relative w-full overflow-x-hidden">

            {/* ── SECTION 1: HERO ── */}
            {/* Mobile: auto height at least 100svh; tablet+: 88vh */}
            <section className="relative w-full min-h-[100svh] sm:min-h-[92vh] md:h-[88vh] md:min-h-[600px] flex items-end sm:items-center overflow-hidden pb-10 sm:pb-0">

                {/* Background RevealWaveImage */}
                <div className="absolute inset-0 z-0">
                    <RevealWaveImage
                        src="/HERO.png"
                        waveSpeed={0.25}
                        waveFrequency={0.5}
                        waveAmplitude={0.3}
                        revealRadius={0.3}
                        revealSoftness={0.6}
                        pixelSize={1}
                        mouseRadius={0.2}
                        imageShiftX={0.2}
                        zoom={1.1}
                        className="w-full h-full object-cover object-center"
                    />
                    {/* On mobile: stronger overlay at bottom where card sits */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 sm:bg-gradient-to-r sm:from-background/85 sm:via-background/50 sm:to-transparent z-[1] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pointer-events-none h-full flex items-end sm:items-center">
                    {/* Card: full-width on mobile, max-xl on larger */}
                    <div className="w-full sm:max-w-lg md:max-w-xl mr-auto p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl animate-in fade-in slide-in-from-bottom sm:slide-in-from-left duration-700
                          bg-[#0a1532] backdrop-blur-md border border-white/10 sm:border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">

                        {/* Badge */}
                        <div className="pointer-events-auto mb-4 sm:mb-6">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                                Validado por Especialistas
                            </span>
                        </div>

                        <div className="pointer-events-auto">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-50 leading-[1.1] mb-4 sm:mb-6 drop-shadow-sm">
                                Medicina Veterinária de{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    Alta Precisão
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed font-medium mb-6 sm:mb-8 drop-shadow-sm">
                                Ferramentas de decisão clínica baseadas nas últimas evidências de{' '}
                                <strong className="text-white">Plumb's, Nelson & Couto, Ettinger, BSAVA, ACVIM</strong> e muito mais!
                            </p>

                            <button
                                onClick={() => navigate('/hub')}
                                className="w-full sm:w-auto h-13 sm:h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Explorar Módulos
                                <ArrowRight className="w-5 h-5 shrink-0" />
                            </button>
                        </div>

                        {/* Trust badges - hidden on tiny screens */}
                        <div className="hidden sm:flex mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex-wrap gap-4 sm:gap-5 text-xs sm:text-sm font-medium text-blue-100/80 pointer-events-auto">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                                <span>Validado por Especialistas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                                <span>Literatura Atualizada</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 shrink-0" />
                                <span>Comunidade Ativa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: VALUE PROPS ── */}
            <section ref={valueRef} className="py-16 sm:py-20 lg:py-28 relative">
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-4 sm:mb-6">
                            <Brain className="w-4 h-4" />
                            Por que o Vetius?
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                            Um companheiro de plantão{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                robusto e completo
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Feito por veterinários, para veterinários. Cada funcionalidade foi pensada para
                            resolver problemas reais da rotina clínica.
                        </p>
                    </div>

                    {/* Cards: 1 col mobile, 3 col lg */}
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {valueProps.map((prop, idx) => {
                            const Icon = prop.icon
                            return (
                                <div
                                    key={idx}
                                    className={`group relative p-6 sm:p-8 rounded-2xl border border-border/60 bg-gradient-to-br ${prop.color}
                                    backdrop-blur-sm transition-all duration-300 cursor-default
                                    ${prop.borderHover} hover:shadow-2xl ${prop.glowColor} hover:-translate-y-1 active:scale-[0.99]`}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background/60 border border-border/40 flex items-center justify-center mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110">
                                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${prop.iconColor}`} />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 leading-snug">
                                        {prop.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                                        {prop.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {prop.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background/50 border border-border/60 text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: TESTIMONIALS ── */}
            <section className="py-16 sm:py-20 lg:py-28 relative bg-surface-2/20">
                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/8 rounded-full blur-[150px] opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-emerald-500/5 rounded-full blur-[120px] opacity-40" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 rounded-full px-4 py-2 text-sm font-semibold mb-4 sm:mb-6">
                            <Users className="w-4 h-4" />
                            Depoimentos Reais
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                            O que nossos veterinários{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                estão dizendo
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                            De norte a sul do Brasil, o Vetius está transformando a rotina clínica.
                        </p>
                    </div>

                    {/* Testimonial grid: 1 col mobile, 2 col md, 3 col lg */}
                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setHoveredTestimonial(idx)}
                                onMouseLeave={() => setHoveredTestimonial(null)}
                                className={`relative p-5 sm:p-6 rounded-2xl border bg-background/60 backdrop-blur-sm transition-all duration-300 cursor-default
                                    ${hoveredTestimonial === idx
                                        ? 'border-primary/40 shadow-2xl shadow-primary/10 -translate-y-1 bg-background/90'
                                        : hoveredTestimonial !== null
                                            ? 'border-border/30 opacity-60 scale-[0.98]'
                                            : 'border-border/60'
                                    }`}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-3 sm:mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-foreground/85 leading-relaxed text-sm mb-5 sm:mb-6 italic">
                                    "{t.text}"
                                </p>

                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                                        <p className="text-muted-foreground text-xs">{t.specialty} · {t.state}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: CTA / COMMUNITY FORM ── */}
            <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6 sm:mb-8">
                        <Users className="w-4 h-4" />
                        Comunidade Vetius
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                        Faça parte da{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            comunidade
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground mb-2 sm:mb-3 max-w-xl mx-auto">
                        Cadastre-se e receba um link no seu e-mail para salvar seu progresso, sincronizar dados
                        e usar o Vetius em qualquer dispositivo, em qualquer lugar.
                    </p>
                    <p className="text-sm text-muted-foreground/70 mb-8 sm:mb-12">
                        Sem spam. Sem taxas. Apenas ferramentas que facilitam seu dia a dia.
                    </p>

                    {/* Form */}
                    {!submitted ? (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-background/60 backdrop-blur-md border border-border/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-primary/5 max-w-md mx-auto"
                        >
                            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl border border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 text-sm"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        placeholder="Seu e-mail profissional"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl border border-border/60 bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 sm:h-14 px-8 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Quero meu acesso
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <p className="text-xs text-muted-foreground/60 mt-4 text-center">
                                Ao se cadastrar, você concorda com nossa{' '}
                                <a href="#" className="underline hover:text-primary transition-colors">Política de Privacidade</a>.
                            </p>
                        </form>
                    ) : (
                        <div className="bg-background/60 backdrop-blur-md border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-10 max-w-md mx-auto shadow-2xl shadow-emerald-500/10">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Obrigado, {formData.name.split(' ')[0]}!</h3>
                            <p className="text-muted-foreground text-sm">
                                Enviamos um link para <strong>{formData.email}</strong>.
                                Verifique sua caixa de entrada e spam!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── SECTION 5: FOOTER ── */}
            <footer className="border-t border-border/40 bg-background/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
                    {/* Footer grid: stacks on mobile, 4 cols on md+ */}
                    <div className="grid gap-8 sm:gap-10 grid-cols-2 md:grid-cols-4">
                        {/* Brand — spans full row on mobile, 2 cols on md */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
                                <span className="text-lg sm:text-xl font-bold text-foreground">Vetius</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-5 sm:mb-6">
                                Plataforma de suporte à decisão clínica veterinária, baseada em evidências científicas
                                e desenvolvida por veterinários para veterinários.
                            </p>
                            <button
                                onClick={() => navigate('/hub')}
                                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 active:bg-primary/30 text-primary rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                            >
                                Acessar Plataforma
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Links Institucionais */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4">Institucional</h4>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {['Quem Somos', 'Nossa Missão', 'Time Veterinário', 'Parceiros'].map((link) => (
                                    <li key={link}>
                                        <button
                                            onClick={() => setActiveModal(link)}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer text-left"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal e Contato */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4">Legal & Suporte</h4>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {[
                                    'Política de Privacidade',
                                    'Termos de Uso',
                                    'Ouvidoria',
                                    'Reportar Problema',
                                    'Contato',
                                ].map((link) => (
                                    <li key={link}>
                                        <button
                                            onClick={() => setActiveModal(link)}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer text-left"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/40 flex flex-col items-center sm:flex-row sm:justify-between gap-3 text-xs text-muted-foreground/70 text-center sm:text-left">
                        <p>© 2025 Vetius. Todos os direitos reservados.</p>
                        <p className="max-w-xs sm:max-w-none">
                            Ferramenta de <strong>suporte à decisão clínica</strong>. Não substitui o julgamento profissional.
                        </p>
                    </div>
                </div>
            </footer>
            {/* ── FOOTER MODAL ── */}
            {activeModal && footerContent[activeModal] && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
                    <div
                        className="bg-background border border-border rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-surface/50 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-bold text-foreground mb-4 pr-8">
                            {footerContent[activeModal].title}
                        </h3>
                        <div className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {footerContent[activeModal].content}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-colors text-sm"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
