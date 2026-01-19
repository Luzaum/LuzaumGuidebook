import React, { useState } from 'react'
import {
    Stethoscope,
    Dog,
    Cat,
    Clock,
    Weight,
    HeartPulse,
    Activity,
    Droplets,
    Syringe,
    ArrowRight,
    Info,
    CheckCircle,
    Menu,
    ChevronRight
} from 'lucide-react'

interface IdentificationProps {
    onNavigate: (screen: string) => void
}

export const Identification: React.FC<IdentificationProps> = ({ onNavigate }) => {
    const [species, setSpecies] = useState<'canine' | 'feline'>('canine')
    const [lifestage, setLifestage] = useState('adult')
    const [comorbidities, setComorbidities] = useState<string[]>(['cardiopata'])

    const toggleComorbidity = (id: string) => {
        if (comorbidities.includes(id)) {
            setComorbidities(comorbidities.filter(c => c !== id))
        } else {
            setComorbidities([...comorbidities, id])
        }
    }

    return (
        <div className="font-display bg-vet-bg-dark text-white antialiased h-full flex flex-col overflow-y-auto">
            <div className="relative flex h-auto min-h-full w-full flex-col">
                {/* Top Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-vet-surface-hover bg-[#221a11] px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-white">
                        <div className="w-8 h-8 text-vet-primary">
                            <Stethoscope className="w-8 h-8" />
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">VetFluid Calc</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="hidden md:flex items-center gap-9">
                            <button onClick={() => onNavigate('hub')} className="text-white hover:text-vet-primary transition-colors text-sm font-medium leading-normal">Dashboard</button>
                            <button className="text-vet-primary text-sm font-bold leading-normal border-b-2 border-vet-primary pb-0.5">Calculadora</button>
                            <button className="text-white hover:text-vet-primary transition-colors text-sm font-medium leading-normal">Histórico</button>
                            <button className="text-white hover:text-vet-primary transition-colors text-sm font-medium leading-normal">Configurações</button>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-vet-surface-hover"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbEOo3iUCVv2mxpfrjBCVKzOEWXIxQmEqup0z4vOQPgR8w0780C8V5LQGX_tP8PJt59kivMuh7WbtM0uFgWDasN8SHAGLRBPAcH19zlOVmdapNYqVcyfM40Q3HLvWgN_04UoltzTomvr6WA795BJ7yTHI0OUEtHwrQ3xI4oxAOts0tXTmR3Kv6lZhINhZrUcn5LTYN3L3GPGemvajQ8EF4_yMhMuuHaw6fv530bfYPpJTZym9nkQ2UmgPCj1ykUGFNHYUXH2FJ3-lB")' }}
                        ></div>
                    </div>
                </header>

                <main className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                        <div className="layout-content-container flex flex-col max-w-[1024px] flex-1">
                            {/* Progress Bar */}
                            <div className="flex flex-col gap-3 mb-8">
                                <div className="flex gap-6 justify-between items-center">
                                    <p className="text-vet-primary text-sm font-bold uppercase tracking-wider">Etapa 1 de 4: Identificação</p>
                                    <span className="text-vet-text-secondary text-xs">25% Completo</span>
                                </div>
                                <div className="rounded-full bg-vet-surface-hover h-2 overflow-hidden">
                                    <div className="h-full rounded-full bg-vet-primary shadow-[0_0_10px_rgba(236,127,19,0.5)]" style={{ width: '25%' }}></div>
                                </div>
                            </div>

                            {/* Page Heading */}
                            <div className="flex flex-col gap-2 mb-8">
                                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Dados do Paciente</h1>
                                <p className="text-vet-text-secondary text-lg font-normal leading-normal max-w-2xl">
                                    Preencha as informações clínicas básicas para iniciar o protocolo de reposição eletrolítica.
                                </p>
                            </div>

                            {/* Main Form Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                {/* Left Column: Basic Info */}
                                <div className="lg:col-span-7 flex flex-col gap-6">
                                    {/* Name Input */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white text-base font-bold leading-normal">Nome do Paciente</label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-vet-text-secondary group-focus-within:text-vet-primary transition-colors">
                                                <Dog className="w-5 h-5" />
                                            </span>
                                            <input
                                                className="flex w-full rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vet-primary/50 border border-vet-surface-hover bg-vet-input-bg focus:border-vet-primary h-14 placeholder:text-vet-text-secondary/50 pl-12 pr-4 text-base font-normal transition-all"
                                                placeholder="Ex: Rex, Luna, Thor..."
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    {/* Species Selector */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-white text-base font-bold leading-normal">Espécie</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Canine */}
                                            <button
                                                onClick={() => setSpecies('canine')}
                                                className={`relative flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${species === 'canine' ? 'border-vet-primary bg-vet-primary/10 text-vet-primary' : 'border-vet-surface-hover bg-vet-input-bg text-vet-text-secondary hover:border-vet-text-secondary/50 hover:text-white'}`}
                                            >
                                                {species === 'canine' && (
                                                    <div className="absolute top-2 right-2 text-vet-primary">
                                                        <CheckCircle className="w-5 h-5 fill-current" />
                                                    </div>
                                                )}
                                                <Dog className="w-10 h-10" />
                                                <div className="flex flex-col items-start">
                                                    <span className="font-bold text-lg">Canino</span>
                                                </div>
                                            </button>

                                            {/* Feline */}
                                            <button
                                                onClick={() => setSpecies('feline')}
                                                className={`relative flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${species === 'feline' ? 'border-vet-primary bg-vet-primary/10 text-vet-primary' : 'border-vet-surface-hover bg-vet-input-bg text-vet-text-secondary hover:border-vet-text-secondary/50 hover:text-white'}`}
                                            >
                                                {species === 'feline' && (
                                                    <div className="absolute top-2 right-2 text-vet-primary">
                                                        <CheckCircle className="w-5 h-5 fill-current" />
                                                    </div>
                                                )}
                                                <Cat className="w-10 h-10" />
                                                <div className="flex flex-col items-start">
                                                    <span className="font-bold text-lg">Felino</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Age & Weight Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-base font-bold leading-normal">Idade</label>
                                            <div className="flex">
                                                <input className="w-full rounded-l-xl border border-r-0 border-vet-surface-hover bg-vet-input-bg text-white focus:ring-0 focus:border-vet-primary h-14 px-4 placeholder:text-vet-text-secondary/50" placeholder="0" type="number" />
                                                <select className="rounded-r-xl border border-l-0 border-vet-surface-hover bg-vet-surface-dark text-white focus:ring-0 focus:border-vet-primary h-14 px-4 pr-8 font-medium">
                                                    <option>Anos</option>
                                                    <option>Meses</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-base font-bold leading-normal">Peso Atual (kg)</label>
                                            <div className="relative group">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-vet-text-secondary group-focus-within:text-vet-primary transition-colors">
                                                    <Weight className="w-5 h-5" />
                                                </span>
                                                <input className="w-full rounded-xl border border-vet-surface-hover bg-vet-input-bg text-white focus:ring-2 focus:ring-vet-primary/50 focus:border-vet-primary h-14 pl-12 pr-4 placeholder:text-vet-text-secondary/50" placeholder="0.0 kg" step="0.1" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Clinical Status */}
                                <div className="lg:col-span-5 flex flex-col gap-8 bg-vet-surface-dark/30 p-6 rounded-2xl border border-vet-surface-hover/50">
                                    {/* Life Stage */}
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="text-vet-primary w-5 h-5" />
                                            <h3 className="text-white text-lg font-bold">Fase da Vida</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Neonato', 'Filhote', 'Adulto', 'Sênior'].map((stage) => {
                                                const value = stage.toLowerCase()
                                                const isSelected = lifestage === value
                                                return (
                                                    <label key={stage} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="lifestage"
                                                            className="peer sr-only"
                                                            checked={isSelected}
                                                            onChange={() => setLifestage(value)}
                                                        />
                                                        <div className={`flex items-center justify-center px-4 py-3 rounded-lg border transition-all font-medium text-sm ${isSelected ? 'bg-vet-primary text-white border-vet-primary' : 'border-vet-surface-hover bg-vet-input-bg text-vet-text-secondary hover:bg-vet-surface-dark'}`}>
                                                            {stage}
                                                        </div>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Comorbidities */}
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <HeartPulse className="text-vet-primary w-5 h-5" />
                                            <h3 className="text-white text-lg font-bold">Comorbidades</h3>
                                        </div>
                                        <p className="text-xs text-vet-text-secondary mb-2">Selecione todas as condições aplicáveis.</p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'cardiopata', label: 'Cardiopata', icon: HeartPulse },
                                                { id: 'renopata', label: 'Renopata', icon: Droplets },
                                                { id: 'hepatopata', label: 'Hepatopata', icon: Activity },
                                                { id: 'hipoalbuminemia', label: 'Hipoalbuminemia', icon: Droplets }, // Using droplets as fluid/blood related
                                                { id: 'diabetico', label: 'Diabético', icon: Syringe },
                                            ].map((item) => {
                                                const isSelected = comorbidities.includes(item.id)
                                                const Icon = item.icon
                                                return (
                                                    <label key={item.id} className="cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            className="peer sr-only"
                                                            checked={isSelected}
                                                            onChange={() => toggleComorbidity(item.id)}
                                                        />
                                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all select-none ${isSelected ? 'border-vet-primary bg-vet-primary/20 text-vet-primary' : 'border-vet-surface-hover bg-vet-input-bg text-vet-text-secondary hover:border-vet-text-secondary hover:text-white'}`}>
                                                            <Icon className="w-[18px] h-[18px]" />
                                                            <span className="text-sm font-medium">{item.label}</span>
                                                        </div>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Info Alert */}
                                    <div className="mt-auto bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 flex gap-3">
                                        <Info className="text-blue-400 shrink-0 w-5 h-5" />
                                        <p className="text-sm text-blue-200">
                                            O cálculo de manutenção levará em conta os ajustes necessários para pacientes cardiopatas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-end items-center gap-4 mt-12 pt-6 border-t border-vet-surface-hover">
                                <button
                                    onClick={() => onNavigate('hub')}
                                    className="px-6 py-3 rounded-lg text-white font-medium hover:text-vet-primary transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => onNavigate('configuration')}
                                    className="flex items-center gap-2 px-8 py-3 rounded-lg bg-vet-primary text-white font-bold text-base hover:bg-vet-primary-hover transition-colors shadow-lg shadow-vet-primary/20"
                                >
                                    Próximo
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
