import React, { ChangeEvent, useMemo, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useClinic } from '../../src/components/ClinicProvider'
import { supabase } from '../../src/lib/supabaseClient'
import { useLocalDraft } from '../../hooks/useLocalDraft'
import ReceituarioChrome from './ReceituarioChrome'
import {
  ProfileSettings,
  createPrescriberProfileFromSettings,
  loadRxDb,
  saveRxDb,
  upsertPrescriberProfile,
  updateProfile,
  removePrescriberProfile,
} from './rxDb'
import {
  PROFILE_IMAGE_FIELDS,
  isDataImageUrl,
  removeProfileImageByUrl,
  uploadProfileImageDataUrl,
} from './rxSupabaseStorage'

const MAX_UPLOAD_DIMENSION = 1200
const MAX_DATA_URL_LENGTH = 1_400_000
const IMAGE_QUALITY_STEPS = [0.92, 0.82, 0.72, 0.62, 0.52, 0.45]

function emptyProfile(): ProfileSettings {
  return {
    adminId: 'ADMIN',
    fullName: '',
    crmv: '',
    uf: 'SP',
    specialty: '',
    clinicName: '',
    clinicCnpj: '',
    clinicAddress: '',
    clinicPhone: '',
    clinicLogoDataUrl: '',
    signatureDataUrl: '',
    mapaSignatureDataUrl: '',
  }
}

function isQuotaExceededError(error: unknown): boolean {
  if (typeof DOMException !== 'undefined' && error instanceof DOMException) {
    return error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
  }

  if (error instanceof Error) {
    return /quota|exceeded.*quota|ns_error_dom_quota_reached/i.test(error.message)
  }

  return false
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo selecionado.'))
    reader.readAsDataURL(file)
  })
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Não foi possível processar a imagem selecionada.'))
    }
    image.src = objectUrl
  })
}

async function optimizeImageDataUrl(file: File): Promise<string> {
  const image = await loadImage(file)
  const maxSide = Math.max(image.width, image.height)
  const scale = maxSide > MAX_UPLOAD_DIMENSION ? MAX_UPLOAD_DIMENSION / maxSide : 1
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Não foi possível preparar a imagem para upload.')
  }

  context.drawImage(image, 0, 0, width, height)

  for (const quality of IMAGE_QUALITY_STEPS) {
    const dataUrl = canvas.toDataURL('image/webp', quality)
    if (dataUrl.length <= MAX_DATA_URL_LENGTH) {
      return dataUrl
    }
  }

  return canvas.toDataURL('image/webp', IMAGE_QUALITY_STEPS[IMAGE_QUALITY_STEPS.length - 1])
}

async function toStorableImageDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Selecione apenas arquivos de imagem.')
  }

  if (file.size <= 350_000) {
    return readFileAsDataUrl(file)
  }

  return optimizeImageDataUrl(file)
}

