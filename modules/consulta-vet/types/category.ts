import { ConsultaVetSource } from './common';

export interface Category {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  description?: string | null;
  isPublished?: boolean;
  source?: ConsultaVetSource;
  createdAt?: string;
  updatedAt?: string;
}
