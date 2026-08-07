import { Download, Printer } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { StoredCalculationReport } from '../types'
import { buildVetiusNutritionPdfFilename, exportReportPdf, exportTechnicalReportPdf, exportTutorPlanPdf, printReportPdf, printTechnicalReportPdf, printTutorPlanPdf } from '../lib/reportDocument'
import { buildPrintableReportViewModel } from '../lib/reportPresentation'
import PrintableReportDocument from './PrintableReportDocument'

function FieldGrid({ fields }: { fields: Array<{ label: string; value: string }> }) {
  return <div className="grid gap-2 sm:grid-cols-2">{fields.map((field) => <div key={field.label} className="nutrition-metric"><span>{field.label}</span><strong>{field.value}</strong></div>)}</div>
}

export default function ReportDetailView({ report }: { report: StoredCalculationReport }) {
  const vm = buildPrintableReportViewModel(report)

  return (
    <div className="space-y-5">
      <style>{`@media print{body,html{background:white!important;color:black!important;padding:0!important;margin:0!important;}@page{size:A4;margin:12mm 14mm;}body *{visibility:hidden!important;}.print-hidden,.print-hidden *{display:none!important;}#print-report-root,#print-report-root *{visibility:visible!important;}#print-report-root{display:block!important;position:absolute;inset:0;width:100%;}.rx-page-break{break-before:page;}}`}</style>

      <div className="print-hidden space-y-5 print:hidden">
        <Card className="gap-0 py-0">
          <CardHeader className="border-b border-border p-5 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Relatório nutricional</p><CardTitle className="mt-1 text-2xl">{report.patient.name || 'Paciente sem nome'}</CardTitle><p className="mt-1 text-sm text-muted-foreground">Salvo em {new Date(report.createdAt).toLocaleString('pt-BR')}</p><p className="mt-2 max-w-xl truncate text-[11px] text-muted-foreground">{buildVetiusNutritionPdfFilename(report)}</p></div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2" onClick={() => printTutorPlanPdf(report)}><Printer className="h-4 w-4" /> Imprimir plano para o tutor</Button>
                <Button className="gap-2" onClick={() => exportTutorPlanPdf(report)}><Download className="h-4 w-4" /> Baixar plano para o tutor</Button>
                <Button variant="outline" className="gap-2" onClick={() => printTechnicalReportPdf(report)}><Printer className="h-4 w-4" /> Imprimir relatório técnico</Button>
                <Button variant="outline" className="gap-2" onClick={() => exportTechnicalReportPdf(report)}><Download className="h-4 w-4" /> Baixar relatório técnico</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5 lg:p-6">
            <div className="grid gap-5 xl:grid-cols-2">
              <section className="rounded-2xl border border-border p-4"><h2 className="mb-4 text-base font-semibold">Paciente e contexto clínico</h2><FieldGrid fields={vm.patientFields.concat(vm.clinicalFields)} /></section>
              <section className="rounded-2xl border border-border p-4"><h2 className="mb-4 text-base font-semibold">Energia e meta</h2><FieldGrid fields={vm.energyFields.concat(vm.targetFields).concat(vm.formulaMetaFields)} /></section>
            </div>

            <section className="overflow-hidden rounded-2xl border border-border">
              <div className="border-b border-border px-4 py-3.5"><h2 className="text-base font-semibold">Fórmula alimentar</h2><p className="mt-0.5 text-xs text-muted-foreground">Composição diária prescrita.</p></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead className="bg-muted/70 text-left text-xs text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Alimento</th><th className="px-4 py-3 font-medium">Inclusão</th><th className="px-4 py-3 font-medium">Oferta diária</th><th className="px-4 py-3 font-medium">Energia</th></tr></thead><tbody>{vm.formulaRows.map((row, index) => <tr key={`${row[0]}-${index}`} className="border-t border-border"><td className="px-4 py-3 font-semibold">{row[0]}</td><td className="px-4 py-3 text-muted-foreground">{row[1]}</td><td className="px-4 py-3 text-muted-foreground">{row[2]}</td><td className="px-4 py-3 text-muted-foreground">{row[3]}</td></tr>)}</tbody></table></div>
            </section>
          </CardContent>
        </Card>
      </div>

      <PrintableReportDocument report={report} className="hidden print:block" />
    </div>
  )
}
