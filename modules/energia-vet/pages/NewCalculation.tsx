import { useEffect } from 'react';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import { preloadSpeciesPhotos } from '../lib/speciesAssets';
import PatientStep from './steps/PatientStep';
import EnergyStep from './steps/EnergyStep';
import TargetStep from './steps/TargetStep';
import FoodStep from './steps/FoodStep';
import SummaryStep from './steps/SummaryStep';
import { cn } from '../lib/utils';

const STEPS = [
  { label: 'Paciente', path: 'patient' },
  { label: 'Energia', path: 'energy' },
  { label: 'Meta', path: 'target' },
  { label: 'Alimento', path: 'food' },
  { label: 'Resumo', path: 'summary' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
      {STEPS.map((step, i) => {
        const stepNumber = i + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        
        return (
          <div key={step.label} className="flex items-center group">
            <Link 
              to={stepNumber === 1 ? '/calculadora-energetica/new' : `/calculadora-energetica/new/${step.path}`}
              className="flex flex-col items-center cursor-pointer transition-all hover:opacity-80"
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all border-2',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                    : isActive
                    ? 'bg-primary/10 border-primary text-primary ring-4 ring-primary/10 shadow-md scale-110'
                    : 'bg-muted/50 border-muted text-muted-foreground hover:border-muted-foreground/30',
                )}
              >
                {stepNumber}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-semibold tabular-nums uppercase tracking-wider',
                  isActive ? 'text-primary' : 'text-muted-foreground/70',
                )}
              >
                {step.label}
              </span>
            </Link>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 md:w-16 mb-4 mx-2 rounded-full transition-colors',
                  isCompleted ? 'bg-primary' : 'bg-muted',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function NewCalculation() {
  const location = useLocation();

  useEffect(() => {
    preloadSpeciesPhotos();
  }, []);

  let currentStep = 1;
  if (location.pathname.includes('/energy')) currentStep = 2;
  if (location.pathname.includes('/target')) currentStep = 3;
  if (location.pathname.includes('/food')) currentStep = 4;
  if (location.pathname.includes('/summary')) currentStep = 5;

  return (
    <div className="w-full pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Novo Cálculo Nutricional</h1>
        <p className="text-muted-foreground mt-2">
          Siga os passos para gerar o plano alimentar individualizado.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <Routes>
        <Route index element={<PatientStep />} />
        <Route path="patient" element={<PatientStep />} />
        <Route path="energy" element={<EnergyStep />} />
        <Route path="target" element={<TargetStep />} />
        <Route path="food" element={<FoodStep />} />
        <Route path="summary" element={<SummaryStep />} />
      </Routes>
    </div>
  );
}
