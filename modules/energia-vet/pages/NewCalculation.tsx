import { useLocation, Routes, Route, Link } from 'react-router-dom';
import PatientStep from './steps/PatientStep';
import EnergyStep from './steps/EnergyStep';
import TargetStep from './steps/TargetStep';
import FoodSelectionStep from './steps/FoodSelectionStep';
import FormulationStep from './steps/FormulationStep';
import ClinicalSummaryStep from './steps/ClinicalSummaryStep';
import FeedingStep from './steps/FeedingStep';
import { cn } from '../lib/utils';

const STEPS = [
  { label: 'Paciente', path: 'patient' },
  { label: 'Energia', path: 'energy' },
  { label: 'Meta', path: 'target' },
  { label: 'Alimentos', path: 'food' },
  { label: 'Formulação', path: 'formulation' },
  { label: 'Resumo', path: 'summary' },
  { label: 'Alimentação', path: 'feeding' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-1.5">
      <div className="grid grid-cols-7 gap-1">
      {STEPS.map((step, i) => {
        const stepNumber = i + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        
        return (
          <div key={step.label} className="group min-w-0">
            <Link 
              to={stepNumber === 1 ? '/calculadora-energetica/new' : `/calculadora-energetica/new/${step.path}`}
              className={cn(
                'flex min-h-11 items-center justify-center gap-2 rounded-lg px-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:justify-start sm:px-3',
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {stepNumber}
              </div>
              <span
                className={cn(
                  'hidden truncate sm:inline',
                  isActive ? 'text-primary' : '',
                )}
              >
                {step.label}
              </span>
            </Link>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default function NewCalculation() {
  const location = useLocation();

  let currentStep = 1;
  if (location.pathname.includes('/energy')) currentStep = 2;
  if (location.pathname.includes('/target')) currentStep = 3;
  if (location.pathname.includes('/food')) currentStep = 4;
  if (location.pathname.includes('/formulation')) currentStep = 5;
  if (location.pathname.includes('/summary')) currentStep = 6;
  if (location.pathname.includes('/feeding')) currentStep = 7;

  return (
    <div className="nutrition-page w-full pb-16">
      <div className="mb-6 border-b border-border pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Plano individualizado</p>
        <h1 className="text-3xl font-semibold tracking-tight">Novo cálculo nutricional</h1>
        <p className="text-muted-foreground mt-2">
          Construa o plano em sete etapas. Você pode voltar sem perder o que já informou.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <Routes>
        <Route index element={<PatientStep />} />
        <Route path="patient" element={<PatientStep />} />
        <Route path="energy" element={<EnergyStep />} />
        <Route path="target" element={<TargetStep />} />
        <Route path="food" element={<FoodSelectionStep />} />
        <Route path="formulation" element={<FormulationStep />} />
        <Route path="summary" element={<ClinicalSummaryStep />} />
        <Route path="feeding" element={<FeedingStep />} />
      </Routes>
    </div>
  );
}
