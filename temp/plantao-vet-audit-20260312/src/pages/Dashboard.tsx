import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Activity, AlertCircle, Calendar, ChevronRight, Clock, Droplet, FileText, Syringe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const activeShiftId = usePatientStore((state) => state.activeShiftId);
  const shiftPatients = usePatientStore((state) => state.shiftPatients);
  const patients = shiftPatients.filter(p => p.shiftId === activeShiftId);
  const navigate = useNavigate();

  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Plantão Internação</h1>
          <p className="text-[var(--text-muted)] flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{today}</span> • Turno Diurno
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/importar')}>
            <FileText className="w-4 h-4 mr-2" />
            Importar Prontuário
          </Button>
          <Button onClick={() => navigate('/passagem')}>
            Passagem de Plantão
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[var(--primary)]/10 to-transparent border-[var(--primary)]/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-[var(--primary)]/20 rounded-lg text-[var(--primary)]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Total Pacientes</p>
              <p className="text-2xl font-bold">{patients.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[var(--accent-red)]/10 to-transparent border-[var(--accent-red)]/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-[var(--accent-red)]/20 rounded-lg text-[var(--accent-red)]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Críticos</p>
              <p className="text-2xl font-bold">{patients.filter(p => p.status === 'CRÍTICO').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[var(--accent-yellow)]/10 to-transparent border-[var(--accent-yellow)]/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-[var(--accent-yellow)]/20 rounded-lg text-[var(--accent-yellow)]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Pendências</p>
              <p className="text-2xl font-bold">{patients.reduce((acc, p) => acc + p.tasks.filter(t => !t.completed).length, 0)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[var(--accent-green)]/10 to-transparent border-[var(--accent-green)]/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-[var(--accent-green)]/20 rounded-lg text-[var(--accent-green)]">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Jejum / Sonda</p>
              <p className="text-2xl font-bold">{patients.filter(p => p.badges.includes('JEJUM') || p.badges.includes('SONDA')).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Pacientes do Turno</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {patients.map((patient) => (
            <motion.div key={patient.id} variants={item}>
              <Card className="group hover:border-[var(--primary)]/50 transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => navigate(`/paciente/${patient.id}`)}>
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{patient.name}</CardTitle>
                        <Badge variant={patient.status === 'CRÍTICO' ? 'destructive' : patient.status === 'OBSERVAÇÃO' ? 'warning' : 'default'}>
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        {patient.species} • {patient.breed} • {patient.weight} • Tutor: {patient.tutor}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-main)] mb-1">Diagnóstico / Suspeita</p>
                      <p className="text-sm text-[var(--text-muted)]">{patient.mainDiagnosis}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {patient.badges.map(badge => (
                        <Badge key={badge} variant="outline" className="bg-[var(--surface-hover)]">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Next Task Preview */}
                    {patient.tasks.filter(t => !t.completed).length > 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-yellow)]" />
                          <p className="text-sm font-medium">Próxima Pendência</p>
                        </div>
                        <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {patient.tasks.filter(t => !t.completed)[0].time} - {patient.tasks.filter(t => !t.completed)[0].title}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
