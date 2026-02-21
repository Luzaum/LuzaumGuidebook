import React, { useMemo, useRef, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import { RxDatabase, loadRxDb, saveRxDb } from './rxDb'

const EXPORT_META_KEY = 'receituario-vet:last-export-at'
const IMPORT_META_KEY = 'receituario-vet:last-import-at'
const APPROX_LOCAL_LIMIT_BYTES = 50 * 1024 * 1024

interface BackupPayload {
  meta: {
    app: 'VETIUS-RECEITUARIO'
    version: number
    exportedAt: string
  }
  data: RxDatabase
}

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
  return `${(value / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string | null): string {
  if (!value) return 'Nunca'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Nunca'
  return parsed.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function readBackupPayload(raw: string): RxDatabase | null {
  try {
    const parsed = JSON.parse(raw) as Partial<BackupPayload> & Partial<RxDatabase>
    const candidate = parsed?.data && (parsed as BackupPayload).meta ? parsed.data : (parsed as Partial<RxDatabase>)
    if (!candidate || typeof candidate !== 'object') return null
    if (!candidate.profile) return null
    if (!Array.isArray(candidate.catalog)) return null
    if (!Array.isArray(candidate.protocols)) return null
    if (!Array.isArray(candidate.templates)) return null
    return candidate as RxDatabase
  } catch {
    return null
  }
}

export default function SettingsPage() {
  const [db, setDb] = useState(() => loadRxDb())
  const [toast, setToast] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const stats = useMemo(() => {
    const dbJson = JSON.stringify(db)
    const dbSize = new Blob([dbJson]).size
    const usagePct = Math.min(100, (dbSize / APPROX_LOCAL_LIMIT_BYTES) * 100)
    return {
      recipes: db.history.length,
      patients: db.patients.length,
      catalog: db.catalog.length,
      protocols: db.protocols.length,
      dbSize,
      usagePct,
      lastExportAt: formatDate(localStorage.getItem(EXPORT_META_KEY)),
      lastImportAt: formatDate(localStorage.getItem(IMPORT_META_KEY)),
    }
  }, [db])

  const pushToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2800)
  }

  const exportBackup = () => {
    const payload: BackupPayload = {
      meta: {
        app: 'VETIUS-RECEITUARIO',
        version: 1,
        exportedAt: new Date().toISOString(),
      },
      data: db,
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const stamp = new Date()
      .toLocaleString('sv-SE')
      .replace(' ', '_')
      .replace(/:/g, '-')
    const fileName = `vetius-backup-${stamp}.json`

    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    const now = new Date().toISOString()
    localStorage.setItem(EXPORT_META_KEY, now)
    pushToast('Backup exportado com sucesso.')
  }

  const importBackup = async (file?: File) => {
    if (!file) return
    setIsImporting(true)
    try {
      const raw = await file.text()
      const imported = readBackupPayload(raw)
      if (!imported) {
        pushToast('Arquivo inválido. Use um backup .JSON do VETIUS.')
        return
      }

      const confirm = window.confirm('Deseja substituir os dados locais atuais por este backup?')
      if (!confirm) return

      saveRxDb(imported)
      const normalized = loadRxDb()
      saveRxDb(normalized)
      setDb(normalized)
      localStorage.setItem(IMPORT_META_KEY, new Date().toISOString())
      pushToast('Backup restaurado com sucesso.')
    } catch {
      pushToast('Falha ao restaurar backup.')
    } finally {
      setIsImporting(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <ReceituarioChrome
      section="settings"
      title="Dados e Backup"
      subtitle="Gerencie armazenamento local, exporte seus registros e restaure backups com segurança."
      actions={
        <>
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm"
            onClick={() => pushToast('Integração em nuvem será liberada em uma próxima versão.')}
          >
            <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
            Conectar Conta
          </button>
          <button type="button" className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={exportBackup}>
            <span className="material-symbols-outlined text-[18px]">save</span>
            Baixar backup completo
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section className="rxv-card p-6 xl:col-span-8">
          <div className="mb-5 rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-2xl text-[#39ff14]">cloud_off</span>
                <div>
                  <h3 className="text-lg font-bold text-[color:var(--rxv-text)]">Modo Local-First Ativo</h3>
                  <p className="text-sm text-[color:var(--rxv-muted)]">
                    Seus dados estão salvos neste navegador. Exporte backups periodicamente para manter redundância.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-4">
              <h4 className="mb-2 text-base font-bold">Exportar Banco de Dados</h4>
              <p className="text-sm text-[color:var(--rxv-muted)]">Gera um arquivo .JSON com pacientes, receitas, protocolos e templates.</p>
              <button type="button" className="rxv-btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 px-3 py-2 text-sm" onClick={exportBackup}>
                <span className="material-symbols-outlined text-[18px]">download</span>
                Baixar backup completo
              </button>
              <p className="mt-3 text-xs text-[color:var(--rxv-muted)]">Última exportação: {stats.lastExportAt}</p>
            </article>

            <article className="rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-4">
              <h4 className="mb-2 text-base font-bold">Restaurar Backup</h4>
              <p className="text-sm text-[color:var(--rxv-muted)]">Substitui o banco atual por um arquivo de backup VETIUS.</p>
              <label className="mt-4 flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[color:var(--rxv-border)] bg-black/10 px-4 text-center text-sm text-[color:var(--rxv-muted)] hover:border-[#39ff14]/60">
                <span className="material-symbols-outlined mb-2 text-2xl">upload_file</span>
                Clique para selecionar arquivo .JSON
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(event) => importBackup(event.target.files?.[0])}
                  disabled={isImporting}
                />
              </label>
              <p className="mt-3 text-xs text-[color:var(--rxv-muted)]">Última restauração: {stats.lastImportAt}</p>
            </article>
          </div>
        </section>

        <aside className="space-y-6 xl:col-span-4">
          <section className="rxv-card p-5">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wide text-[color:var(--rxv-muted)]">Estatísticas Locais</h3>
            <div className="space-y-2">
              <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-sm">
                <strong>{stats.recipes}</strong> receitas registradas
              </div>
              <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-sm">
                <strong>{stats.patients}</strong> pacientes cadastrados
              </div>
              <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-sm">
                <strong>{stats.catalog}</strong> fármacos no catálogo
              </div>
              <div className="rounded-lg border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] px-3 py-2 text-sm">
                <strong>{stats.protocols}</strong> protocolos ativos
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface-2)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--rxv-muted)]">Armazenamento IndexedDB/local</p>
              <p className="mt-1 text-lg font-black">{formatBytes(stats.dbSize)}</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded bg-black/20">
                <div className="h-full bg-[#39ff14]" style={{ width: `${Math.max(3, stats.usagePct)}%` }} />
              </div>
              <p className="mt-1 text-xs text-[color:var(--rxv-muted)]">~{stats.usagePct.toFixed(1)}% de 50 MB estimados</p>
            </div>
          </section>

          <section className="rxv-card p-5">
            <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-[color:var(--rxv-muted)]">Boas Práticas</h3>
            <ul className="space-y-2 text-sm text-[color:var(--rxv-muted)]">
              <li>Faça backup semanal se não usa nuvem.</li>
              <li>Guarde o .JSON em local seguro (nuvem pessoal/HD externo).</li>
              <li>Antes de limpar o navegador, exporte seus dados.</li>
            </ul>
          </section>
        </aside>
      </div>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          {toast}
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}
