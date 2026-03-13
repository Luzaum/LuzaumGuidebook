import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ArrowLeft, Activity, AlertCircle, Clock, FileText, Stethoscope, Syringe, Utensils, CheckSquare, MessageSquare, Plus, Edit2, Trash2, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';

export function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = usePatientStore(state => state.shiftPatients.find(p => p.id === id));
  const toggleTask = usePatientStore(state => state.toggleTask);

  const [activeTab, setActiveTab] = useState('resumo');
  const [boletimType, setBoletimType] = useState<'vet' | 'tutor'>('vet');
  const [boletimText, setBoletimText] = useState('');

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Paciente não encontrado</h2>
        <Button onClick={() => navigate('/')}>Voltar ao Dashboard</Button>
      </div>
    );
  }

  const generateBoletim = (type: 'vet' | 'tutor') => {
    setBoletimType(type);
    if (type === 'vet') {
      setBoletimText(`BOLETIM VETERINÁRIO - ${patient.name}
Data: ${new Date().toLocaleDateString()}

ESTADO GERAL: ${patient.status}
DIAGNÓSTICO: ${patient.mainDiagnosis}

RESUMO CLÍNICO:
${patient.summary}

PROBLEMAS ATIVOS:
${patient.problems.filter(p => p.status === 'ativo').map(p => `- ${p.name}: ${p.notes}`).join('\n')}

PENDÊNCIAS:
${patient.tasks.filter(t => !t.completed).map(t => `- [${t.time}] ${t.title}`).join('\n')}

CONDUTA:
Manter monitoramento intensivo.
`);
    } else {
      setBoletimText(`BOLETIM DO TUTOR - ${patient.name}
Data: ${new Date().toLocaleDateString()}

Olá, tutor(a) ${patient.tutor}!
Aqui é a equipe do PlantãoVET atualizando sobre o estado do(a) ${patient.name}.

ESTADO ATUAL:
O(a) ${patient.name} encontra-se em estado ${patient.status.toLowerCase()}, recebendo todos os cuidados necessários.

RESUMO:
Ele(a) passou o turno de forma estável. Estamos acompanhando de perto o quadro de ${patient.mainDiagnosis.toLowerCase()}.
Ainda precisamos realizar alguns exames de controle hoje, mas ele(a) está respondendo bem às medicações.

Qualquer novidade importante, entraremos em contato imediatamente.
Equipe PlantãoVET.`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">{patient.name}</h1>
            <Badge variant={patient.status === 'CRÍTICO' ? 'destructive' : patient.status === 'OBSERVAÇÃO' ? 'warning' : 'default'} className="text-sm px-3 py-1">
              {patient.status}
            </Badge>
          </div>
          <p className="text-[var(--text-muted)] mt-1">
            {patient.species} • {patient.breed} • {patient.age} • {patient.weight} • Tutor: {patient.tutor}
          </p>
        </div>
      </div>

      {/* Defining Phrase Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent-purple)]/10 border border-[var(--primary)]/20 rounded-xl p-4 flex items-start gap-4">
        <div className="p-2 bg-[var(--primary)]/20 rounded-lg text-[var(--primary)] shrink-0 mt-1">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-1">O que define este paciente hoje</h3>
          <p className="text-lg font-medium text-[var(--text-main)] italic">"{patient.definingPhrase}"</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {patient.badges.map(badge => (
          <Badge key={badge} variant="outline" className="bg-[var(--surface-hover)] border-[var(--border)] text-[var(--text-main)] px-3 py-1.5 text-sm">
            {badge}
          </Badge>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
          <TabsList className="w-max min-w-full justify-start h-12 p-1 bg-[var(--surface-hover)]/50 border border-[var(--border)] rounded-xl">
            <TabsTrigger value="resumo" className="gap-2 px-4"><FileText className="w-4 h-4" /> Resumo</TabsTrigger>
            <TabsTrigger value="historico" className="gap-2 px-4"><Clock className="w-4 h-4" /> Histórico</TabsTrigger>
            <TabsTrigger value="problemas" className="gap-2 px-4"><AlertCircle className="w-4 h-4" /> Problemas</TabsTrigger>
            <TabsTrigger value="evolucao" className="gap-2 px-4"><Activity className="w-4 h-4" /> Evolução</TabsTrigger>
            <TabsTrigger value="parametros" className="gap-2 px-4"><Stethoscope className="w-4 h-4" /> Parâmetros</TabsTrigger>
            <TabsTrigger value="exames" className="gap-2 px-4"><FileText className="w-4 h-4" /> Exames</TabsTrigger>
            <TabsTrigger value="nutricao" className="gap-2 px-4"><Utensils className="w-4 h-4" /> Nutrição</TabsTrigger>
            <TabsTrigger value="prescricao" className="gap-2 px-4"><Syringe className="w-4 h-4" /> Prescrição</TabsTrigger>
            <TabsTrigger value="tarefas" className="gap-2 px-4">
              <CheckSquare className="w-4 h-4" /> Tarefas
              {patient.tasks.filter(t => !t.completed).length > 0 && (
                <span className="ml-1.5 bg-[var(--accent-red)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {patient.tasks.filter(t => !t.completed).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="boletins" className="gap-2 px-4"><MessageSquare className="w-4 h-4" /> Boletins</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6">
          {/* TAB: RESUMO */}
          <TabsContent value="resumo" className="space-y-6 outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-[var(--border)] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--primary)]" />
                    Resumo Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
                    {patient.summary}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[var(--border)] shadow-sm bg-[var(--surface-hover)]/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[var(--accent-red)]" />
                    Alertas Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Diagnóstico Principal</p>
                    <p className="font-medium text-[var(--text-main)]">{patient.mainDiagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Dispositivos Atuais</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.badges.filter(b => b === 'SONDA' || b === 'ACESSO').length > 0 ? (
                        patient.badges.filter(b => b === 'SONDA' || b === 'ACESSO').map(b => <Badge key={b} variant="outline">{b}</Badge>)
                      ) : (
                        <span className="text-sm text-[var(--text-main)]">Nenhum dispositivo registrado</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* TAB: PROBLEMAS */}
          <TabsContent value="problemas" className="space-y-6 outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[var(--text-main)]">Lista de Problemas</h2>
                <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Novo Problema</Button>
              </div>
              
              <div className="space-y-4">
                {patient.problems.map(problem => (
                  <Card key={problem.id} className="border-[var(--border)] shadow-sm hover:border-[var(--primary)]/30 transition-colors">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full mt-1 ${
                          problem.status === 'ativo' ? 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]' :
                          problem.status === 'melhorando' ? 'bg-[var(--accent-yellow)]/10 text-[var(--accent-yellow)]' :
                          'bg-[var(--accent-green)]/10 text-[var(--accent-green)]'
                        }`}>
                          {problem.status === 'ativo' ? <AlertCircle className="w-5 h-5" /> :
                           problem.status === 'melhorando' ? <Activity className="w-5 h-5" /> :
                           <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-[var(--text-main)]">{problem.name}</h3>
                            <Badge variant="outline" className="text-xs uppercase tracking-wider">{problem.status}</Badge>
                            {problem.priority === 'alta' && <Badge variant="destructive" className="text-xs">Prioridade Alta</Badge>}
                          </div>
                          <p className="text-sm text-[var(--text-muted)]">{problem.notes}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--primary)]"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-[var(--text-muted)] hover:text-[var(--accent-red)]"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* TAB: TAREFAS */}
          <TabsContent value="tarefas" className="space-y-6 outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[var(--text-main)]">Pendências do Turno</h2>
                <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Nova Tarefa</Button>
              </div>

              <div className="grid gap-3">
                {patient.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      task.completed 
                        ? 'bg-[var(--surface-hover)]/50 border-[var(--border)] opacity-60' 
                        : 'bg-[var(--surface)] border-[var(--border)] shadow-sm hover:border-[var(--primary)]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleTask(patient.id, task.id)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-[var(--accent-green)] border-[var(--accent-green)] text-white' 
                            : 'border-[var(--text-muted)] hover:border-[var(--primary)]'
                        }`}
                      >
                        {task.completed && <CheckSquare className="w-4 h-4" />}
                      </button>
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-main)]'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] uppercase bg-[var(--surface-hover)]">{task.category}</Badge>
                          {task.priority === 'alta' && !task.completed && <span className="text-[10px] font-bold text-[var(--accent-red)] uppercase">Alta Prioridade</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-sm bg-[var(--surface-hover)] px-3 py-1 rounded-lg">
                      <Clock className="w-4 h-4" />
                      {task.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* TAB: BOLETINS */}
          <TabsContent value="boletins" className="space-y-6 outline-none">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-4 space-y-4">
                <Card className="border-[var(--border)] shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Gerador de Boletim</CardTitle>
                    <CardDescription>Gere textos automaticamente baseados nos dados do prontuário.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant={boletimType === 'vet' && boletimText ? 'default' : 'outline'} 
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => generateBoletim('vet')}
                    >
                      <Stethoscope className="w-5 h-5" />
                      Boletim Veterinário (Técnico)
                    </Button>
                    <Button 
                      variant={boletimType === 'tutor' && boletimText ? 'default' : 'outline'} 
                      className="w-full justify-start gap-3 h-12"
                      onClick={() => generateBoletim('tutor')}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Boletim Tutor (Amigável)
                    </Button>
                  </CardContent>
                </Card>

                <div className="bg-[var(--surface-hover)] p-4 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)]">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[var(--primary)]" />
                    <span>Os boletins são gerados a partir das informações já registradas nas outras abas. Quanto mais organizado estiver o paciente, melhor será o texto gerado.</span>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <Card className="border-[var(--border)] shadow-sm h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[var(--primary)]" />
                      Preview e Edição
                    </CardTitle>
                    {boletimText && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-2 text-[var(--text-muted)] hover:text-[var(--primary)]" onClick={() => generateBoletim(boletimType)}>
                          <RefreshCw className="w-4 h-4" /> Regenerar
                        </Button>
                        <Button variant="secondary" size="sm" className="gap-2">
                          <Copy className="w-4 h-4" /> Copiar
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {boletimText ? (
                      <Textarea 
                        value={boletimText}
                        onChange={(e) => setBoletimText(e.target.value)}
                        className="flex-1 min-h-[400px] font-mono text-sm resize-none bg-[var(--surface-hover)]/30 border-[var(--border)] focus:border-[var(--primary)]/50 transition-colors p-4"
                      />
                    ) : (
                      <div className="flex-1 min-h-[400px] flex flex-col items-center justify-center text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--surface-hover)]/20">
                        <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                        <p>Selecione um tipo de boletim ao lado para gerar o texto.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </motion.div>
          </TabsContent>
          
          {/* Placeholder for other tabs */}
          {['historico', 'evolucao', 'parametros', 'exames', 'nutricao', 'prescricao'].map(tab => (
            <TabsContent key={tab} value={tab} className="outline-none">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--surface-hover)]/20">
                <div className="p-4 bg-[var(--surface)] rounded-full mb-4 shadow-sm">
                  <Activity className="w-8 h-8 text-[var(--primary)]/50" />
                </div>
                <h3 className="text-lg font-medium text-[var(--text-main)] capitalize">Aba {tab}</h3>
                <p className="mt-1">Esta seção está em desenvolvimento para o protótipo.</p>
              </motion.div>
            </TabsContent>
          ))}

        </div>
      </Tabs>
    </div>
  );
}
