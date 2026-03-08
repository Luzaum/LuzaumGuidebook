import React, { useEffect, useState } from 'react';
import { Clock, Stethoscope, Pill, FileText } from 'lucide-react';
import { useRecents } from '../hooks/useRecents';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';

export function RecentsPage() {
  const { recents } = useRecents();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const d = await diseaseRepository.list();
      const m = await medicationRepository.list();
      const c = await consensoRepository.list();

      const combined = recents.map((r) => {
        if (r.entityType === 'disease') {
          const found = d.find((item) => item.id === r.entityId);
          return found ? { ...found, _recentData: r } : null;
        }
        if (r.entityType === 'medication') {
          const found = m.find((item) => item.id === r.entityId);
          return found ? { ...found, _recentData: r } : null;
        }
        if (r.entityType === 'consensus') {
          const found = c.find((item) => item.id === r.entityId);
          return found ? { ...found, _recentData: r } : null;
        }
        return null;
      }).filter(Boolean);

      setItems(combined);
    };
    loadData();
  }, [recents]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2 flex items-center gap-3">
          <Clock className="w-8 h-8 text-muted-foreground" />
          Acessados Recentemente
        </h1>
        <p className="text-muted-foreground">Continue de onde parou.</p>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-border">
          <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-foreground mb-2">Nenhum histórico recente</h2>
          <p className="text-muted-foreground">Seus últimos acessos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const r = item._recentData;
            if (r.entityType === 'disease') {
              return (
                <EntityCard
                  key={`${item.id}-${i}`}
                  to={`/consulta-veterinaria/doencas/${item.slug}`}
                  title={item.title}
                  subtitle={item.category}
                  description={item.quickSummary}
                  tags={item.tags}
                  icon={<Stethoscope className="w-5 h-5 text-primary" />}
                  entityType="disease"
                  entityId={item.id}
                />
              );
            }
            if (r.entityType === 'medication') {
              return (
                <EntityCard
                  key={`${item.id}-${i}`}
                  to={`/consulta-veterinaria/medicamentos/${item.slug}`}
                  title={item.title}
                  subtitle={item.pharmacologicClass}
                  description={item.indications.join(', ')}
                  tags={item.tags}
                  icon={<Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                  entityType="medication"
                  entityId={item.id}
                />
              );
            }
            if (r.entityType === 'consensus') {
              return (
                <EntityCard
                  key={`${item.id}-${i}`}
                  to={`/consulta-veterinaria/consensos/${item.slug}`}
                  title={item.title}
                  subtitle={`${item.sourceOrganization} • ${item.year}`}
                  description={item.summary}
                  tags={item.tags}
                  icon={<FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  entityType="consensus"
                  entityId={item.id}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
