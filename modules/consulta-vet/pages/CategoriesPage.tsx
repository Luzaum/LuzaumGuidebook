import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { getCategoryRepository } from '../services/categoryRepository';
import { Category } from '../types/category';

export function CategoriesPage() {
  const categoryRepository = useMemo(() => getCategoryRepository(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const nextCategories = await categoryRepository.list();
        if (!isMounted) return;
        setCategories(nextCategories);
      } catch (loadError) {
        if (!isMounted) return;
        setCategories([]);
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar categorias.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [categoryRepository]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow="Taxonomia clínica"
        title="Categorias"
        description="Navegue por especialidades e sistemas clínicos."
        icon={Grid}
        accent="amber"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && (
          <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Carregando categorias...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!isLoading && !error && categories.map((category) => (
          <Link
            key={category.id}
            to={`/consulta-vet/categorias/${category.slug}`}
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-amber-300 hover:shadow-sm dark:hover:border-amber-700"
          >
            <span className="line-clamp-1 font-medium capitalize text-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-400">
              {category.title}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400" />
          </Link>
        ))}

        {!isLoading && !error && categories.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Nenhuma categoria disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

