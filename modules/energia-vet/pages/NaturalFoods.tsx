import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Search, Plus, Filter, Leaf, Eye } from 'lucide-react';
import { Input } from '../components/ui/input';

export default function NaturalFoods() {
  const mockIngredients = [
    { id: 1, name: 'Peito de Frango (Cozido)', category: 'Proteína', kcal: 165, protein: 31, fat: 3.6 },
    { id: 2, name: 'Batata Doce (Cozida)', category: 'Carboidrato', kcal: 86, protein: 1.6, fat: 0.1 },
    { id: 3, name: 'Óleo de Peixe', category: 'Gordura/Ômega 3', kcal: 900, protein: 0, fat: 100 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
            <Leaf className="w-8 h-8" />
            Alimentação Natural
          </h1>
          <p className="text-muted-foreground mt-2">Banco de ingredientes e formulação de dietas caseiras.</p>
        </div>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4" /> Novo Ingrediente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banco de Ingredientes</CardTitle>
          <CardDescription>Estrutura pronta para receber a base de dados de alimentos naturais.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar ingrediente..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2 w-full sm:w-auto"><Filter className="w-4 h-4" /> Categoria</Button>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Ingrediente</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Energia (kcal/100g)</TableHead>
                  <TableHead>Proteína (g/100g)</TableHead>
                  <TableHead>Gordura (g/100g)</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIngredients.map((i) => (
                  <TableRow key={i.id} className="hover:bg-muted/30">
                    <TableCell className="font-semibold">{i.name}</TableCell>
                    <TableCell>{i.category}</TableCell>
                    <TableCell className="font-mono">{i.kcal}</TableCell>
                    <TableCell className="font-mono">{i.protein}</TableCell>
                    <TableCell className="font-mono">{i.fat}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" title="Ver Nutrientes">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 mt-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300">Próximos Passos (Arquitetura Pronta)</h4>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-2 leading-relaxed">
              O motor de cálculo já está preparado para receber a composição completa de vitaminas, minerais e aminoácidos de cada ingrediente, permitindo a formulação de protocolos naturais e mistos com análise de adequação frente ao FEDIAF.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

