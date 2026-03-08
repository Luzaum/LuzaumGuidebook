import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Pill, FileText, Grid, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';
import { getConsensoRepository } from '../services/consensoRepository';

export function HomePage() {
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedDiseases = await diseaseRepository.list();
      const loadedConsensos = await consensoRepository.list();

      setDiseases(loadedDiseases.slice(0, 3));
      setConsensos(loadedConsensos.slice(0, 3));
    };

    void loadData();
  }, [consensoRepository]);

  const shortcuts = [
    { to: '/consulta-vet', label: 'Início', icon: Grid, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { to: '/consulta-vet/doencas', label: 'Doenças', icon: Stethoscope, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { to: '/consulta-vet/medicamentos', label: 'Medicamentos', icon: Pill, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { to: '/consulta-vet/consensos', label: 'Consensos', icon: FileText, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { to: '/consulta-vet/favoritos', label: 'Favoritos', icon: Bookmark, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { to: '/consulta-vet/recentes', label: 'Recentes', icon: Clock, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-10 p-4 md:p-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Consulta VET</h1>
        <p className="text-muted-foreground">Base clínica para consulta de doenças, medicamentos e consensos.</p>
      </header>

      <section>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Atalhos principais</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {shortcuts.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
              <Stethoscope className="h-5 w-5 text-primary" />
              Doenças em destaque
            </h2>
            <Link to="/consulta-vet/doencas" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
              Ver todas
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {diseases.map((disease) => (
              <EntityCard
                key={disease.id}
                to={`/consulta-vet/doencas/${disease.slug}`}
                title={disease.title}
                subtitle={disease.category}
                description={disease.quickSummary}
                entityType="disease"
                entityId={disease.id}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Consensos recentes
            </h2>
            <Link to="/consulta-vet/consensos" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {consensos.map((consenso) => (
              <EntityCard
                key={consenso.id}
                to={`/consulta-vet/consensos/${consenso.slug}`}
                title={consenso.title}
                subtitle={`${consenso.organization || 'Sem organização'}${consenso.year ? ` • ${consenso.year}` : ''}`}
                description={consenso.description || ''}
                entityType="consensus"
                entityId={consenso.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
