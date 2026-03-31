import { useMemo, useState } from 'react'
import { Download, FileText, Printer, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { toast } from 'sonner'
import { getSavedReports } from '../lib/persistence'

export default function Reports() {
  const [query, setQuery] = useState('')
  const reports = useMemo(() => getSavedReports(), [])

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return reports
    return reports.filter((report) =>
      [report.patient.name, report.patient.ownerName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [reports, query])

  const handleDownload = (patientName: string) => {
    toast.info(`Exportação PDF ainda não foi ligada. Relatório de ${patientName} já está salvo no módulo.`)
  }

  const handlePrint = (patientName: string) => {
    toast.info(`Use a tela de resumo para impressão imediata. Snapshot salvo: ${patientName}.`)
  }

  return (
    <div className="space-y-8 w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="w-8 h-8 text-primary" />
          Relatórios e histórico
        </h1>
        <p className="text-muted-foreground mt-2">Snapshots reais salvos ao finalizar o resumo nutricional.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico do Energia Vet</CardTitle>
          <CardDescription>Busca por paciente ou tutor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente ou tutor..."
              className="pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
              Nenhum relatório salvo ainda.
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Dieta</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Energia-alvo</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-muted/30">
                      <TableCell>{new Date(report.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="font-semibold">{report.patient.name ?? 'Paciente sem nome'}</TableCell>
                      <TableCell>{report.patient.ownerName ?? 'Sem tutor'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {report.diet.dietType === 'commercial' ? 'Comercial' : report.diet.dietType === 'natural' ? 'Natural' : 'Híbrida'}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.diet.entries.length}</TableCell>
                      <TableCell className="font-mono">{report.diet.targetEnergy.toFixed(0)} kcal/dia</TableCell>
                      <TableCell>{report.diet.requirementProfileId ? 'Selecionado' : 'Sem perfil'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" title="Baixar PDF" onClick={() => handleDownload(report.patient.name ?? 'Paciente')}>
                          <Download className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Imprimir" onClick={() => handlePrint(report.patient.name ?? 'Paciente')}>
                          <Printer className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
