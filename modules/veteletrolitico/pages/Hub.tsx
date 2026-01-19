import React from 'react'
import {
    LayoutDashboard,
    Calculator,
    Book,
    History,
    Settings,
    Plus,
    LogOut,
    Menu,
    Search,
    Sun,
    Bell,
    ArrowRight,
    ExternalLink,
    Droplets,
    Stethoscope
} from 'lucide-react'

interface HubProps {
    onNavigate: (screen: string) => void
}

export const Hub: React.FC<HubProps> = ({ onNavigate }) => {
    return (
        <div className="font-display bg-vet-bg-light dark:bg-vet-bg-dark text-slate-900 dark:text-white transition-colors duration-200 h-full flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-vet-surface-dark/80 backdrop-blur-md px-6 py-4">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-slate-500 dark:text-slate-400">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
                </div>
                <div className="flex flex-1 justify-end items-center gap-4 sm:gap-6">
                    {/* Search Bar */}
                    <div className="hidden sm:flex max-w-md flex-1">
                        <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <Search className="w-5 h-5" />
                            </span>
                            <input
                                className="h-10 w-full rounded-lg border-none bg-slate-100 dark:bg-slate-700/50 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-vet-primary/50 transition-all"
                                placeholder="Buscar paciente, histórico ou guia..."
                                type="text"
                            />
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Sun className="w-5 h-5" />
                        </button>
                        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-vet-primary ring-2 ring-white dark:ring-vet-surface-dark"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-8 flex-1 overflow-y-auto">
                {/* Welcome/Headline */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Acesso Rápido</h1>
                    <p className="text-slate-500 dark:text-slate-400">Selecione uma ferramenta para iniciar o atendimento.</p>
                </div>

                {/* Main Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calculator Card */}
                    <button
                        onClick={() => onNavigate('identification')}
                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-vet-surface-dark p-0 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg hover:border-vet-primary/50 text-left"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-vet-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div className="flex flex-col sm:flex-row h-full">
                            <div
                                className="h-48 sm:h-auto sm:w-1/3 w-full bg-cover bg-center relative"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoj46UMyZNyszbhWcv3SsiynXmR5ESaBcrFVhwmZ44zLkQONHykvjp1wwbOiAZNiS0ei_ro6fhzLgfuBuiGdC0tlnNdy5UnrclQLdV6uTMwtOt0gHXmJDQo-md6vWX9rQRvMkzJ7N8sOdMShwRmpvTSdVSat_OUOWrZJBV9XugamrNI0FJg2M8ep5XOraWBeKAKyFAb_PN9SYwQP6wDhLOkP4udF5_QEgtSznbQrGqrRdnXeIu3FOWi1Fx3TyKfmnWCzwpoHVJzO0D")' }}
                            >
                                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply transition-colors group-hover:bg-slate-900/20"></div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-6 z-10">
                                <div>
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20 text-vet-primary">
                                        <Calculator className="w-6 h-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Calculadora de Reposição</h3>
                                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                        Calcule terapias de fluidos e reposição eletrolítica para cães e gatos com precisão baseada no peso e desidratação.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-vet-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all group-hover:bg-vet-primary-hover group-hover:shadow-lg group-hover:shadow-orange-500/30">
                                        <span>Iniciar Cálculo</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Clinical Guide Card */}
                    <button
                        onClick={() => onNavigate('library')}
                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-vet-surface-dark p-0 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg hover:border-blue-500/50 text-left"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div className="flex flex-col sm:flex-row h-full">
                            <div
                                className="h-48 sm:h-auto sm:w-1/3 w-full bg-cover bg-center relative"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7y-spq_sBdB_L8AIFp6SslS4ftglCwC4robC4hPeSn0qGFzxPFpkI8NpMGjkLFEEDUX28fn32AV8HWEX-6sT1ygOUhaNI9EY64xbycSdVlUNgjoVlSsufSGyCekLEhoZASyiwtW5xhIyBJvfOJjF8Ip5xeWKC4zZwQ4ogd-a2xVf5mSjcm1VIWDhDm3esVJBpEK3ApRWYCNsN4GBZLX0ap09K_ctyJ8b_OYgFdMnEKegVC5dPpqI2zQKUhTMRHNAN7u4N6TyGZbpe")' }}
                            >
                                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply transition-colors group-hover:bg-slate-900/20"></div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-6 z-10">
                                <div>
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                        <Stethoscope className="w-6 h-6" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Condições Clínicas</h3>
                                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                        Guia de referência rápida para avaliação de desidratação, tabelas de choque e desequilíbrios eletrolíticos comuns.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-700 px-5 py-2.5 text-sm font-bold text-slate-900 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-slate-600">
                                        <span>Acessar Guia</span>
                                        <Book className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Recent Activity / Stats Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Atividade Recente</h2>
                        <button className="text-sm font-medium text-vet-primary hover:text-vet-primary-hover">Ver tudo</button>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-vet-surface-dark shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Paciente</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Tipo</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Cálculo</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Data</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-vet-primary">
                                                    <span className="material-symbols-outlined text-sm">pets</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900 dark:text-white">Thor</span>
                                                    <span className="text-xs text-slate-500">Golden Retriever</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Canino</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                                                Manutenção
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Hoje, 10:42</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-vet-primary dark:hover:text-vet-primary transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                                    <span className="material-symbols-outlined text-sm">pets</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900 dark:text-white">Luna</span>
                                                    <span className="text-xs text-slate-500">Siamês</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Felino</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
                                                Choque
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Ontem, 16:15</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-vet-primary dark:hover:text-vet-primary transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
