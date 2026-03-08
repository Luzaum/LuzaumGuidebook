import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Pill, FileText, Grid, Bookmark, Clock, ChevronRight } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { categoryRepository } from '../services/adapters/local/localCategoryRepository';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { ConsensusRecord } from '../types/consenso';
import { Category } from '../types/category';
import { EntityCard } from '../components/shared/EntityCard';

export function HomePage() {
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const d = await diseaseRepository.list();
      const m = await medicationRepository.list();
      const c = await consensoRepository.list();
      const cat = await categoryRepository.list();

      setDiseases(d.slice(0, 3));
      setMedications(m.slice(0, 3));
      setConsensos(c.slice(0, 3));
      setCategories(cat.slice(0, 6));
    };
    loadData();
  }, []);

  const shortcuts = [
    { to: '/consulta-veterinaria/doencas', label: 'Doenças', icon: Stethoscope, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { to: '/consulta-veterinaria/medicamentos', label: 'Medicamentos', icon: Pill, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { to: '/consulta-veterinaria/consensos', label: 'Consensos', icon: FileText, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { to: '/consulta-veterinaria/categorias', label: 'Categorias', icon: Grid, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { to: '/consulta-veterinaria/favoritos', label: 'Favoritos', icon: Bookmark, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { to: '/consulta-veterinaria/recentes', label: 'Recentes', icon: Clock, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Consulta Veterinária</h1>
        <p className="text-muted-foreground">Acesso rápido a doenças, consensos e medicamentos para cães e gatos.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {shortcuts.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl border border-border hover:shadow-md hover:border-primary/50 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${s.bg} ${s.color}`}>
                <s.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              Doenças em Destaque
            </h2>
            <Link to="/consulta-veterinaria/doencas" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {diseases.map((d) => (
              <EntityCard
                key={d.id}
                to={`/consulta-veterinaria/doencas/${d.slug}`}
                title={d.title}
                subtitle={d.category}
                description={d.quickSummary}
                tags={d.tags}
                entityType="disease"
                entityId={d.id}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Medicamentos Recentes
            </h2>
            <Link to="/consulta-veterinaria/medicamentos" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {medications.map((m) => (
              <EntityCard
                key={m.id}
                to={`/consulta-veterinaria/medicamentos/${m.slug}`}
                title={m.title}
                subtitle={m.pharmacologicClass}
                description={m.indications.join(', ')}
                tags={m.tags}
                entityType="medication"
                entityId={m.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
