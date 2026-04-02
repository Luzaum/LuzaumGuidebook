import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import ReportDetailView from '../components/ReportDetailView'
import { getReportsByPatientKey } from '../lib/persistence'

const BASE_ROUTE = '/calculadora-energetica'

export default function PatientHistoryDetail() {
  const { patientKey = '' } = useParams()
  const reports = useMemo(() => getReportsByPatientKey(patientKey), [patientKey])
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id ?? '')
  const selectedReport = reports.find((report) => report.id === selectedReportId) ?? reports[0]

  if (!selectedReport) {
    return (
      <div className="space-y-6">
        <Button variant="outline" render={<Link to={`${BASE_ROUTE}/patients`} />} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Card className="border-white/10 bg-[#141010]">
          <CardContent className="p-6 text-sm text-muted-foreground">Nenhum relatorio encontrado para este paciente.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Historico do paciente</p>
          <h1 className="text-3xl font-bold text-white">{selectedReport.patient.name || 'Paciente sem nome'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{reports.length} relatorio(s) salvos localmente para este paciente.</p>
        </div>
        <Button variant="outline" render={<Link to={`${BASE_ROUTE}/patients`} />} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Card className="border-white/10 bg-[#141010] xl:sticky xl:top-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Relatorios salvos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => setSelectedReportId(report.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                  selectedReport.id === report.id
                    ? 'border-orange-400/50 bg-orange-500/10'
                    : 'border-white/10 bg-black/10 hover:border-orange-500/30'
                }`}
              >
                <p className="font-semibold text-white">{new Date(report.createdAt).toLocaleDateString('pt-BR')}</p>
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
