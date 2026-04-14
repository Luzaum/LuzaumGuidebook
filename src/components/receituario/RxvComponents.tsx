import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

/**
 * Tema do receituário: prioriza a classe real em `.rxv-page` (fonte de verdade),
 * depois localStorage. Evita cartões/inputs claros quando o chrome está em modo escuro.
 */
const getIsDark = (): boolean => {
    try {
        if (typeof document === 'undefined') return true
        const page = document.querySelector('.rxv-page')
        if (page?.classList.contains('rxv-dark')) return true
        if (page?.classList.contains('rxv-light')) return false
        return localStorage.getItem('receituario-vet:theme:v1') !== 'light'
    } catch {
        return true
    }
}

/** Classes base — herdam --rxv-* do ancestral `.rxv-page` (claro ou escuro). */
const RXV_CARD_BASE =
    'rxv-card relative group p-5 transition-all border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] shadow-sm hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_30%,var(--rxv-border))]'

/**
 * RxvCard - Container principal (tema via CSS variables)
 */
export const RxvCard = ({ children, className = '', initial = true }: { children: React.ReactNode, className?: string, initial?: boolean }) => {
    return (
        <motion.div
            initial={initial ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            className={`${RXV_CARD_BASE} ${className}`}
        >
            {children}
        </motion.div>
    )
}

/**
 * RxvSectionHeader - Cabeçalho de seção com ícone
 */
const RxvSectionHeaderContent = ({ icon, title, subtitle, colorClass = 'text-[#39ff14]', bgClass = 'bg-[#39ff14]/10', shadowClass = 'shadow-[0_0_20px_rgba(57,255,20,0.1)]', children }: any) => {
    return (
        <div className="mb-6 flex items-center gap-3">
            {icon ? (
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bgClass} ${colorClass} ${shadowClass}`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
            ) : null}
            <div>
                <h2 className="text-lg font-black italic tracking-tight uppercase text-[color:var(--rxv-text)]">{title}</h2>
                {subtitle && <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">{subtitle}</p>}
            </div>
            {children && <div className="ml-auto flex items-center gap-3">{children}</div>}
        </div>
    )
}

export const RxvSectionHeader = (props: any) => <RxvSectionHeaderContent {...props} />

/**
 * RxvField - Wrapper para label e mensagem de erro
 */
export const RxvField = ({ label, error, tooltip, children, className = '' }: { label: string, error?: string, tooltip?: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.18em] text-[color:var(--rxv-muted)]">
                <span className="inline-flex items-center gap-1">
                    {label}
                    {tooltip ? (
                        <span
                            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-500/50 text-[8px] font-black text-slate-400"
                            title={tooltip}
                            aria-label={tooltip}
                        >
                            ?
                        </span>
                    ) : null}
                </span>
                {error && <span className="text-red-500 text-[9px] animate-pulse">!! {error}</span>}
            </label>
            {children}
        </div>
    )
}

/**
 * RxvInput - Input padrão com estilo Neon
 */
const RXV_INPUT_BASE =
    'w-full rounded-xl border px-3.5 py-3 text-[13px] font-bold outline-none transition-all border-[color:var(--rxv-border)] bg-[color:var(--rxv-input-bg)] text-[color:var(--rxv-text)] placeholder:text-[color:color-mix(in_srgb,var(--rxv-muted)_72%,transparent)] focus:border-[color:color-mix(in_srgb,var(--rxv-primary)_45%,var(--rxv-border))] focus:ring-1 focus:ring-[color:color-mix(in_srgb,var(--rxv-primary)_22%,transparent)]'

export const RxvInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => {
    return (
        <input
            {...props}
            className={`${RXV_INPUT_BASE} ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
        />
    )
}

/**
 * RxvSelect - Select padrão com estilo Neon
 */
export const RxvSelect = ({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options?: { value: string, label: string }[] | string[], error?: boolean }) => {
    const safeOptions = options ?? []
    const optSurface = 'bg-[color:var(--rxv-surface)] text-[color:var(--rxv-text)]'

    return (
        <select
            {...props}
            className={`${RXV_INPUT_BASE} ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
        >
            {safeOptions.map(opt => typeof opt === 'string' ? (
                <option key={opt} value={opt} className={optSurface}>{opt}</option>
            ) : (
                <option key={opt.value} value={opt.value} className={optSurface}>{opt.label}</option>
            ))}
        </select>
    )
}

/**
 * RxvTextarea - Textarea padrão com estilo Neon
 */
export const RxvTextarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) => {
    return (
        <textarea
            {...props}
            className={`${RXV_INPUT_BASE} min-h-[96px] resize-none ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
        />
    )
}

/**
 * RxvToggle - Switch booleano simplificado
 */
export const RxvToggle = ({ checked, onChange, label }: { checked: boolean, onChange: (val: boolean) => void, label?: string }) => {
    const isDark = getIsDark();
    return (
        <div className="flex items-center gap-3">
            {label && <span className={`text-[10px] font-black uppercase tracking-wider ${checked ? 'text-[#39ff14]' : (isDark ? 'text-slate-500' : 'text-slate-600')}`}>{label}</span>}
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 rounded-full border transition-all ${checked
                    ? 'bg-[#39ff14]/20 border-[#39ff14]/40'
                    : (isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300')}`}
            >
                <motion.div
                    animate={{ x: checked ? 20 : 2 }}
                    className={`absolute top-1 h-3 w-3 rounded-full transition-colors ${checked ? 'bg-[#39ff14]' : (isDark ? 'bg-slate-600' : 'bg-slate-400')}`}
                />
            </button>
        </div>
    )
}

/**
 * RxvChipsMultiSelect - Seleção múltipla estilo chips/checkboxes
 */
export const RxvChipsMultiSelect = ({ options, selected, onToggle, label }: { options: string[], selected: string[], onToggle: (opt: string) => void, label?: string }) => {
    const isDark = getIsDark();
    return (
        <div className="space-y-3">
            {label && <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>}
            <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                    const isActive = selected.includes(opt)
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onToggle(opt)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${isActive
                                ? 'bg-[#39ff14]/20 border-[#39ff14]/50 text-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.1)]'
                                : (isDark ? 'bg-black border-slate-800 text-slate-500 hover:border-slate-600' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300')}`}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * RxvPillToggle - Botão de toggle estilo Pill (ex: Ativo/Inativo)
 */
export const RxvPillToggle = ({ value, labels, onToggle, colorClass = 'text-[#39ff14]' }: { value: boolean, labels: [string, string], onToggle: () => void, colorClass?: string }) => {
    const isDark = getIsDark();
    return (
        <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase tracking-wider ${value ? colorClass : 'text-slate-500'}`}>
                {value ? labels[0] : labels[1]}
            </span>
            <button
                type="button"
                onClick={onToggle}
                className={`relative h-6 w-11 rounded-full border transition-all ${value ? 'bg-[#39ff14]/20 border-[#39ff14]/40' : (isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200')}`}
            >
                <motion.div
                    initial={false}
                    animate={{ x: value ? 20 : 2 }}
                    className={`absolute top-1 h-3 w-3 rounded-full ${value ? 'bg-[#39ff14]' : 'bg-slate-600'}`}
                />
            </button>
        </div>
    )
}

/**
 * RxvButton - Botão padronizado com variantes primary/secondary/danger + loading state
 */
type RxvButtonVariant = 'primary' | 'secondary' | 'danger'

/** Botões derivados de --rxv-* (claro/escuro automático no receituário). */
const RXV_BTN_TOKEN: Record<RxvButtonVariant, string> = {
    primary:
        'inline-flex items-center gap-2 rounded-xl border border-[color:color-mix(in_srgb,var(--rxv-primary)_42%,transparent)] bg-[color:color-mix(in_srgb,var(--rxv-primary)_14%,transparent)] px-3.5 py-2 text-[13px] font-bold text-[color:var(--rxv-primary)] transition-all hover:bg-[color:color-mix(in_srgb,var(--rxv-primary)_22%,transparent)] hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_55%,transparent)] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
        'inline-flex items-center gap-2 rounded-xl border border-[color:var(--rxv-border)] bg-[color:color-mix(in_srgb,var(--rxv-surface-2)_94%,var(--rxv-surface)_6%)] px-3.5 py-2 text-[13px] font-bold text-[color:var(--rxv-text)] transition-all hover:border-[color:color-mix(in_srgb,var(--rxv-primary)_28%,var(--rxv-border))] hover:bg-[color:color-mix(in_srgb,var(--rxv-primary)_8%,var(--rxv-surface-2))] disabled:opacity-50 disabled:cursor-not-allowed',
    danger:
        'inline-flex items-center gap-2 rounded-xl border border-red-500/35 bg-red-500/10 px-3.5 py-2 text-[13px] font-bold text-red-700 transition-all hover:bg-red-500/15 hover:border-red-500/45 dark:border-red-800/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/55 disabled:opacity-50 disabled:cursor-not-allowed',
}

export const RxvButton = ({
    variant = 'secondary',
    loading = false,
    children,
    className = '',
    type = 'button',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: RxvButtonVariant
    loading?: boolean
}) => {
    return (
        <button
            type={type}
            {...props}
            disabled={props.disabled || loading}
            className={`${RXV_BTN_TOKEN[variant]} ${className}`}
        >
            {loading ? (
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
            ) : null}
            {children}
        </button>
    )
}

export const RxvModalShell = ({
    children,
    zIndexClass = 'z-[90]',
    overlayClassName = 'bg-black/80 backdrop-blur-sm',
    containerClassName = 'flex min-h-full items-start justify-center px-4 py-4 sm:items-center sm:px-6 sm:py-8',
    onBackdropClick,
}: {
    children: React.ReactNode
    zIndexClass?: string
    overlayClassName?: string
    containerClassName?: string
    onBackdropClick?: () => void
}) => {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    return createPortal(
        <div className={`fixed inset-0 ${zIndexClass} overflow-y-auto overscroll-contain`}>
            <div className={containerClassName}>
                <div
                    className={`fixed inset-0 ${overlayClassName}`}
                    onClick={onBackdropClick}
                    aria-hidden="true"
                />
                <div className="relative my-auto w-full">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
