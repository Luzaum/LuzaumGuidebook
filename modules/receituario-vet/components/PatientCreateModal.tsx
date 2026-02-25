import React, { useEffect, useState } from 'react'
import type { DataAdapter, DataAdapterPatientMatch } from '../adapters'
import type { PatientInfo, TutorInfo } from '../rxTypes'
import { TutorQuickSelect } from './TutorQuickSelect'

type PatientCreateModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  adapter: DataAdapter
  onCreatedAndPicked: (payload: DataAdapterPatientMatch) => void
  onError?: (error: unknown) => void
}

type TutorMode = 'existing' | 'new'

type PatientFormState = {
  name: string
  species: PatientInfo['species']
  breed: string
  sex: PatientInfo['sex']
  reproductiveStatus: PatientInfo['reproductiveStatus']
  ageText: string
  birthDate: string
  coat: string
  weightKg: string
  weightDate: string

  anamnesis: string
  notes: string
}

type NewTutorFormState = {
  name: string
  phone: string
  email: string
  cpf: string
  rg: string
  addressStreet: string
  addressNumber: string
  addressComplement: string
  addressDistrict: string
  addressCity: string
  addressState: string
  addressZip: string
  notes: string
}

const INITIAL_PATIENT_FORM: PatientFormState = {
  name: '',
  species: 'Canina',
  breed: '',
  sex: 'Sem dados',
  reproductiveStatus: 'Sem dados',
  ageText: '',
  birthDate: '',
  coat: '',
  weightKg: '',
  weightDate: '',

  anamnesis: '',
  notes: '',
}

const INITIAL_NEW_TUTOR_FORM: NewTutorFormState = {
  name: '',
  phone: '',
  email: '',
  cpf: '',
  rg: '',
  addressStreet: '',
  addressNumber: '',
  addressComplement: '',
  addressDistrict: '',
  addressCity: '',
  addressState: '',
  addressZip: '',
  notes: '',
}

function parseErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Não foi possível salvar. Verifique conexao/permissao.'
}

