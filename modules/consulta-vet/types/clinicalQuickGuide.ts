import { VetSpecies } from './common';

/** Especialidade / sistema — agrupa os guias na listagem */
export type ClinicalQuickGuideCategoryId =
  | 'dermatologia'
  | 'endocrinologia'
  | 'neurologia'
  | 'gastroenterologia'
  | 'pneumologia'
  | 'cardiologia'
  | 'ortopedia'
  | 'nefro_urologia'
  | 'nutrologia';

export type ClinicalQuickGuideBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip'; title?: string; text: string }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | { type: 'steps'; title?: string; items: string[] }
  | {
      type: 'flowchart';
      title?: string;
      /** Nós em ordem de leitura (fluxo principal → ramificações opcionais) */
      nodes: Array<{ id: string; label: string; variant?: 'start' | 'decision' | 'action' | 'end' }>;
      edges: Array<{ from: string; to: string; label?: string }>;
    }
  | { type: 'figure'; src: string; alt: string; caption?: string }
  | { type: 'videoPlaceholder'; title: string; body: string }
  /** Incorporação YouTube no fluxo do texto (um ou vários por guia) */
  | { type: 'youtubeEmbed'; videoId: string; title: string; caption?: string };

export interface ClinicalQuickGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  /** Resumo para cards e hero */
  summary: string;
  category: ClinicalQuickGuideCategoryId;
  species: VetSpecies[];
  /** Palavras para busca interna */
  searchKeywords: string[];
  /** ID do vídeo YouTube (ex.: dQw4w9WgXcQ) — vazio = bloco “em breve” */
  youtubeVideoId: string | null;
  /** Imagem de capa (opcional) */
  heroImageSrc?: string;
  heroImageAlt?: string;
  /** Guia rápido: bullets curtos */
  quickBullets: string[];
  /** Conteúdo completo */
  sections: ClinicalQuickGuideBlock[];
  isPublished: boolean;
}

export interface ClinicalQuickGuideCategoryMeta {
  id: ClinicalQuickGuideCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}
