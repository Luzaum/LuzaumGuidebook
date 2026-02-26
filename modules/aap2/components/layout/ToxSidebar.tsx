import React from 'react';

function IconBase({ children, ...props }: any) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    )
}

const Icons = {
    Dashboard: (p: any) => (
        <IconBase {...p}>
            <path d="M3 13h8V3H3v10z" />
            <path d="M13 21h8V11h-8v10z" />
            <path d="M13 3h8v6h-8V3z" />
            <path d="M3 21h8v-6H3v6z" />
        </IconBase>
    ),
    FileText: (p: any) => (
        <IconBase {...p}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8" />
            <path d="M8 17h8" />
            <path d="M8 9h3" />
        </IconBase>
    ),
    Book: (p: any) => (
        <IconBase {...p}>
            <path d="M4 19a2 2 0 0 0 2 2h14" />
            <path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5z" />
            <path d="M8 7h8" />
        </IconBase>
    ),
    Clipboard: (p: any) => (
        <IconBase {...p}>
            <path d="M9 3h6" />
            <path d="M9 5h6" />
            <path d="M9 3a2 2 0 0 0-2 2v1H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2" />
            <path d="M8 12h8" />
            <path d="M8 16h6" />
        </IconBase>
    ),
    Search: (p: any) => (
        <IconBase {...p}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
        </IconBase>
    ),
    Sparkles: (p: any) => (
        <IconBase {...p}>
            <path d="M12 2l1.2 3.7L17 7l-3.8 1.3L12 12l-1.2-3.7L7 7l3.8-1.3L12 2z" />
            <path d="M19 11l.7 2.1L22 14l-2.3.9L19 17l-.7-2.1L16 14l2.3-.9L19 11z" />
            <path d="M4 13l.9 2.6L8 17l-3.1 1.4L4 21l-.9-2.6L0 17l3.1-1.4L4 13z" />
        </IconBase>
    ),
    Settings: (p: any) => (
        <IconBase {...p}>
            <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" />
            <path d="M19.4 15a7.8 7.8 0 0 0 .1-2l2-1.2-2-3.5-2.3.7a7.9 7.9 0 0 0-1.7-1l-.3-2.4H10.8l-.3 2.4a7.9 7.9 0 0 0-1.7 1l-2.3-.7-2 3.5 2 1.2a7.8 7.8 0 0 0 .1 2l-2 1.2 2 3.5 2.3-.7c.5.4 1.1.7 1.7 1l.3 2.4h4.4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.7 2-3.5-2-1.2z" />
        </IconBase>
    ),
    LifeBuoy: (p: any) => (
        <IconBase {...p}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M4.9 4.9l4.2 4.2" />
            <path d="M14.9 14.9l4.2 4.2" />
            <path d="M19.1 4.9l-4.2 4.2" />
            <path d="M9.1 14.9l-4.2 4.2" />
        </IconBase>
    ),
    PanelLeft: (p: any) => (
        <IconBase {...p}>
            <path d="M3 4h18v16H3V4z" />
            <path d="M9 4v16" />
        </IconBase>
    ),
    LogOut: (p: any) => (
        <IconBase {...p}>
            <path d="M10 17l-1 0a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1" />
            <path d="M14 7l5 5-5 5" />
            <path d="M19 12H10" />
        </IconBase>
    ),
}

const GROUPS = [
    {
        title: "MENU PRINCIPAL",
        items: [
            { key: "home", label: "Dashboard", icon: Icons.Dashboard },
            { key: "enciclopedia", label: "Enciclopédia", icon: Icons.FileText },
            { key: "tratamentos", label: "Protocolos", icon: Icons.Clipboard },
        ],
    },
    {
        title: "FERRAMENTAS",
        items: [
            { key: "suspeitas", label: "Suspeitas", icon: Icons.Search },
            { key: "histórico", label: "Dr. Luzaum AI", icon: Icons.Sparkles, badge: "NOVO" },
        ],
    },
    {
        title: "SISTEMA",
        items: [
            { key: "config", label: "Configurações", icon: Icons.Settings },
            { key: "suporte", label: "Suporte", icon: Icons.LifeBuoy },
        ],
    },
]

