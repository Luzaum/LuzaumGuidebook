import React, { useState } from 'react'
import { supabase } from '../src/lib/supabaseClient'

type TestResult = {
    status: 'idle' | 'loading' | 'ok' | 'error'
    data?: unknown
    error?: unknown
    ms?: number
}

export default function SupabaseTestPage() {
    const [result, setResult] = useState<TestResult>({ status: 'idle' })

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    const runTest = async () => {
        setResult({ status: 'loading' })
        const start = Date.now()
        try {
            const { data, error } = await supabase.auth.getSession()
            const ms = Date.now() - start
            console.log('[Supabase Test]', { data, error })
            if (error) {
                setResult({ status: 'error', error, ms })
            } else {
                setResult({ status: 'ok', data, ms })
            }
        } catch (e) {
            setResult({ status: 'error', error: e, ms: Date.now() - start })
        }
    }

    const statusColor: Record<string, string> = {
        idle: '#888',
        loading: '#f0a500',
        ok: '#00e676',
        error: '#ff1744',
    }

    const envOk = supabaseUrl && supabaseKey
    const urlMasked = supabaseUrl
        ? supabaseUrl.replace(/^(https:\/\/[^.]{4}).*(\..+)$/, '$1****$2')
        : '❌ NÃO DEFINIDA'
    const keyMasked = supabaseKey
        ? supabaseKey.slice(0, 20) + '...' + supabaseKey.slice(-6)
        : '❌ NÃO DEFINIDA'

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>🔌 Supabase Connection Test</h1>
                <p style={styles.subtitle}>Diagnóstico de integração — Vetius</p>

                {/* Env Vars Status */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Variáveis de Ambiente</h2>
                    <div style={styles.envRow}>
                        <span style={styles.envLabel}>VITE_SUPABASE_URL</span>
                        <code style={{ ...styles.envValue, color: supabaseUrl ? '#00e676' : '#ff1744' }}>
                            {urlMasked}
                        </code>
                    </div>
                    <div style={styles.envRow}>
                        <span style={styles.envLabel}>VITE_SUPABASE_ANON_KEY</span>
                        <code style={{ ...styles.envValue, color: supabaseKey ? '#00e676' : '#ff1744' }}>
                            {keyMasked}
                        </code>
                    </div>
                    {!envOk && (
                        <div style={styles.warning}>
                            ⚠️ Variáveis de ambiente não configuradas. Crie um arquivo <code>.env</code> na raiz do projeto.
                        </div>
                    )}
                </section>

                {/* Test Button */}
                <section style={styles.section}>
                    <button
                        onClick={runTest}
                        disabled={result.status === 'loading'}
                        style={{
                            ...styles.button,
                            opacity: result.status === 'loading' ? 0.6 : 1,
                            cursor: result.status === 'loading' ? 'wait' : 'pointer',
                        }}
                    >
                        {result.status === 'loading' ? '⏳ Testando...' : '▶ Testar Conexão'}
                    </button>
                </section>

                {/* Result */}
                {result.status !== 'idle' && (
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            Resultado{' '}
                            <span style={{ color: statusColor[result.status], fontSize: '0.85em' }}>
                                ● {result.status.toUpperCase()}
                            </span>
                            {result.ms !== undefined && (
                                <span style={{ color: '#888', fontSize: '0.75em', marginLeft: 8 }}>
                                    {result.ms}ms
                                </span>
                            )}
                        </h2>

                        {result.status === 'ok' && (
                            <div style={styles.successBox}>
                                ✅ Conexão com Supabase estabelecida com sucesso!
                                <br />
                                <span style={{ opacity: 0.7, fontSize: '0.85em' }}>
                                    Sessão ativa:{' '}
                                    {(result.data as { session: unknown })?.session
                                        ? '✅ Usuário logado'
                                        : '🔓 Nenhuma sessão (normal se não logado)'}
                                </span>
                            </div>
                        )}

                        {result.status === 'error' && (
                            <div style={styles.errorBox}>
                                ❌ Erro na conexão:
                                <pre style={styles.pre}>{JSON.stringify(result.error, null, 2)}</pre>
                            </div>
                        )}

                        <details style={styles.details}>
                            <summary style={styles.summary}>📄 Resposta completa (console)</summary>
                            <pre style={styles.pre}>{JSON.stringify(result.data ?? result.error, null, 2)}</pre>
                        </details>
                    </section>
                )}

                <p style={styles.hint}>
                    💡 Resultado completo também disponível no <strong>Console do navegador</strong> (F12 → Console)
                </p>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1a2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    card: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '2.5rem',
        maxWidth: '640px',
        width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
    },
    title: {
        color: '#ffffff',
        fontSize: '1.8rem',
        fontWeight: 700,
        margin: '0 0 0.25rem',
    },
    subtitle: {
        color: '#888',
        margin: '0 0 2rem',
        fontSize: '0.9rem',
    },
    section: {
        marginBottom: '1.75rem',
    },
    sectionTitle: {
        color: '#ccc',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '0.75rem',
        fontWeight: 600,
    },
    envRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.6rem 0.8rem',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        marginBottom: '0.5rem',
        gap: '1rem',
        flexWrap: 'wrap',
    },
    envLabel: {
        color: '#aaa',
        fontSize: '0.8rem',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
    },
    envValue: {
        fontSize: '0.78rem',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
    },
    warning: {
        marginTop: '0.75rem',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 152, 0, 0.1)',
        border: '1px solid rgba(255,152,0,0.3)',
        borderRadius: '8px',
        color: '#ffb74d',
        fontSize: '0.84rem',
        lineHeight: 1.5,
    },
    button: {
        background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        padding: '0.85rem 2rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: '0 4px 20px rgba(0,180,216,0.3)',
        width: '100%',
    },
    successBox: {
        padding: '1rem',
        background: 'rgba(0,230,118,0.08)',
        border: '1px solid rgba(0,230,118,0.25)',
        borderRadius: '8px',
        color: '#69f0ae',
        marginBottom: '1rem',
        lineHeight: 1.7,
    },
    errorBox: {
        padding: '1rem',
        background: 'rgba(255,23,68,0.08)',
        border: '1px solid rgba(255,23,68,0.25)',
        borderRadius: '8px',
        color: '#ff6e6e',
        marginBottom: '1rem',
    },
    details: {
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    summary: {
        padding: '0.6rem 0.9rem',
        cursor: 'pointer',
        color: '#aaa',
        fontSize: '0.85rem',
        userSelect: 'none',
    },
    pre: {
        margin: 0,
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)',
        color: '#b0bec5',
        fontSize: '0.78rem',
        overflowX: 'auto',
        fontFamily: 'monospace',
        lineHeight: 1.6,
    },
    hint: {
        color: '#555',
        fontSize: '0.8rem',
        textAlign: 'center',
        margin: '1.5rem 0 0',
    },
}
