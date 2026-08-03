import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import ReportDetailView from '../components/ReportDetailView'
import { getReportsByPatientKey } from '../lib/persistence'
import { listNutritionReportsByPatientKeyFromSupabase } from '../lib/supabaseReports'

const BASE_ROUTE = '/calculadora-energetica'

export default function PatientHistoryDetail() {
  const { patientKey = '' } = useParams()
  const [reports, setReports] = useState(() => getReportsByPatientKey(patientKey))
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id ?? '')
  const selectedReport = reports.find((report) => report.id === selectedReportId) ?? reports[0]

  useEffect(() => {
    const load = async () => {
      try {
        const remote = await listNutritionReportsByPatientKeyFromSupabase(patientKey)
        if (remote.length) {
          setReports(remote)
          setSelectedReportId((current) => current || remote[0].id)
          return
        }
      } catch {
        // fallback local
      }
      const local = getReportsByPatientKey(patientKey)
      setReports(local)
      setSelectedReportId((current) => current || local[0]?.id || '')
    }
    void load()
  }, [patientKey])

  if (!selectedReport) {
    return (
      <div className="space-y-6">
        <Button variant="outline" render={<Link to={`${BASE_ROUTE}/patients`} />} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">Nenhum relatorio encontrado para este paciente.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="nutrition-page space-y-6 pb-16">
      <header className="nutrition-page-header">
        <div>
          <p className="nutrition-eyebrow">Histórico do paciente</p>
          <h1>{selectedReport.patient.name || 'Paciente sem nome'}</h1>
          <p>{reports.length} relatório(s) disponível(is) para consulta.</p>
        </div>
        <Button variant="outline" render={<Link to={`${BASE_ROUTE}/patients`} />} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Card className="xl:sticky xl:top-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Relatórios salvos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => setSelectedReportId(report.id)}
                className={`w-full cursor-pointer rounded-2xl border px-4 py-4 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/25 ${
                  selectedReport.id === report.id
                    ? 'border-primary/45 bg-primary/[0.07]'
                    : 'border-border bg-card hover:border-primary/25 hover:bg-muted/50'
                }`}
              >
                <p className="font-semibold text-foreground">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {report.target.targetEnergy?.toFixed(0) ?? '—'} kcal/dia · {report.diet.entries.length} alimento(s)
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">{report.diet.dietType === 'commercial' ? 'Comercial' : report.diet.dietType === 'natural' ? 'Natural' : 'Hibrida'}</Badge>
                  <Badge variant="outline">{report.patient.species === 'dog' ? 'Cao' : 'Gato'}</Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <ReportDetailView report={selectedReport} />
      </div>
    </div>
  )
}
