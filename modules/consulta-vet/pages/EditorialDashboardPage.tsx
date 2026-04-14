import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, DatabaseZap, FolderTree, Pill, ScrollText, Stethoscope } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';

const cards = [
  {
    to: '/consulta-vet/editorial/categorias',
    title: 'Categorias',
    body: 'Gerencie taxonomia, ordem e descrições curtas do módulo.',
    icon: FolderTree,
  },
  {
    to: '/consulta-vet/editorial/doencas',
    title: 'Doenças',
    body: 'Edite blocos editoriais completos, destaques rápidos e relacionados.',
    icon: Stethoscope,
  },
  {
    to: '/consulta-vet/editorial/medicamentos',
    title: 'Medicamentos',
    body: 'Mantenha farmacologia, apresentações, doses e vínculos clínicos.',
    icon: Pill,
  },
  {
    to: '/consulta-vet/editorial/consensos',
    title: 'Consensos',
    body: 'CRUD editorial completo: metadados, detalhes, PDF, referências e relacionamentos.',
    icon: ScrollText,
  },
  {
    to: '/consulta-vet/editorial/importacao',
    title: 'Importar JSON',
    body: 'Importação em massa estruturada via AI ou Lotes de doenças e medicamentos.',
    icon: DatabaseZap,
  },
];

export function EditorialDashboardPage() {
  const { isLoading, canManage } = useConsultaVetEditorialAccess();

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow="Editorial"
        title="Painel editorial"
        description="ConsultaVET — CRUD mínimo para conteúdo administrável via Supabase, mantendo fallback local por slug."
        icon={BookOpenCheck}
        accent="primary"
      />

      <EditorialPermissionGate isLoading={isLoading} canManage={canManage}>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-[26px] border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <card.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </Link>
          ))}
        </div>
      </EditorialPermissionGate>
    </div>
  );
}
