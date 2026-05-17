import { VetSpecies } from './common';

/** Fase macro do fluxo — ordena o raciocínio clínico na cartilha */
export type EmergencyGuidePhase =
  | 'reconhecimento'
  | 'estabilizacao'
  | 'tratamento_especifico'
  | 'monitoramento';

export type EmergencyGuideCalloutVariant = 'critical' | 'warning' | 'info';

export type EmergencyGuideBlock =
  | {
      type: 'callout';
      variant: EmergencyGuideCalloutVariant;
      title?: string;
      text: string;
    }
  | {
      type: 'checklist';
      title?: string;
      items: string[];
    }
  | {
      type: 'steps';
      title?: string;
      items: string[];
    }
  | {
      type: 'keyPoints';
      title?: string;
      items: string[];
    }
  | {
      type: 'targetStrip';
      title?: string;
      items: Array<{
        label: string;
        value: string;
        detail?: string;
      }>;
    }
  | {
      type: 'formula';
      title: string;
      expression: string;
      note?: string;
      variables?: string[];
    }
  | {
      type: 'table';
      title?: string;
      columns: string[];
      rows: string[][];
      caption?: string;
    }
  | {
      type: 'comparison';
      title?: string;
      columns: string[];
      rows: Array<{
        label: string;
        values: string[];
      }>;
    }
  | {
      type: 'placeholder';
      message: string;
    };

export interface EmergencyGuidePage {
  id: string;
  /** Título curto da “página” da cartilha */
  title: string;
  /** Ordem no fluxo (1..N), exibida ao usuário */
  stepOrder: number;
  phase: EmergencyGuidePhase;
  /** Frase de abertura opcional */
  intro?: string;
  blocks: EmergencyGuideBlock[];
}

export interface EmergencyGuide {
  id: string;
  slug: string;
  title: string;
  /** Subtítulo ou uma linha de contexto clínico */
  subtitle: string;
  description: string;
  tags: string[];
  species: VetSpecies[];
  /** Páginas em ordem de leitura recomendada */
  pages: EmergencyGuidePage[];
  isPublished: boolean;
}
