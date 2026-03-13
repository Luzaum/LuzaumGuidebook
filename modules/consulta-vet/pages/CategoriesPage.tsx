import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid } from 'lucide-react';
import { getCategoryRepository } from '../services/categoryRepository';
import { Category } from '../types/category';

export function CategoriesPage() {
  const categoryRepository = useMemo(() => getCategoryRepository(), []);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setCategories(await categoryRepository.list());
    };
    void loadData();
  }, [categoryRepository]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <header>
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
          <Grid className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          Categorias
        </h1>
        <p className="text-muted-foreground">Navegue por especialidades e sistemas clínicos.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
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
      </div>
    </div>
  );
}
