import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calculator, ChevronRight, Plus, Search, Users } from 'lucide-react'
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
      } catch {
        setPatients(getSavedPatients())
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

  return (
    <div className="space-y-8 w-full pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-white">
            <Users className="h-8 w-8 text-orange-300" />
            Histórico de pacientes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Cada paciente pode ter varios relatorios cronologicos. Clique para abrir a prescricao salva e exportar PDF.
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate(NEW_ROUTE)}>
          <Plus className="h-4 w-4" /> Novo calculo
        </Button>
      </div>

      <Card className="border-white/10 bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <CardHeader>
          <CardTitle className="text-white">Pacientes salvos localmente</CardTitle>
          <CardDescription>Busque por nome, tutor ou raca.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por paciente, tutor ou raca..." className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>

          {filteredPatients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-muted-foreground">
              Nenhum paciente encontrado. Salve um cálculo para popular o histórico.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {filteredPatients.map((patient) => (
                <Card key={patient.patientKey} className="border-white/10 bg-[#1a1413] transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-[0_16px_28px_rgba(249,115,22,0.08)]">
                  <CardContent className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-white">{patient.name ?? 'Paciente sem nome'}</p>
                        <p className="text-sm text-muted-foreground">{patient.ownerName ?? 'Tutor nao informado'}</p>
                      </div>
                      <Badge variant="outline">{patient.species === 'dog' ? 'Cao' : patient.species === 'cat' ? 'Gato' : 'Nao informado'}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                        <p className="text-[11px] text-muted-foreground">Peso atual</p>
                        <p className="mt-1 font-semibold text-white">{patient.currentWeight != null ? `${patient.currentWeight} kg` : '—'}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                        <p className="text-[11px] text-muted-foreground">Histórico</p>
                        <p className="mt-1 font-semibold text-white">{patient.reportCount} relatorio(s)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-muted-foreground">
                        Ultimo relatorio em {new Date(patient.lastReportAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" render={<Link to={`${BASE_ROUTE}/patients/${patient.patientKey}`} />} className="gap-2">
                          Ver detalhes <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Novo calculo" onClick={() => navigate(NEW_ROUTE)}>
                          <Calculator className="h-4 w-4 text-orange-300" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
