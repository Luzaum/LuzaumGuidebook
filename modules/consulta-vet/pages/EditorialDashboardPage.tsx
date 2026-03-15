import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, DatabaseZap, FolderTree, Pill, ScrollText, Stethoscope } from 'lucide-react';
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
      <header className="rounded-[30px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpenCheck className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Editorial Consulta VET</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              CRUD mínimo para conteúdo administrável via Supabase, mantendo fallback local por slug.
            </p>
          </div>
        </div>
      </header>

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
