import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReceituarioChrome from './ReceituarioChrome'
import { RxvButton, RxvCard, RxvField, RxvInput, RxvSectionHeader, RxvToggle } from '../../src/components/receituario/RxvComponents'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import { createEmptyManipuladoV1, normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'
import { createAciclovirPastaOralFixture } from './manipuladosV1Fixtures'
import { deleteManipuladoV1, getManipuladoV1, listManipuladosV1, saveManipuladoV1, type ManipuladoV1Row } from '../../src/lib/manipuladosV1Records'
import { ManipuladosV1CatalogCard } from './components/ManipuladosV1CatalogCard'
import { ManipuladosV1Editor } from './components/ManipuladosV1Editor'

function rowToFormula(row: ManipuladoV1Row): ManipuladoV1Formula {
  return normalizeManipuladoV1(row.payload as Partial<ManipuladoV1Formula>)
}

export default function ManipuladosPage() {
  const { clinicId } = useClinic()
  const [rows, setRows] = useState<ManipuladoV1Row[]>([])
  const [search, setSearch] = useState('')
  const [controlledOnly, setControlledOnly] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [editorValue, setEditorValue] = useState<ManipuladoV1Formula | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const loadList = useCallback(async () => {
    if (!clinicId) return
    const next = await listManipuladosV1(clinicId)
    setRows(next)
  }, [clinicId])

  useEffect(() => {
    void loadList()
  }, [loadList])

  const filteredRows = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (!includeInactive && !row.is_active) return false
      if (controlledOnly && row.sale_classification !== 'controlled') return false
      if (!needle) return true
      return [row.name, row.indication_summary || '', row.description || '', row.pharmaceutical_form]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [controlledOnly, includeInactive, rows, search])

  const openItem = useCallback(async (id: string) => {
    if (!clinicId) return
    setLoading(true)
    try {
      const formula = await getManipuladoV1(clinicId, id)
      setEditorValue(formula)
      setSelectedId(id)
    } finally {
      setLoading(false)
    }
  }, [clinicId])

  useEffect(() => {
    if (!filteredRows.length) {
      setSelectedId('')
      setEditorValue(null)
      return
    }
    const selectedExists = filteredRows.some((row) => row.id === selectedId)
    if (!selectedExists && selectedId !== '__new__') {
      void openItem(filteredRows[0].id)
    }
  }, [filteredRows, selectedId, openItem])

  const handleNew = () => {
    if (!clinicId) return
    const next = createEmptyManipuladoV1(clinicId)
    setSelectedId('__new__')
    setEditorValue(next)
    setMessage('')
  }

  const handleLoadFixture = () => {
    if (!clinicId) return
    const next = createAciclovirPastaOralFixture(clinicId)
    setSelectedId('')
    setEditorValue(next)
    setMessage('Exemplo carregado: Aciclovir pasta oral sabor frango. Revise e salve para adicionar ao catálogo.')
  }

  const handleSave = async () => {
    if (!editorValue || !clinicId) return
    setSaving(true)
    setMessage('')
    try {
      const { data } = await supabase.auth.getUser()
      const saved = await saveManipuladoV1(normalizeManipuladoV1({
        ...editorValue,
        identity: {
          ...editorValue.identity,
          clinic_id: clinicId,
        },
      }), data.user?.id || null)
      await loadList()
      setSelectedId(saved.identity.id)
      setEditorValue(saved)
      setMessage('Manipulado V1 salvo no catálogo.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Falha ao salvar o manipulado V1.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!clinicId || !selectedId) return
    if (!window.confirm('Deseja excluir este manipulado V1 do catálogo?')) return
    await deleteManipuladoV1(clinicId, selectedId)
    setSelectedId('')
    setEditorValue(null)
    await loadList()
  }

  return (
    <ReceituarioChrome
      section="manipulados"
      title="Manipulados V1.0"
      subtitle="Catálogo clínico simplificado com entrada por texto, cadastro mínimo e preview único."
      actions={
        <>
          <RxvButton variant="secondary" onClick={() => void loadList()}>Atualizar</RxvButton>
          <RxvButton variant="secondary" onClick={handleLoadFixture}>Carregar exemplo</RxvButton>
          <RxvButton variant="secondary" onClick={handleNew}>Nova fórmula</RxvButton>
          <RxvButton variant="primary" onClick={() => void handleSave()} loading={!!saving} disabled={!editorValue}>Salvar manipulado</RxvButton>
        </>
      }
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-4 xl:sticky xl:top-6 xl:max-h-[calc(100vh-120px)] xl:overflow-y-auto">
          <RxvCard className="p-5">
            <RxvSectionHeader icon="science" title="Catálogo V1" subtitle="O runtime principal não depende mais do legado." />
            <RxvField label="Buscar">
              <RxvInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nome, forma, indicação..." />
            </RxvField>
            <div className="mt-4 flex flex-wrap gap-4">
              <RxvToggle checked={controlledOnly} onChange={setControlledOnly} label="Só controlados" />
              <RxvToggle checked={includeInactive} onChange={setIncludeInactive} label="Mostrar inativos" />
            </div>
          </RxvCard>

          <div className="space-y-2">
            {filteredRows.map((row) => (
              <ManipuladosV1CatalogCard key={row.id} item={rowToFormula(row)} active={selectedId === row.id} onClick={() => void openItem(row.id)} />
            ))}
            {!filteredRows.length ? (
              <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-8 text-sm text-slate-500">
                Nenhum manipulado V1 encontrado para os filtros atuais.
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 space-y-5">
          {message ? <div className="rounded-2xl border border-[#39ff14]/20 bg-[#143118] px-4 py-3 text-sm text-[#b7f6ad]">{message}</div> : null}
          {loading ? (
            <RxvCard className="p-6 text-sm text-slate-400">Carregando fórmula V1...</RxvCard>
          ) : editorValue ? (
            <ManipuladosV1Editor value={editorValue} onChange={setEditorValue} onSave={handleSave} onDelete={selectedId ? handleDelete : undefined} saving={saving} />
          ) : (
            <RxvCard className="p-6 text-sm text-slate-400">Selecione uma fórmula ou crie uma nova para começar.</RxvCard>
          )}
        </div>
      </div>
    </ReceituarioChrome>
  )
}
