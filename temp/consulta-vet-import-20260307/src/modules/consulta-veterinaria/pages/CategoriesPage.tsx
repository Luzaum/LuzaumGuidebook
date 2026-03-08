import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, ChevronRight } from 'lucide-react';
import { categoryRepository } from '../services/adapters/local/localCategoryRepository';
import { Category } from '../types/category';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setCategories(await categoryRepository.list());
    };
    loadData();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2 flex items-center gap-3">
          <Grid className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          Categorias
        </h1>
        <p className="text-muted-foreground">Navegue pelo conteúdo organizado por especialidades e sistemas.</p>
      </header>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/consulta-veterinaria/categorias/${c.slug}`}
            className="group flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all"
          >
            <span className="font-medium text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors capitalize">
              {c.title}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