export function ToxSidebar({
    activeKey = "home",
    className = "",
    collapsed = false,
    onToggleCollapsed,
    onNavigate,
    onBackToHub,
    isDarkMode
}: any) {
    return (
        <aside
            className={
                "relative h-screen shrink-0 bg-transparent " +
                (collapsed ? "w-[92px]" : "w-[280px]") +
                " transition-[width] duration-300 ease-out " +
                className
            }
            aria-label="Sidebar"
            style={{ zIndex: 40 }}
        >
            <style>{`
          @keyframes sb-sheen {
            0% { transform: translate3d(-30%, 0, 0) }
            100% { transform: translate3d(30%, 0, 0) }
          }
          @keyframes sb-glow {
            0% { opacity: 0.25 }
            50% { opacity: 0.55 }
            100% { opacity: 0.25 }
          }
          @keyframes sb-float {
            0% { transform: translate3d(0, 0, 0) }
            50% { transform: translate3d(0, -5px, 0) }
            100% { transform: translate3d(0, 0, 0) }
          }
        `}</style>
            <div
                className={
                    "relative m-4 h-[calc(100%-2rem)] overflow-hidden rounded-3xl " +
                    (isDarkMode ? "bg-slate-900/40 ring-1 ring-white/10 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.85)]" : "bg-white/40 ring-1 ring-black/5 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.55)]") +
                    " backdrop-blur-2xl"
                }
            >
                {/* borda + efeitos constantes */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl z-0">
                    <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(37,99,235,0.10), rgba(239,68,68,0.08))",
                            border: isDarkMode ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(124,58,237,0.14)",
                        }}
                    />
                    <div
                        className="absolute -inset-10 blur-3xl"
                        style={{
                            background:
                                "radial-gradient(closest-side, rgba(124,58,237,0.18), transparent 70%)",
                            animation: "sb-glow 5.5s ease-in-out infinite",
                        }}
                    />
                    <div
                        className="absolute -inset-16 opacity-[0.22]"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.22) 40%, transparent 75%)",
                            animation: "sb-sheen 6.8s ease-in-out infinite",
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(0,0,0,1) 1px, transparent 0)",
                            backgroundSize: "18px 18px",
                        }}
                    />
                </div>

                {/* Header */}
                <div className="relative px-5 pt-5 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={
                                    "relative flex h-11 w-11 items-center justify-center rounded-2xl " +
                                    (isDarkMode ? "bg-slate-800/60 ring-1 ring-white/10" : "bg-white/60 ring-1 ring-black/5") +
                                    " backdrop-blur flex-shrink-0"
                                }
                                style={{
                                    boxShadow:
                                        "0 18px 36px -28px rgba(124,58,237,0.55), 0 0 0 1px rgba(124,58,237,0.12)",
                                }}
                            >
                                <span className="text-xl" aria-hidden>
                                    🐾
                                </span>
                                <div
                                    className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)",
                                        animation: "sb-glow 4.4s ease-in-out infinite",
                                    }}
                                />
                            </div>

                            {!collapsed ? (
                                <div className="min-w-0">
                                    <div className={`truncate text-sm font-semibold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-zinc-900'}`}>AAP2 Vetius</div>
                                    <div className="text-[11px] font-semibold tracking-wide text-violet-600">TOXICOLOGIA</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className={`mt-5 h-px w-full bg-gradient-to-r from-transparent ${isDarkMode ? 'via-white/10' : 'via-zinc-900/10'} to-transparent`} />
                </div>

                {/* Nav */}
                <nav className="relative flex h-[calc(100%-180px)] flex-col gap-5 px-4 pb-4 pt-4 z-10 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {GROUPS.map((g) => (
                        <div key={g.title} className="space-y-2">
                            <div
                                className={
                                    "px-2 text-[11px] font-semibold tracking-widest " +
                                    (isDarkMode ? "text-slate-400 " : "text-zinc-500 ") +
                                    (collapsed ? "text-center" : "")
                                }
                            >
                                {collapsed ? "•" : g.title}
                            </div>

                            <div className="space-y-1">
                                {g.items.map((it) => (
                                    <SidebarItem
                                        key={it.key}
                                        item={it}
                                        active={it.key === activeKey}
                                        collapsed={collapsed}
                                        onNavigate={onNavigate}
                                        isDarkMode={isDarkMode}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex-1" />

                    {/* Card do usuário */}
                    <div
                        className={
                            "relative overflow-hidden rounded-3xl p-3 backdrop-blur " +
                            (isDarkMode ? "bg-slate-800/35 ring-1 ring-white/10 shadow-[0_18px_46px_-36px_rgba(0,0,0,0.85)]" : "bg-white/35 ring-1 ring-black/5 shadow-[0_18px_46px_-36px_rgba(0,0,0,0.55)]")
                        }
                    >
                        <div
                            className="pointer-events-none absolute -inset-10 blur-3xl"
                            style={{
                                background:
                                    "radial-gradient(closest-side, rgba(124,58,237,0.16), transparent 70%)",
                                animation: "sb-glow 6.2s ease-in-out infinite",
                            }}
                        />

                        <div className={"relative flex items-center gap-3 " + (collapsed ? "justify-center" : "")}>
                            <div
                                className={"h-10 w-10 shrink-0 rounded-2xl " + (isDarkMode ? "bg-slate-700/70 ring-1 ring-white/10" : "bg-white/70 ring-1 ring-black/5")}
                                style={{ boxShadow: "0 14px 30px -24px rgba(0,0,0,0.45)" }}
                            >
                                <div className={`grid h-full w-full place-items-center text-sm font-semibold  ${isDarkMode ? 'text-slate-200' : 'text-zinc-700'}`}>DJ</div>
                            </div>

                            {!collapsed ? (
                                <div className="min-w-0">
                                    <div className={`truncate text-sm font-semibold ${isDarkMode ? 'text-slate-100' : 'text-zinc-900'}`}>Dr. Julia Santos</div>
                                    <div className={`truncate text-xs ${isDarkMode ? 'text-slate-400' : 'text-zinc-600'}`}>Veterinária Chefe</div>
                                </div>
                            ) : null}

                            {!collapsed ? (
                                <button
                                    onClick={onBackToHub}
                                    type="button"
                                    className={
                                        "ml-auto inline-flex h-10 w-10 items-center justify-center rounded-2xl backdrop-blur transition-all duration-200 " +
                                        (isDarkMode ? "bg-slate-800/55 ring-1 ring-white/10 hover:bg-slate-700/75 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)]" : "bg-white/55 ring-1 ring-black/5 hover:bg-white/75 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]")
                                    }
                                    aria-label="Sair"
                                    title="Sair"
                                >
                                    <Icons.LogOut className={`h-5 w-5 ${isDarkMode ? 'text-slate-200' : 'text-zinc-700'}`} />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

function SidebarItem({ item, active, collapsed, onNavigate, isDarkMode }: any) {
    const Icon = item.icon

    return (
        <button
            type="button"
            onClick={() => {
                if (typeof onNavigate === "function") onNavigate(item.key)
            }}
            className={
                "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 " +
                (collapsed ? "justify-center" : "") +
                " " +
                (active
                    ? (isDarkMode ? "bg-slate-700/55 shadow-[0_18px_46px_-38px_rgba(124,58,237,0.75)]" : "bg-white/55 shadow-[0_18px_46px_-38px_rgba(124,58,237,0.55)]")
                    : (isDarkMode ? "hover:bg-slate-800/45" : "hover:bg-white/45"))
            }
            aria-current={active ? "page" : undefined}
        >
            {/* marcador lateral */}
            <span
                className={
                    "pointer-events-none absolute left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full " +
                    (active ? "opacity-100" : "opacity-0 group-hover:opacity-60")
                }
                style={{
                    background: "rgb(124, 58, 237)",
                    boxShadow: "0 0 0 1px rgba(124,58,237,0.18), 0 10px 30px rgba(124,58,237,0.28)",
                    transition: "opacity 200ms ease",
                }}
            />

            <div
                className={
                    "relative inline-flex h-10 w-10 items-center justify-center rounded-2xl " +
                    (isDarkMode ? "bg-slate-800/55 ring-1 ring-white/10" : "bg-white/55 ring-1 ring-black/5") +
                    " backdrop-blur transition-all duration-200 " +
                    (active ? "" : (isDarkMode ? "group-hover:bg-slate-700/70" : "group-hover:bg-white/70"))
                }
                style={{
                    boxShadow: active
                        ? "0 16px 36px -30px rgba(124,58,237,0.6), 0 0 0 1px rgba(124,58,237,0.12)"
                        : "0 14px 30px -26px rgba(0,0,0,0.35)",
                    animation: active ? "sb-float 4.8s ease-in-out infinite" : undefined,
                }}
            >
                <Icon className={"h-5 w-5 " + (active ? "text-violet-600" : (isDarkMode ? "text-slate-300" : "text-zinc-700"))} />
                <div
                    className={
                        "pointer-events-none absolute -inset-6 rounded-full blur-2xl transition-opacity duration-200 " +
                        (active ? "opacity-100" : "opacity-0 group-hover:opacity-70")
                    }
                    style={{
                        background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)",
                    }}
                />
            </div>

            {!collapsed ? (
                <div className="min-w-0">
                    <div className={"truncate text-sm font-semibold " + (active ? (isDarkMode ? "text-white" : "text-zinc-900") : (isDarkMode ? "text-slate-300" : "text-zinc-800"))}>
                        {item.label}
                    </div>
                </div>
            ) : null}

            {!collapsed && item.badge ? (
                <span className="ml-auto rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                </span>
            ) : null}

            <div
                className={
                    "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200 " +
                    (active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
                }
                style={{
                    boxShadow: active
                        ? "inset 0 0 0 1px rgba(124,58,237,0.22)"
                        : (isDarkMode ? "inset 0 0 0 1px rgba(255,255,255,0.06)" : "inset 0 0 0 1px rgba(0,0,0,0.06)"),
                }}
            />
        </button>
    )
}


