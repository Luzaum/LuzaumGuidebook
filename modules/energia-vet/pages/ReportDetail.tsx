import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import ReportDetailView from '../components/ReportDetailView'
import { getSavedReportById } from '../lib/persistence'

const BASE_ROUTE = '/calculadora-energetica'

export default function ReportDetail() {
  const { reportId = '' } = useParams()
  const report = getSavedReportById(reportId)

  if (!report) {
    return (
      <div className="space-y-6">
        <Button variant="outline" render={<Link to={`${BASE_ROUTE}/reports`} />} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Card className="border-white/10 bg-[#141010]">
          <CardContent className="p-6 text-sm text-muted-foreground">Relatorio nao encontrado.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <Button variant="outline" render={<Link to={`${BASE_ROUTE}/reports`} />} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>
      <ReportDetailView report={report} />
    </div>
  )
}
