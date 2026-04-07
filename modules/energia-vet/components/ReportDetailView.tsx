import { Download, Printer } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { StoredCalculationReport } from '../types'
import { exportReportPdf, printReportPdf } from '../lib/reportDocument'
import { buildPrintableReportViewModel } from '../lib/reportPresentation'
import PrintableReportDocument from './PrintableReportDocument'

export default function ReportDetailView({ report }: { report: StoredCalculationReport }) {
  const vm = buildPrintableReportViewModel(report)

  return (
    <div className="space-y-6">
      <style>{`@media print{body,html{background:white!important;color:black!important;padding:0!important;margin:0!important;}@page{size:A4;margin:12mm 14mm;}body *{visibility:hidden!important;}.print-hidden,.print-hidden *{display:none!important;}#print-report-root,#print-report-root *{visibility:visible!important;}#print-report-root{display:block!important;position:absolute;inset:0;width:100%;}.rx-page-break{break-before:page;}}`}</style>

      <div className="print-hidden print:hidden space-y-6">
        <Card className="border-white/10 bg-[#141010] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <CardHeader className="border-b border-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-2xl text-white">{report.patient.name || 'Paciente sem nome'}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Relatorio salvo em {new Date(report.createdAt).toLocaleString('pt-BR')}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => printReportPdf(report)}>
                  <Printer className="h-4 w-4" /> Imprimir PDF
                </Button>
                <Button size="sm" className="gap-2" onClick={() => exportReportPdf(report)}>
                  <Download className="h-4 w-4" /> Exportar PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <Card className="border-white/10 bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Resumo clínico</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  {vm.patientFields.concat(vm.clinicalFields).map((field) => (
                    <div key={field.label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      <p className="mt-1 font-semibold text-white">{field.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/[0.03]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">Energia e formulação</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  {vm.energyFields.concat(vm.targetFields).concat(vm.formulaMetaFields).map((field) => (
                    <div key={field.label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      <p className="mt-1 font-semibold text-white">{field.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Formula alimentar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {vm.formulaRows.map((row, index) => (
                  <div key={`${row[0]}-${index}`} className="grid gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-4">
                    <div><p className="text-xs text-muted-foreground">Alimento</p><p className="mt-1 font-semibold text-white">{row[0]}</p></div>
                    <div><p className="text-xs text-muted-foreground">Inclusao</p><p className="mt-1 font-semibold text-white">{row[1]}</p></div>
                    <div><p className="text-xs text-muted-foreground">Oferta diaria</p><p className="mt-1 font-semibold text-white">{row[2]}</p></div>
                    <div><p className="text-xs text-muted-foreground">Energia</p><p className="mt-1 font-semibold text-white">{row[3]}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <PrintableReportDocument report={report} className="hidden print:block" />
    </div>
  )
}
