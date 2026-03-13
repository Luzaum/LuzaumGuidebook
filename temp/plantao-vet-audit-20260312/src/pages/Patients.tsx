import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, ChevronRight, Activity, Clock, AlertCircle } from 'lucide-react';

export function Patients() {
  const { activeShiftId, shiftPatients } = useAppStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const patients = shiftPatients.filter(p => p.shiftId === activeShiftId);
  
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mainDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!activeShiftId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Nenhum plantão selecionado</h2>
        <p className="text-[var(--text-muted)]">Selecione ou crie um plantão no topo da tela para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Pacientes</h1>
          <p className="text-[var(--text-muted)] mt-1">
            {patients.length} paciente(s) no plantão atual
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <Input 
              placeholder="Buscar paciente..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button onClick={() => navigate('/importar')}>
            Adicionar
          </Button>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--surface-hover)]/20">
          <Activity className="w-12 h-12 mb-4 opacity-20" />
          <h3 className="text-lg font-medium text-[var(--text-main)]">Este plantão ainda não possui pacientes.</h3>
          <div className="flex gap-4 mt-6">
            <Button onClick={() => navigate('/importar')}>Importar Prontuário</Button>
            <Button variant="outline">Adicionar Manualmente</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, i) => (
            <motion.div 
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card 
                className="group hover:border-[var(--primary)]/50 transition-all duration-300 cursor-pointer h-full flex flex-col relative overflow-hidden" 
                onClick={() => navigate(`/paciente/${patient.id}`)}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="pb-3 flex-none">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        <Badge variant={patient.status === 'CRÍTICO' ? 'destructive' : patient.status === 'OBSERVAÇÃO' ? 'warning' : 'default'}>
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        {patient.species} • {patient.weight} • Tutor: {patient.tutor}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2">{patient.mainDiagnosis}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {patient.badges.map(badge => (
                        <Badge key={badge} variant="outline" className="bg-[var(--surface-hover)] text-[10px] py-0">
                          {badge}
                        </Badge>
                      ))}
                      {patient.importedFromShiftId && (
                        <Badge variant="secondary" className="text-[10px] py-0 bg-[var(--primary)]/10 text-[var(--primary)]">
                          Importado
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <AlertCircle className="w-4 h-4" />
                      {patient.problems.filter(p => p.status === 'ativo').length} problemas
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <Clock className="w-4 h-4" />
                      {patient.tasks.filter(t => !t.completed).length} pendências
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