export function PatientCreateModal({
  open,
  onOpenChange,
  adapter,
  onCreatedAndPicked,
  onError,
}: PatientCreateModalProps) {
  const [mode, setMode] = useState<TutorMode>('existing')
  const [patientForm, setPatientForm] = useState<PatientFormState>(INITIAL_PATIENT_FORM)
  const [selectedTutor, setSelectedTutor] = useState<TutorInfo | null>(null)
  const [newTutorForm, setNewTutorForm] = useState<NewTutorFormState>(INITIAL_NEW_TUTOR_FORM)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!open) {
      setMode('existing')
      setPatientForm(INITIAL_PATIENT_FORM)
      setSelectedTutor(null)
      setNewTutorForm(INITIAL_NEW_TUTOR_FORM)
      setSaving(false)
      setErrorMessage('')
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (saving) return
    setErrorMessage('')

    const patientName = patientForm.name.trim()
    if (!patientName) {
      setErrorMessage('Informe o nome do paciente.')
      return
    }

    setSaving(true)
    try {
      let tutor: TutorInfo
      if (mode === 'existing') {
        if (!selectedTutor?.tutorRecordId || !String(selectedTutor.name || '').trim()) {
          setErrorMessage('Selecione um tutor para continuar.')
          setSaving(false)
          return
        }
        tutor = selectedTutor
      } else {
        const tutorName = newTutorForm.name.trim()
        if (!tutorName) {
          setErrorMessage('Informe o nome do tutor.')
          setSaving(false)
          return
        }
        tutor = await adapter.createTutor({
          name: tutorName,
          phone: newTutorForm.phone || undefined,
          email: newTutorForm.email || undefined,
          cpf: newTutorForm.cpf || undefined,
          rg: newTutorForm.rg || undefined,
          street: newTutorForm.addressStreet || undefined,
          number: newTutorForm.addressNumber || undefined,
          complement: newTutorForm.addressComplement || undefined,
          neighborhood: newTutorForm.addressDistrict || undefined,
          city: newTutorForm.addressCity || undefined,
          state: newTutorForm.addressState || undefined,
          zipcode: newTutorForm.addressZip || undefined,
          notes: newTutorForm.notes || undefined,
        })
      }

      const patient = await adapter.createPatient({
        tutorRecordId: tutor.tutorRecordId,
        name: patientName,
        species: patientForm.species,
        breed: patientForm.breed || undefined,
        sex: patientForm.sex,
        reproductiveStatus: patientForm.reproductiveStatus,
        ageText: patientForm.ageText || undefined,
        birthDate: patientForm.birthDate || undefined,
        coat: patientForm.coat || undefined,
        weightKg: patientForm.weightKg || undefined,
        weightDate: patientForm.weightDate || undefined,

        anamnesis: patientForm.anamnesis || undefined,
        notes: patientForm.notes || undefined,
      })

      onCreatedAndPicked({ patient, tutor })
      onOpenChange(false)
    } catch (error) {
      onError?.(error)
      setErrorMessage(parseErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={() => {
        if (!saving) onOpenChange(false)
      }}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#2f5b25] bg-[#13220f] text-slate-100 shadow-[0_0_40px_rgba(56,255,20,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#274b20] bg-[#11200e] px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">Novo paciente</h2>
            <p className="text-xs text-slate-400">Cadastre paciente e vincule a um tutor em um unico fluxo.</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-[#3f6f31] px-3 py-1.5 text-sm hover:bg-[#1e3818]"
            onClick={() => {
              if (!saving) onOpenChange(false)
            }}
          >
            Fechar
          </button>
        </div>

        <form className="space-y-6 p-5" onSubmit={handleSubmit}>
          <section className="rounded-xl border border-[#315d28] bg-[#10210d] p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#9ce88e]">Paciente</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="text-xs text-slate-300 md:col-span-2">
                Nome do paciente *
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.name}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Ex.: Jade"
                  required
                />
              </label>
              <label className="text-xs text-slate-300">
                Especie
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.species}
                  onChange={(event) =>
                    setPatientForm((prev) => ({ ...prev, species: event.target.value as PatientInfo['species'] }))
                  }
                >
                  <option value="Canina">Canina</option>
                  <option value="Felina">Felina</option>
                </select>
              </label>
              <label className="text-xs text-slate-300">
                Raca
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.breed}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, breed: event.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-300">
                Sexo
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.sex}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, sex: event.target.value as PatientInfo['sex'] }))}
                >
                  <option value="Macho">Macho</option>
                  <option value="F\u00eamea">Femea</option>
                  <option value="Sem dados">Sem dados</option>
                </select>
              </label>
              <label className="text-xs text-slate-300">
                Condição reprodutiva
                <select
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.reproductiveStatus}
                  onChange={(event) =>
                    setPatientForm((prev) => ({
                      ...prev,
                      reproductiveStatus: event.target.value as PatientInfo['reproductiveStatus'],
                    }))
                  }
                >
                  <option value="Castrado">Castrado</option>
                  <option value="F\u00e9rtil">Fertil</option>
                  <option value="Sem dados">Sem dados</option>
                </select>
              </label>
              <label className="text-xs text-slate-300">
                Idade (texto)
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.ageText}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, ageText: event.target.value }))}
                  placeholder="Ex.: 4 anos"
                />
              </label>
              <label className="text-xs text-slate-300">
                Data de nascimento
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.birthDate}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, birthDate: event.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-300">
                Pelagem
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.coat}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, coat: event.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-300">
                Peso (kg)
                <input
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.weightKg}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, weightKg: event.target.value }))}
                  placeholder="Ex.: 12.4"
                />
              </label>
              <label className="text-xs text-slate-300">
                Data do peso
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.weightDate}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, weightDate: event.target.value }))}
                />
              </label>

              <label className="text-xs text-slate-300 md:col-span-2">
                Anamnese / Histórico
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.anamnesis}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, anamnesis: event.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-300 md:col-span-2">
                Observações do paciente
                <textarea
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                  value={patientForm.notes}
                  onChange={(event) => setPatientForm((prev) => ({ ...prev, notes: event.target.value }))}
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-[#315d28] bg-[#10210d] p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#9ce88e]">Tutor</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${mode === 'existing' ? 'border-[#5ab24a] bg-[#1f3a19] text-[#a8f59b]' : 'border-[#335d2a] text-slate-300'
                  }`}
                onClick={() => setMode('existing')}
              >
                Selecionar tutor existente
              </button>
              <button
                type="button"
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${mode === 'new' ? 'border-[#5ab24a] bg-[#1f3a19] text-[#a8f59b]' : 'border-[#335d2a] text-slate-300'
                  }`}
                onClick={() => setMode('new')}
              >
                Criar novo tutor
              </button>
            </div>

            {mode === 'existing' ? (
              <div className="space-y-2">
                <label className="text-xs text-slate-300">
                  Buscar tutor
                  <div className="mt-1">
                    <TutorQuickSelect
                      adapter={adapter}
                      value={selectedTutor}
                      onPick={(tutor) => {
                        setSelectedTutor(tutor)
                        setErrorMessage('')
                      }}
                      onError={onError}
                    />
                  </div>
                </label>
                {selectedTutor ? (
                  <p className="text-xs text-[#9ce88e]">
                    Selecionado: {selectedTutor.name} {selectedTutor.phone ? `- ${selectedTutor.phone}` : ''}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">Nenhum tutor selecionado.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="text-xs text-slate-300 md:col-span-2">
                  Nome do tutor *
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.name}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, name: event.target.value }))}
                    required={mode === 'new'}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Telefone
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.phone}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  E-mail
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.email}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  CPF
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.cpf}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, cpf: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  RG
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.rg}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, rg: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300 md:col-span-2">
                  Rua
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressStreet}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressStreet: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Número
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressNumber}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressNumber: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Complemento
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressComplement}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressComplement: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Bairro
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressDistrict}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressDistrict: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Cidade
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressCity}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressCity: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  Estado
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressState}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressState: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300">
                  CEP
                  <input
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.addressZip}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, addressZip: event.target.value }))}
                  />
                </label>
                <label className="text-xs text-slate-300 md:col-span-2">
                  Observações
                  <textarea
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white"
                    value={newTutorForm.notes}
                    onChange={(event) => setNewTutorForm((prev) => ({ ...prev, notes: event.target.value }))}
                  />
                </label>
              </div>
            )}
          </section>

          {errorMessage ? (
            <div className="rounded-lg border border-red-800/70 bg-red-950/40 px-3 py-2 text-sm text-red-200">{errorMessage}</div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="rounded-lg border border-[#3f6f31] px-4 py-2 text-sm text-slate-200 hover:bg-[#1e3818]"
              disabled={saving}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg border border-[#4dac40] bg-[#2b5a21] px-4 py-2 text-sm font-semibold text-[#b9ffae] hover:bg-[#336c27] disabled:opacity-70"
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar e usar na receita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
