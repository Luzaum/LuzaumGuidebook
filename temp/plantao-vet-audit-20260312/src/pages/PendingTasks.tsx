import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckSquare, Clock, Search, Filter, AlertCircle } from 'lucide-react';

export function PendingTasks() {
  const { activeShiftId, shiftPatients, toggleTask } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!activeShiftId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Nenhum plantão selecionado</h2>
        <p className="text-[var(--text-muted)]">Selecione ou crie um plantão no topo da tela para começar.</p>
      </div>
    );
  }

  const patients = shiftPatients.filter(p => p.shiftId === activeShiftId);
  
  const allTasks = patients.flatMap(p => 
    p.tasks.map(t => ({ ...t, patientName: p.name, patientId: p.id }))
  );

  const filteredTasks = allTasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter(t => !t.completed).sort((a, b) => a.time.localeCompare(b.time));
  const completedTasks = filteredTasks.filter(t => t.completed).sort((a, b) => b.time.localeCompare(a.time));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Pendências</h1>
          <p className="text-[var(--text-muted)] mt-1">
            {incompleteTasks.length} pendência(s) em aberto • {completedTasks.length} concluída(s)
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <Input 
              placeholder="Buscar tarefa..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {allTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--surface-hover)]/20">
          <CheckSquare className="w-12 h-12 mb-4 opacity-20" />
          <h3 className="text-lg font-medium text-[var(--text-main)]">Nenhuma pendência neste plantão.</h3>
          <p className="mt-2 text-sm">Adicione tarefas nos prontuários dos pacientes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent-yellow)]" />
              A Fazer
            </h2>
            <div className="space-y-3">
              {incompleteTasks.map((task, i) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm hover:border-[var(--primary)]/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.patientId, task.id)}
                      className="w-6 h-6 rounded-md border border-[var(--text-muted)] hover:border-[var(--primary)] flex items-center justify-center transition-colors"
                    >
                    </button>
                    <div>
                      <p className="font-medium text-[var(--text-main)]">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-[var(--primary)]">{task.patientName}</span>
                        <Badge variant="outline" className="text-[10px] uppercase bg-[var(--surface-hover)]">{task.category}</Badge>
                        {task.priority === 'alta' && <span className="text-[10px] font-bold text-[var(--accent-red)] uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Alta Prioridade</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-sm bg-[var(--surface-hover)] px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4" />
                    {task.time}
                  </div>
                </motion.div>
              ))}
              {incompleteTasks.length === 0 && (
                <div className="p-8 text-center text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-xl">
                  Tudo concluído por enquanto! 🎉
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--text-muted)]">
              <CheckSquare className="w-5 h-5 text-[var(--accent-green)]" />
              Concluídas
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task, i) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]/50 opacity-60 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.patientId, task.id)}
                      className="w-6 h-6 rounded-md border border-[var(--accent-green)] bg-[var(--accent-green)] text-white flex items-center justify-center transition-colors"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <div>
                      <p className="font-medium text-[var(--text-muted)] line-through">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-[var(--primary)]">{task.patientName}</span>
                        <Badge variant="outline" className="text-[10px] uppercase bg-[var(--surface)]">{task.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-sm bg-[var(--surface)] px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4" />
                    {task.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
