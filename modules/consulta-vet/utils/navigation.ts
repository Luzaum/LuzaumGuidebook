import { ConsensusSpecies } from '../types/consenso';
import { VetSpecies } from '../types/common';
import { RecentRecord } from '../types/recents';

export type ResumeLinkState = {
  pageNumber?: number;
  sectionId?: string;
};

export function buildResumeState(recent?: Pick<RecentRecord, 'pageNumber' | 'sectionId'>): ResumeLinkState | undefined {
  if (!recent?.pageNumber && !recent?.sectionId) return undefined;

  return {
    pageNumber: recent.pageNumber,
    sectionId: recent.sectionId,
  };
}

export function formatSpeciesList(species: VetSpecies[]): string {
  const labels = species.map((item) => (item === 'dog' ? 'Canino' : 'Felino'));
  return labels.join(', ');
}

export function formatConsensusSpecies(species: ConsensusSpecies): string {
  if (species === 'dog') return 'Canino';
  if (species === 'cat') return 'Felino';
  return 'Canino e felino';
}
