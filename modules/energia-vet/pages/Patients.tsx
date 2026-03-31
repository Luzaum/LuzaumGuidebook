import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, Plus, Search, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { getSavedPatients } from '../lib/persistence'

const NEW_ROUTE = '/calculadora-energetica/new'

export default function Patients() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const patients = useMemo(() => getSavedPatients(), [])

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return patients
    return patients.filter((patient) =>
      [patient.name, patient.ownerName, patient.breed]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [patients, query])

  return (
    <div className="space-y-8 w-full pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <Users className="h-8 w-8 text-primary" />
            Pacientes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Lista derivada do histórico salvo do Energia Vet. Cada novo resumo persistido atualiza este painel.
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate(NEW_ROUTE)}>
          <Plus className="h-4 w-4" /> Novo cálculo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pacientes com histórico</CardTitle>
          <CardDescription>Busque por nome, tutor ou raça.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, tutor ou raça..."
              className="pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {filteredPatients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
              Nenhum paciente encontrado. Gere e salve um cálculo para começar a popular esta área.
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Espécie</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>ECC</TableHead>
                    <TableHead>Histórico</TableHead>
                    <TableHead>Último cálculo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={`${patient.name}-${patient.lastReportAt}`} className="hover:bg-muted/30">
                      <TableCell className="font-semibold">{patient.name ?? 'Paciente sem nome'}</TableCell>
                      <TableCell>{patient.ownerName ?? 'Sem tutor'}</TableCell>
                      <TableCell>
                        <Badge variant={patient.species === 'dog' ? 'default' : patient.species === 'cat' ? 'secondary' : 'outline'}>
                          {patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Indefinido'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{patient.currentWeight ? `${patient.currentWeight} kg` : '—'}</TableCell>
                      <TableCell>{patient.bcs ? `${patient.bcs}/9` : '—'}</TableCell>
                      <TableCell>{patient.reportCount} cálculo(s)</TableCell>
                      <TableCell>{new Date(patient.lastReportAt).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title="Novo cálculo" onClick={() => navigate(NEW_ROUTE)}>
                          <Calculator className="h-4 w-4 text-primary" />
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
