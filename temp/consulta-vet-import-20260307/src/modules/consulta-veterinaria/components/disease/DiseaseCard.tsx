import React from 'react';
import { Stethoscope } from 'lucide-react';
import { EntityCard } from '../shared/EntityCard';
import { DiseaseRecord } from '../../types/disease';

interface DiseaseCardProps {
  disease: DiseaseRecord;
}

export function DiseaseCard({ disease }: DiseaseCardProps) {
  return (
    <EntityCard
      to={`/consulta-veterinaria/doencas/${disease.slug}`}
      title={disease.title}
      subtitle={disease.category}
      description={disease.quickSummary}
      tags={disease.tags}
      icon={<Stethoscope className="w-5 h-5" />}
      entityType="disease"
      entityId={disease.id}
    />
  );
}
