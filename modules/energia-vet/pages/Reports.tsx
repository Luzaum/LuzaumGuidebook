import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, Download, Printer, FileText, Eye } from 'lucide-react';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export default function Reports() {
  const mockReports = [
    { id: 1, patient: 'Rex', owner: 'João Silva', date: '2026-03-20', goal: 'Manutenção', kcal: 850, type: 'commercial' },
    { id: 2, patient: 'Mia', owner: 'Maria Souza', date: '2026-03-22', goal: 'Perda de Peso', kcal: 180, type: 'natural' },
    { id: 3, patient: 'Thor', owner: 'Pedro Santos', date: '2026-03-25', goal: 'Ganho de Peso', kcal: 1200, type: 'hybrid' },
  ];

  const handleDownloadPDF = (name: string) => {
    toast.success(`Baixando relatório de ${name} em PDF...`, {
      description: 'Esta funcionalidade será implementada em breve.',
    });
  };

  const handlePrint = (name: string) => {
    toast.success(`Preparando impressão para ${name}...`, {
      description: 'Esta funcionalidade será implementada em breve.',
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Relatórios e Histórico
          </h1>
          <p className="text-muted-foreground mt-2">Acesse os cálculos salvos, visualize resumos e exporte em PDF.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Cálculos</CardTitle>
          <CardDescription>Busque por paciente, tutor ou data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por paciente ou tutor..." className="pl-9" />
            </div>
            <Input type="date" className="w-full sm:w-auto" />
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Dieta</TableHead>
                  <TableHead>Energia Alvo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{r.date}</TableCell>
                    <TableCell className="font-semibold">{r.patient}</TableCell>
                    <TableCell>{r.owner}</TableCell>
                    <TableCell>
                      <Badge variant={r.goal === 'Manutenção' ? 'default' : r.goal === 'Perda de Peso' ? 'destructive' : 'secondary'}>
                        {r.goal}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {r.type === 'commercial' ? 'Comercial' : r.type === 'natural' ? 'Natural' : 'Híbrida'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{r.kcal} kcal/dia</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" title="Visualizar Resumo">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Baixar PDF" onClick={() => handleDownloadPDF(r.patient)}>
                        <Download className="w-4 h-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Imprimir" onClick={() => handlePrint(r.patient)}>
                        <Printer className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

