import { useNavigate } from 'react-router-dom';
import { Search, Plus, Users, Calculator, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const NEW_ROUTE = '/calculadora-energetica/new';

export default function Patients() {
  const navigate = useNavigate();

  const mockPatients = [
    { id: 1, name: 'Rex', owner: 'João Silva', species: 'Cão', weight: 12.5, bcs: 5, date: '2026-03-20' },
    { id: 2, name: 'Mia', owner: 'Maria Souza', species: 'Gato', weight: 4.2, bcs: 6, date: '2026-03-22' },
    { id: 3, name: 'Thor', owner: 'Pedro Santos', species: 'Cão', weight: 28.0, bcs: 8, date: '2026-03-25' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <Users className="h-8 w-8 text-primary" />
            Pacientes
          </h1>
          <p className="mt-2 text-muted-foreground">Gerencie seus pacientes e históricos de consultas.</p>
        </div>
        <Button className="gap-2" onClick={() => navigate(NEW_ROUTE)}>
          <Plus className="h-4 w-4" /> Novo Paciente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>Busque ou filtre por tutor e espécie.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou tutor..." className="pl-9" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Espécie</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>ECC (BCS)</TableHead>
                  <TableHead>Última Consulta</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell>{p.owner}</TableCell>
                    <TableCell>
                      <Badge variant={p.species === 'Cão' ? 'default' : 'secondary'}>{p.species}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{p.weight} kg</TableCell>
                    <TableCell>
                      <Badge variant={p.bcs > 5 ? 'destructive' : p.bcs < 4 ? 'destructive' : 'outline'}>{p.bcs}/9</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.date}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button variant="ghost" size="icon" title="Ver Perfil">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Novo Cálculo" onClick={() => navigate(NEW_ROUTE)}>
                        <Calculator className="h-4 w-4 text-primary" />
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
