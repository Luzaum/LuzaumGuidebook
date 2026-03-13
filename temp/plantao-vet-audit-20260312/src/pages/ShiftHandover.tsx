import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Copy, FileText, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

export function ShiftHandover() {
  const { activeShiftId, shiftPatients } = useAppStore();
  const [copied, setCopied] = useState(false);
  
  if (!activeShiftId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Nenhum plantão selecionado</h2>
        <p className="text-[var(--text-muted)]">Selecione ou crie um plantão no topo da tela para começar.</p>
      </div>
    );
  }

  const patients = shiftPatients.filter(p => p.shiftId === activeShiftId);

  const generateHandoverText = () => {
    let text = `📋 PASSAGEM DE PLANTÃO - ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    
    patients.forEach(p => {
      text += `🐾 ${p.name} (${p.species}, ${p.age})\n`;
      text += `   Diagnóstico: ${p.mainDiagnosis}\n`;
      text += `   Status: ${p.status}\n`;
      text += `   Resumo: ${p.summary}\n`;
      
      const activeProblems = p.problems.filter(prob => prob.status === 'ativo');
      if (activeProblems.length > 0) {
        text += `   Problemas Ativos:\n`;
        activeProblems.forEach(prob => text += `     - ${prob.name}\n`);
      }
      
      const pendingTasks = p.tasks.filter(t => !t.completed);
      if (pendingTasks.length > 0) {
        text += `   Pendências:\n`;
        pendingTasks.forEach(t => text += `     - [${t.time}] ${t.title}\n`);
      }
      
      text += `\n`;
    });
    
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHandoverText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Passagem de Plantão</h1>
          <p className="text-[var(--text-muted)] mt-1">
            Resumo consolidado dos {patients.length} pacientes para o próximo turno
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button onClick={handleCopy} className="flex items-center gap-2">
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Texto Completo'}
          </Button>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--surface-hover)]/20">
          <FileText className="w-12 h-12 mb-4 opacity-20" />
          <h3 className="text-lg font-medium text-[var(--text-main)]">Nenhum paciente neste plantão.</h3>
          <p className="mt-2 text-sm">Adicione pacientes para gerar a passagem.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-[var(--primary)]" />
              Pacientes
            </h2>
            {patients.map((patient, i) => (
              <motion.div 
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-[var(--border)] bg-[var(--surface)] shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {patient.name}
                          <Badge variant={patient.status === 'CRÍTICO' ? 'destructive' : patient.status === 'OBSERVAÇÃO' ? 'warning' : 'default'} className="text-[10px] py-0">
                            {patient.status}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                          {patient.mainDiagnosis}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-[var(--text-main)] bg-[var(--surface-hover)] p-3 rounded-lg border border-[var(--border)]">
                      <span className="font-semibold text-[var(--primary)] mr-2">Resumo:</span>
                      {patient.summary}
                    </div>
                    
                    {patient.problems.filter(p => p.status === 'ativo').length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[var(--accent-yellow)]" />
                          Problemas Ativos
                        </h4>
                        <ul className="list-disc list-inside text-sm space-y-1 text-[var(--text-main)] pl-1">
                          {patient.problems.filter(p => p.status === 'ativo').map(prob => (
                            <li key={prob.id}>{prob.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {patient.tasks.filter(t => !t.completed).length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-blue)]" />
                          Pendências
                        </h4>
                        <ul className="space-y-2">
                          {patient.tasks.filter(t => !t.completed).map(task => (
                            <li key={task.id} className="flex items-center gap-2 text-sm text-[var(--text-main)] bg-[var(--bg)] p-2 rounded-md border border-[var(--border)]">
                              <span className="font-mono text-xs text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">{task.time}</span>
                              {task.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--text-muted)]">
              <FileText className="w-5 h-5" />
              Preview do Texto
            </h2>
            <Card className="border-[var(--border)] bg-[var(--surface)] shadow-sm sticky top-24">
              <CardContent className="p-6">
                <pre className="whitespace-pre-wrap font-mono text-sm text-[var(--text-main)] bg-[var(--bg)] p-4 rounded-xl border border-[var(--border)] overflow-auto max-h-[60vh]">
                  {generateHandoverText()}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
