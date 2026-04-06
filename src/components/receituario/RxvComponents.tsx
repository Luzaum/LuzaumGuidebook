import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

/**
 * Detect current theme from localStorage or CSS class
 */
const getIsDark = () => {
    try {
        if (typeof document !== 'undefined' && document.querySelector('.rxv-page.rxv-light')) return false;
        return localStorage.getItem('receituario-vet:theme:v1') !== 'light'
    } catch { return true }
}

/**
 * RxvCard - Container principal com estilo Neon/Dark
 */
export const RxvCard = ({ children, className = '', initial = true }: { children: React.ReactNode, className?: string, initial?: boolean }) => {
    const isDark = getIsDark();
    return (
        <motion.div
            initial={initial ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            className={`rxv-card relative group p-5 transition-all border
            ${isDark ? 'bg-[#0a140a]/60 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'}
            hover:border-[#39ff14]/20 ${className}`}
        >
            {children}
        </motion.div>
    )
}

/**
 * RxvSectionHeader - Cabeçalho de seção com ícone
 */
const RxvSectionHeaderContent = ({ icon, title, subtitle, colorClass = 'text-[#39ff14]', bgClass = 'bg-[#39ff14]/10', shadowClass = 'shadow-[0_0_20px_rgba(57,255,20,0.1)]', children }: any) => {
    const isDark = getIsDark();
    return (
        <div className="mb-6 flex items-center gap-3">
            {icon ? (
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bgClass} ${colorClass} ${shadowClass}`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
            ) : null}
            <div>
                <h2 className={`text-lg font-black italic tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
                {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em]">{subtitle}</p>}
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
    const isDark = getIsDark();
    return (
        <div className={`space-y-2 ${className}`}>
            <label className={`flex items-center justify-between text-[9px] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
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
export const RxvInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) => {
    const isDark = getIsDark();
    return (
        <input
            {...props}
            className={`w-full rounded-xl border px-3.5 py-3 text-[13px] font-bold outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20
        ${isDark
                    ? 'border-slate-800 bg-black/60 text-white placeholder:text-slate-700'
                    : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}
        ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
        />
    )
}

/**
 * RxvSelect - Select padrão com estilo Neon
 */
export const RxvSelect = ({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options?: { value: string, label: string }[] | string[], error?: boolean }) => {
    const isDark = getIsDark();
    const safeOptions = options ?? []

    return (
        <select
            {...props}
            className={`w-full rounded-xl border px-3.5 py-3 text-[13px] font-bold outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20
                ${isDark
                    ? 'border-slate-800 bg-black/60 text-white'
                    : 'border-slate-200 bg-white text-slate-900'}
                ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
        >
            {safeOptions.map(opt => typeof opt === 'string' ? (
                <option key={opt} value={opt} className={isDark ? "bg-slate-900" : "bg-white"}>{opt}</option>
            ) : (
                <option key={opt.value} value={opt.value} className={isDark ? "bg-slate-900" : "bg-white"}>{opt.label}</option>
            ))}
        </select>
    )
}

/**
 * RxvTextarea - Textarea padrão com estilo Neon
 */
export const RxvTextarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) => {
    const isDark = getIsDark();
    return (
        <textarea
            {...props}
            className={`w-full rounded-xl border px-3.5 py-3 text-[13px] font-bold outline-none transition-all focus:border-[#39ff14]/50 focus:ring-1 focus:ring-[#39ff14]/20 min-h-[96px] resize-none
        ${isDark
                    ? 'border-slate-800 bg-black/60 text-white placeholder:text-slate-700'
                    : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}
        ${props.error ? 'border-red-500/50 focus:border-red-500' : ''} ${props.className || ''}`}
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

const RXV_BTN_CLASSES: Record<RxvButtonVariant, string> = {
    primary: 'inline-flex items-center gap-2 rounded-xl border border-[#39ff14]/40 bg-[#39ff14]/15 px-3.5 py-2 text-[13px] font-bold text-[#39ff14] transition-all hover:bg-[#39ff14]/25 hover:border-[#39ff14]/60 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2 text-[13px] font-bold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'inline-flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-900/20 px-3.5 py-2 text-[13px] font-bold text-red-300 transition-all hover:bg-red-900/40 hover:border-red-700/60 disabled:opacity-50 disabled:cursor-not-allowed',
}

const RXV_BTN_LIGHT: Record<RxvButtonVariant, string> = {
    primary: 'inline-flex items-center gap-2 rounded-xl border border-[#39ff14]/40 bg-[#39ff14]/10 px-3.5 py-2 text-[13px] font-bold text-[#2fb011] transition-all hover:bg-[#39ff14]/20 hover:border-[#39ff14]/60 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2 text-[13px] font-bold text-red-600 transition-all hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed',
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
    const isDark = getIsDark();
    return (
        <button
            type={type}
            {...props}
            disabled={props.disabled || loading}
            className={`${isDark ? RXV_BTN_CLASSES[variant] : RXV_BTN_LIGHT[variant]} ${className}`}
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