export default function ProfilePage() {
  // E1/E2: clinicId necessário para o path do upload de assinatura/logo
  const { clinicId } = useClinic()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const initialDb = useMemo(() => loadRxDb(), [])
  const initialProfiles = initialDb.prescriberProfiles.length > 0
    ? initialDb.prescriberProfiles
    : [createPrescriberProfileFromSettings(initialDb.profile, 'Perfil padrão', 'default')]

  const [db, setDb] = useState(initialDb)
  const [profiles, setProfiles] = useState(initialProfiles)
  const [selectedProfileId, setSelectedProfileId] = useState(initialProfiles[0]?.id || 'default')
  const [profileName, setProfileName] = useState(initialProfiles[0]?.profileName || 'Perfil padrão')
  const [profile, setProfile] = useState<ProfileSettings>({ ...initialProfiles[0], adminId: 'ADMIN' })
  const [saved, setSaved] = useState(false)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const [profileDraftState, setProfileDraftState, clearProfileDraft, hasProfileDraft] = useLocalDraft<{
    selectedProfileId: string
    profileName: string
    profile: ProfileSettings
  }>(
    'config-medico',
    clinicId || null,
    currentUserId,
    {
      selectedProfileId: '',
      profileName: '',
      profile: emptyProfile(),
    }
  )

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data }) => setCurrentUserId(data?.user?.id || null))
      .catch(() => setCurrentUserId(null))
  }, [])

  // Não sobrescreve entidade existente: reidrata apenas quando draft aponta "novo" ou id inexistente.
  useEffect(() => {
    if (!hasProfileDraft) return
    const draft = profileDraftState
    if (!draft?.profile) return
    const exists = profiles.some((p) => p.id === draft.selectedProfileId)
    if (exists && draft.selectedProfileId !== 'new') return
    setSelectedProfileId(draft.selectedProfileId || 'new')
    setProfileName(draft.profileName || 'Perfil padrão')
    setProfile({ ...draft.profile, adminId: 'ADMIN' })
  }, [hasProfileDraft, profileDraftState, profiles])

  useEffect(() => {
    setProfileDraftState({ selectedProfileId, profileName, profile })
  }, [profile, profileName, selectedProfileId, setProfileDraftState])

  const currentProfileExists = profiles.some((entry) => entry.id === selectedProfileId)

  const onUpload = (field: 'clinicLogoDataUrl' | 'signatureDataUrl' | 'mapaSignatureDataUrl') => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSaveError('')
    try {
      const dataUrl = await toStorableImageDataUrl(file)
      setProfile((prev) => ({ ...prev, [field]: dataUrl }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível carregar a imagem.'
      setSaveError(message)
    } finally {
      event.target.value = ''
    }
  }

  const loadProfile = (profileId: string) => {
    const selected = profiles.find((entry) => entry.id === profileId)
    if (!selected) return
    setSelectedProfileId(selected.id)
    setProfileName(selected.profileName)
    setProfile({
      adminId: 'ADMIN',
      fullName: selected.fullName,
      crmv: selected.crmv,
      uf: selected.uf,
      specialty: selected.specialty,
      clinicName: selected.clinicName,
      clinicCnpj: selected.clinicCnpj,
      clinicAddress: selected.clinicAddress,
      clinicPhone: selected.clinicPhone,
      clinicLogoDataUrl: selected.clinicLogoDataUrl,
      signatureDataUrl: selected.signatureDataUrl,
      mapaSignatureDataUrl: selected.mapaSignatureDataUrl,
    })
  }

  const newProfile = () => {
    setSelectedProfileId('new')
    setProfileName('')
    setProfile(emptyProfile())
    setSaveError('')
  }

  const deleteProfile = async () => {
    if (profiles.length <= 1) {
      alert('Não é possível excluir o único perfil existente.')
      return
    }
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este perfil de prescritor permanente? (Rascunhos também perderão referência a ele)')
    if (!confirmDelete) return

    try {
      setSaving(true)
      const baseDb = loadRxDb()

      let nextDb = removePrescriberProfile(baseDb, selectedProfileId)
      saveRxDb(nextDb)

      const hydratedProfiles = nextDb.prescriberProfiles.length > 0
        ? nextDb.prescriberProfiles
        : [createPrescriberProfileFromSettings(nextDb.profile, 'Perfil padrão', 'default')]

      setDb(nextDb)
      setProfiles(hydratedProfiles)

      const newSelected = hydratedProfiles[0]
      setSelectedProfileId(newSelected.id)
      setProfileName(newSelected.profileName)
      setProfile({
        adminId: 'ADMIN',
        fullName: newSelected.fullName,
        crmv: newSelected.crmv,
        uf: newSelected.uf,
        specialty: newSelected.specialty,
        clinicName: newSelected.clinicName,
        clinicCnpj: newSelected.clinicCnpj,
        clinicAddress: newSelected.clinicAddress,
        clinicPhone: newSelected.clinicPhone,
        clinicLogoDataUrl: newSelected.clinicLogoDataUrl,
        signatureDataUrl: newSelected.signatureDataUrl,
        mapaSignatureDataUrl: newSelected.mapaSignatureDataUrl,
      })
      clearProfileDraft()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const saveProfile = async () => {
    setSaving(true)
    setSaveError('')

    try {
      const normalizedName = profileName.trim() || 'Perfil sem nome'
      const baseDb = loadRxDb()
      const activeStoredProfile = currentProfileExists
        ? profiles.find((entry) => entry.id === selectedProfileId) || null
        : null
      const profileToPersist: ProfileSettings = { ...profile, adminId: 'ADMIN' }

      for (const field of PROFILE_IMAGE_FIELDS) {
        const nextValue = profileToPersist[field]
        if (!isDataImageUrl(nextValue)) continue

        // E2: Passar clinicId para que o path comece com UUID (evita erro 22P02)
        const uploaded = await uploadProfileImageDataUrl({
          dataUrl: nextValue,
          field,
          profileId: currentProfileExists ? selectedProfileId : normalizedName,
          clinicId: clinicId || undefined,
        })

        const previousValue = String(activeStoredProfile?.[field] || '').trim()
        profileToPersist[field] = uploaded.publicUrl
        if (previousValue && previousValue !== uploaded.publicUrl) {
          void removeProfileImageByUrl(previousValue)
        }
      }

      const nextProfile = createPrescriberProfileFromSettings(
        profileToPersist,
        normalizedName,
        currentProfileExists ? selectedProfileId : undefined
      )

      let nextDb = updateProfile(baseDb, profileToPersist)
      nextDb = upsertPrescriberProfile(nextDb, nextProfile)

      saveRxDb(nextDb)
      const hydratedProfiles = nextDb.prescriberProfiles.length > 0
        ? nextDb.prescriberProfiles
        : [createPrescriberProfileFromSettings(nextDb.profile, 'Perfil padrão', 'default')]

      setDb(nextDb)
      setProfiles(hydratedProfiles)
      setSelectedProfileId(nextProfile.id)
      setProfileName(nextProfile.profileName)
      setProfile({
        adminId: 'ADMIN',
        fullName: nextProfile.fullName,
        crmv: nextProfile.crmv,
        uf: nextProfile.uf,
        specialty: nextProfile.specialty,
        clinicName: nextProfile.clinicName,
        clinicCnpj: nextProfile.clinicCnpj,
        clinicAddress: nextProfile.clinicAddress,
        clinicPhone: nextProfile.clinicPhone,
        clinicLogoDataUrl: nextProfile.clinicLogoDataUrl,
        signatureDataUrl: nextProfile.signatureDataUrl,
        mapaSignatureDataUrl: nextProfile.mapaSignatureDataUrl,
      })

      setSaveModalOpen(false)
      setSaved(true)
      clearProfileDraft()
      window.setTimeout(() => setSaved(false), 2200)
    } catch (error) {
      if (isQuotaExceededError(error)) {
        setSaveError('Não foi possível salvar: armazenamento do navegador cheio. Reduza o tamanho das imagens e tente novamente.')
      } else {
        const message = error instanceof Error ? error.message : 'Não foi possível salvar este perfil.'
        setSaveError(message)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <ReceituarioChrome
      section="perfil"
      title="Configuração do Perfil"
      subtitle="Configure uma vez e reutilize automaticamente nas próximas receitas."
      actions={
        <>
          <Link to="/receituario-vet/catalogo" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm">
            <span className="material-symbols-outlined text-[18px]">medication</span>
            Catálogo
          </Link>
          <button type="button" className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm" onClick={newProfile}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Novo perfil
          </button>
          <button
            type="button"
            className="rxv-btn-secondary inline-flex items-center gap-2 px-3 py-2 text-sm disabled:opacity-50"
            onClick={() => {
              clearProfileDraft()
              newProfile()
            }}
            disabled={!hasProfileDraft}
          >
            <span className="material-symbols-outlined text-[18px]">ink_eraser</span>
            Limpar rascunho
          </button>

          {currentProfileExists && profiles.length > 1 && (
            <button
              type="button"
              className="group/btn inline-flex items-center gap-1 rounded-lg border border-red-700/60 bg-red-950/20 px-3 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-red-900/30 hover:text-red-100"
              onClick={deleteProfile}
              disabled={saving}
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Excluir
            </button>
          )}

          <button
            type="button"
            className="rxv-btn-primary inline-flex items-center gap-2 px-3 py-2 text-sm"
            onClick={() => {
              setSaveError('')
              setSaveModalOpen(true)
            }}
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Salvar Perfil
          </button>
        </>
      }
    >
      <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <label className="text-xs text-slate-400 lg:col-span-2">
          Perfil ativo
          <select
            className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
            value={selectedProfileId}
            onChange={(e) => loadProfile(e.target.value)}
          >
            {profiles.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.profileName} - {entry.clinicName || 'Sem clínica'}
              </option>
            ))}
          </select>
        </label>
        <div className="rxv-card flex items-center justify-between px-4 py-3">
          <p className="text-sm">
            ID do sistema: <span className="font-bold text-[#61eb48]">ADMIN</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rxv-card p-5 lg:col-span-7">
          <h2 className="mb-4 text-lg font-bold">Dados Profissionais</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="text-sm md:col-span-2">
              Nome completo
              <input className="mt-1 w-full px-3 py-2" value={profile.fullName} onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))} />
            </label>
            <label className="text-sm">
              CRMV
              <input className="mt-1 w-full px-3 py-2" value={profile.crmv} onChange={(e) => setProfile((prev) => ({ ...prev, crmv: e.target.value }))} />
            </label>
            <label className="text-sm">
              UF
              <select className="mt-1 w-full px-3 py-2" value={profile.uf} onChange={(e) => setProfile((prev) => ({ ...prev, uf: e.target.value }))}>
                <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option><option value="AM">AM</option>
                <option value="BA">BA</option><option value="CE">CE</option><option value="DF">DF</option><option value="ES">ES</option>
                <option value="GO">GO</option><option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option><option value="PR">PR</option>
                <option value="PE">PE</option><option value="PI">PI</option><option value="RJ">RJ</option><option value="RN">RN</option>
                <option value="RS">RS</option><option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
              </select>
            </label>
            <label className="text-sm md:col-span-2">
              Especialidade
              <input className="mt-1 w-full px-3 py-2" value={profile.specialty} onChange={(e) => setProfile((prev) => ({ ...prev, specialty: e.target.value }))} />
            </label>
            <label className="text-sm md:col-span-2">
              Nome da clínica
              <input className="mt-1 w-full px-3 py-2" value={profile.clinicName} onChange={(e) => setProfile((prev) => ({ ...prev, clinicName: e.target.value }))} />
            </label>
            <label className="text-sm">
              CNPJ
              <input className="mt-1 w-full px-3 py-2" value={profile.clinicCnpj} onChange={(e) => setProfile((prev) => ({ ...prev, clinicCnpj: e.target.value }))} />
            </label>
            <label className="text-sm">
              Telefone / WhatsApp
              <input className="mt-1 w-full px-3 py-2" value={profile.clinicPhone} onChange={(e) => setProfile((prev) => ({ ...prev, clinicPhone: e.target.value }))} />
            </label>
            <label className="text-sm md:col-span-2">
              Endereço completo da clínica
              <textarea className="mt-1 w-full px-3 py-2" rows={3} value={profile.clinicAddress} onChange={(e) => setProfile((prev) => ({ ...prev, clinicAddress: e.target.value }))} />
            </label>
          </div>
        </section>

        <section className="space-y-6 lg:col-span-5">
          <div className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold">Assinatura Digital / Carimbo</h3>
              <label className="rxv-btn-secondary inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs">
                <span className="material-symbols-outlined text-[16px]">upload</span>
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={onUpload('signatureDataUrl')} />
              </label>
            </div>
            <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-black/5 p-4">
              {profile.signatureDataUrl ? (
                <img src={profile.signatureDataUrl} alt="Assinatura digital" className="max-h-44 w-auto object-contain" />
              ) : (
                <p className="text-sm text-[color:var(--rxv-muted)]">Nenhuma assinatura enviada.</p>
              )}
            </div>
          </div>

          <div className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold">Assinatura GOV.BR (Controle Especial)</h3>
              <label className="rxv-btn-secondary inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs">
                <span className="material-symbols-outlined text-[16px]">upload</span>
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={onUpload('mapaSignatureDataUrl')} />
              </label>
            </div>
            <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-black/5 p-4">
              {profile.mapaSignatureDataUrl ? (
                <img src={profile.mapaSignatureDataUrl} alt="Assinatura GOV.BR" className="max-h-44 w-auto object-contain" />
              ) : (
                <p className="text-sm text-[color:var(--rxv-muted)]">Nenhuma assinatura GOV.BR enviada.</p>
              )}
            </div>
            <p className="mt-2 text-xs text-[color:var(--rxv-muted)]">
              Essa assinatura aparece apenas em receitas de controle especial.
            </p>
          </div>

          <div className="rxv-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold">Logo da Clínica</h3>
              <label className="rxv-btn-secondary inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs">
                <span className="material-symbols-outlined text-[16px]">upload</span>
                Upload
                <input type="file" className="hidden" accept="image/*" onChange={onUpload('clinicLogoDataUrl')} />
              </label>
            </div>
            <div className="rounded-xl border border-dashed border-[color:var(--rxv-border)] bg-black/5 p-4">
              {profile.clinicLogoDataUrl ? (
                <img src={profile.clinicLogoDataUrl} alt="Logo da clínica" className="h-24 w-24 rounded-full object-cover" />
              ) : (
                <p className="text-sm text-[color:var(--rxv-muted)]">Nenhum logo enviado.</p>
              )}
            </div>
          </div>

          <div className="rxv-card p-5">
            <p className="text-sm text-[color:var(--rxv-muted)]">
              O perfil salvo poderá ser selecionado na tela de Nova Receita e importará CRMV, assinatura, logo e dados da clínica.
            </p>
          </div>
        </section>
      </div>

      {saveError && !saveModalOpen ? (
        <div className="mt-4 rounded-xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {saveError}
        </div>
      ) : null}

      {saveModalOpen ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 px-4 py-8" onClick={() => setSaveModalOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">Salvar perfil</h3>
            <p className="mt-1 text-sm text-[color:var(--rxv-muted)]">Dê um nome para este perfil para reutilizar em novas receitas.</p>
            <label className="mt-4 block text-xs text-slate-400">
              Nome do perfil
              <input
                className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Ex.: Clínica Central - Dr. Carlos"
              />
            </label>
            {saveError ? (
              <p className="mt-3 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {saveError}
              </p>
            ) : null}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="rxv-btn-secondary px-3 py-2 text-sm" onClick={() => setSaveModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="rxv-btn-primary px-3 py-2 text-sm" onClick={saveProfile} disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar perfil'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {saved ? (
        <div className="fixed bottom-6 right-6 z-[120] rounded-xl border border-[color:var(--rxv-border)] bg-[color:var(--rxv-surface)] px-4 py-3 text-sm font-semibold text-[#67e952]">
          Perfil salvo com sucesso.
        </div>
      ) : null}
    </ReceituarioChrome>
  )
}

