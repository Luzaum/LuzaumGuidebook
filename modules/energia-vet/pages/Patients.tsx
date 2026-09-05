import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowRight, CalendarDays, Plus, Search, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { getPatientStorageKey, getSavedPatients, getSavedReports } from '../lib/persistence'
import { listNutritionReportsFromSupabase, migrateLocalReportsToSupabase } from '../lib/supabaseReports'
import type { StoredCalculationReport } from '../types'

const NEW_ROUTE = '/calculadora-energetica/new'
const BASE_ROUTE = '/calculadora-energetica'

export default function Patients() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState(getSavedPatients())

  useEffect(() => {
    const fromReports = (reports: StoredCalculationReport[]) => {
      const patientMap = new Map<string, any>()
      for (const report of reports) {
        const patientKey = report.patientKey ?? getPatientStorageKey(report.patient)
        const current = patientMap.get(patientKey)
        if (!current) {
          patientMap.set(patientKey, {
            ...report.patient,
            patientKey,
            reportCount: 1,
            lastReportAt: report.createdAt,
            latestReportId: report.id,
          })
          continue
        }
        current.reportCount += 1
        if (new Date(report.createdAt).getTime() > new Date(current.lastReportAt).getTime()) {
          current.lastReportAt = report.createdAt
          current.latestReportId = report.id
          Object.assign(current, report.patient)
        }
      }
      return Array.from(patientMap.values()).sort(
        (left, right) => new Date(right.lastReportAt).getTime() - new Date(left.lastReportAt).getTime(),
      )
    }

    const sync = async () => {
      try {
        const localReports = getSavedReports()
        if (localReports.length) {
          await migrateLocalReportsToSupabase(localReports)
        }
        const remoteReports = await listNutritionReportsFromSupabase()
        setPatients(fromReports(remoteReports))
      } catch (e) {
        setPatients(getSavedPatients())
        const msg = e instanceof Error ? e.message : String(e)
        if (/nutrition_reports|PGRST205|schema cache|Could not find the table/i.test(msg)) {
          toast.warning(
            'A sincronização do histórico está indisponível. A lista mostra os dados salvos neste dispositivo.',
            { duration: 9000 },
          )
        } else if (/Cl[ií]nica ativa|Clinica ativa/i.test(msg)) {
          toast.warning('Selecione uma clínica ativa para sincronizar. A lista mostra apenas pacientes com relatórios locais.', { duration: 7000 })
        } else if (/autenticad|Usuario autenticado|User not found/i.test(msg)) {
          toast.warning('Inicie sessão para carregar dados da clínica na nuvem. A lista mostra apenas dados locais.', { duration: 7000 })
        } else {
          toast.warning('Não foi possível sincronizar com a nuvem. Mostrando pacientes a partir deste dispositivo.', { duration: 7000 })
        }
      }
    }
    void sync()
  }, [])

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return patients
    return patients.filter((patient) =>
      [patient.name, patient.ownerName, patient.breed]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [patients, query])

  const totalReports = useMemo(() => patients.reduce((sum, patient) => sum + patient.reportCount, 0), [patients])

  return (
    <div className="nutrition-page w-full space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div>
          <p className="nutrition-eyebrow">Acompanhamento</p>
          <h1>Pacientes</h1>
          <p>Históricos organizados por paciente para revisar evolução, prescrições e relatórios anteriores.</p>
        </div>
        <Button className="w-full gap-2 sm:w-auto" onClick={() => navigate(NEW_ROUTE)}><Plus className="h-4 w-4" /> Calculadora energética</Button>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className="nutrition-header-stat"><span>Pacientes</span><strong>{patients.length}</strong></div>
        <div className="nutrition-header-stat"><span>Relatórios</span><strong>{totalReports}</strong></div>
        <div className="nutrition-header-stat col-span-2 lg:col-span-1"><span>Resultados atuais</span><strong>{filteredPatients.length}</strong></div>
      </div>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b border-border p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Histórico clínico</CardTitle><CardDescription className="mt-1">A lista combina registros sincronizados e dados disponíveis neste dispositivo.</CardDescription></div>
            <div className="relative w-full lg:max-w-md"><Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Buscar pacientes" placeholder="Paciente, tutor ou raça" className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          {filteredPatients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Nenhum paciente encontrado. Salve um cálculo para iniciar o histórico.</div>
          ) : (
            <div className="grid gap-3 xl:grid-cols-2">
              {filteredPatients.map((patient) => (
                <Link key={patient.patientKey} to={`${BASE_ROUTE}/patients/${patient.patientKey}`} className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-card p-4 outline-none transition-colors duration-200 hover:border-primary/30 hover:bg-primary/[0.025] focus-visible:ring-3 focus-visible:ring-ring/25 sm:flex-row sm:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/[0.09] text-base font-semibold text-primary">{(patient.name ?? 'P').slice(0, 1).toUpperCase()}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><p className="truncate text-base font-semibold text-foreground">{patient.name ?? 'Paciente sem nome'}</p><Badge variant="outline">{patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'}</Badge></div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">Tutor: {patient.ownerName ?? 'não informado'}{patient.breed ? ` · ${patient.breed}` : ''}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span>{patient.currentWeight != null ? `${patient.currentWeight} kg` : 'Peso não informado'}</span><span>{patient.reportCount} relatório(s)</span><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(patient.lastReportAt).toLocaleDateString('pt-BR')}</span></div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
