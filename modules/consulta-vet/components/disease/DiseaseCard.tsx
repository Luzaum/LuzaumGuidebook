import React from 'react';
import { EntityCard } from '../shared/EntityCard';
import { DiseaseRecord } from '../../types/disease';

interface DiseaseCardProps {
  disease: DiseaseRecord;
}

export function DiseaseCard({ disease }: DiseaseCardProps) {
  return (
    <EntityCard
      to={`/consulta-vet/doencas/${disease.slug}`}
      title={disease.title}
      subtitle={disease.category}
      description={disease.quickSummary}
      category={disease.category}
      compact
      minimal
      entityType="disease"
      entityId={disease.id}
    />
  );
}

