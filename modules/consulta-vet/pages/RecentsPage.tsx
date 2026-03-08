import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Stethoscope, Pill, FileText } from 'lucide-react';
import { useRecents } from '../hooks/useRecents';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { EntityCard } from '../components/shared/EntityCard';
import { getConsensoRepository } from '../services/consensoRepository';

type RecentItem = {
  _recentData: { entityType: 'disease' | 'medication' | 'consensus'; entityId: string; visitedAt: string };
  [key: string]: any;
};

export function RecentsPage() {
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { recents } = useRecents();
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedDiseases = await diseaseRepository.list();
      const loadedMedications = await medicationRepository.list();
      const loadedConsensos = await consensoRepository.list();

      const combined = recents
        .map((recent) => {
          if (recent.entityType === 'disease') {
            const found = loadedDiseases.find((item) => item.id === recent.entityId);
            return found ? { ...found, _recentData: recent } : null;
          }
          if (recent.entityType === 'medication') {
            const found = loadedMedications.find((item) => item.id === recent.entityId);
            return found ? { ...found, _recentData: recent } : null;
          }
          if (recent.entityType === 'consensus') {
            const found = loadedConsensos.find((item) => item.id === recent.entityId);
            return found ? { ...found, _recentData: recent } : null;
          }
          return null;
        })
        .filter(Boolean) as RecentItem[];

      setItems(combined);
    };

    void loadData();
  }, [recents, consensoRepository]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <header>
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
          <Clock className="h-8 w-8 text-muted-foreground" />
          Recentes
        </h1>
        <p className="text-muted-foreground">Retome rapidamente os últimos conteúdos acessados.</p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-lg font-medium text-foreground">Nenhum histórico recente</h2>
          <p className="text-muted-foreground">Seus últimos acessos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const recent = item._recentData;

            if (recent.entityType === 'disease') {
              return (
                <EntityCard
                  key={`${item.id}-${index}`}
                  to={`/consulta-vet/doencas/${item.slug}`}
                  title={item.title}
                  subtitle={item.category}
                  description={item.quickSummary}
                  icon={<Stethoscope className="h-5 w-5 text-primary" />}
                  entityType="disease"
                  entityId={item.id}
                />
              );
            }

            if (recent.entityType === 'medication') {
              return (
                <EntityCard
                  key={`${item.id}-${index}`}
                  to={`/consulta-vet/medicamentos/${item.slug}`}
                  title={item.title}
                  subtitle={item.pharmacologicClass}
                  description={item.indications.join(', ')}
                  icon={<Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  entityType="medication"
                  entityId={item.id}
                />
              );
            }

            return (
              <EntityCard
                key={`${item.id}-${index}`}
                to={`/consulta-vet/consensos/${item.slug}`}
                title={item.title}
                subtitle={`${item.organization || 'Sem organização'}${item.year ? ` • ${item.year}` : ''}`}
                description={item.description || ''}
                icon={<FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />}
                entityType="consensus"
                entityId={item.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
