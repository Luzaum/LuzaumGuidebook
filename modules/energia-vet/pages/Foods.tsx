import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, Plus, Filter, Utensils, Edit } from 'lucide-react';
import { Input } from '../components/ui/input';

export default function Foods() {
  const mockFoods = [
    { id: 1, brand: 'Royal Canin', name: 'Mini Adult', type: 'Seco', species: 'Cão', kcal: 3950, protein: 27 },
    { id: 2, brand: 'PremieR', name: 'Gatos Castrados', type: 'Seco', species: 'Gato', kcal: 3800, protein: 36 },
    { id: 3, brand: 'Hills', name: 'Prescription Diet w/d', type: 'Úmido', species: 'Cão', kcal: 850, protein: 5 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Utensils className="w-8 h-8 text-primary" />
            Banco de Alimentos
          </h1>
          <p className="text-muted-foreground mt-2">Gerencie rações comerciais e alimentos naturais.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Novo Alimento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alimentos Comerciais</CardTitle>
          <CardDescription>Busque por marca, nome ou tipo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou marca..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2 w-full sm:w-auto"><Filter className="w-4 h-4" /> Filtrar</Button>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Marca</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Espécie</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Energia (kcal/kg)</TableHead>
                  <TableHead>Proteína Bruta (%)</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFoods.map((f) => (
                  <TableRow key={f.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold">{f.brand}</TableCell>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>
                      <Badge variant={f.species === 'Cão' ? 'default' : 'secondary'}>{f.species}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{f.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{f.kcal}</TableCell>
                    <TableCell className="font-mono">{f.protein}%</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" title="Editar">
                        <Edit className="w-4 h-4 text-muted-foreground" />
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

