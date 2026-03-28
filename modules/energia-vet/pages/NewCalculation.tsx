import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Info, Activity, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { useCalculationStore } from '../store/calculationStore';
import { calculateRER, calculateDogMER, calculateCatMER, DOG_MER_FACTORS, CAT_MER_FACTORS, calculateIdealWeightCustom } from '../lib/nutrition';
import { Species, BCS, TargetGoal } from '../types';

const MODULE_ROUTE = '/calculadora-energetica';
const NEW_ROUTE = `${MODULE_ROUTE}/new`;

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['Paciente', 'Energia', 'Meta', 'Alimento', 'Resumo'];
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${currentStep >= i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {i + 1}
          </div>
          <span className={`ml-2 text-sm font-medium hidden md:block ${currentStep >= i + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
            {step}
          </span>
          {i < steps.length - 1 && (
            <div className={`w-12 h-1 mx-4 rounded ${currentStep > i + 1 ? 'bg-primary' : 'bg-muted'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function PatientStep() {
  const navigate = useNavigate();
  const { patient, setPatient } = useCalculationStore();

  const handleNext = () => {
    if (!patient.name || !patient.currentWeight) {
      alert('Preencha os campos obrigatórios (Nome e Peso).');
      return;
    }
    navigate(`${NEW_ROUTE}/energy`);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Identificação do Paciente</CardTitle>
        <CardDescription>Dados básicos para o cálculo nutricional.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Paciente *</Label>
            <Input id="name" value={patient.name || ''} onChange={(e) => setPatient({ name: e.target.value })} placeholder="Ex: Rex" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Nome do Tutor</Label>
            <Input id="owner" value={patient.ownerName || ''} onChange={(e) => setPatient({ ownerName: e.target.value })} placeholder="Ex: João" />
          </div>
          
          <div className="space-y-2">
            <Label>Espécie *</Label>
            <Select value={patient.species} onValueChange={(v) => setPatient({ species: v as Species })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a espécie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Cão</SelectItem>
                <SelectItem value="cat">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Sexo</Label>
            <Select value={patient.sex} onValueChange={(v) => setPatient({ sex: v as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Macho</SelectItem>
                <SelectItem value="female">Fêmea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Peso Atual (kg) *</Label>
            <Input id="weight" type="number" step="0.1" value={patient.currentWeight || ''} onChange={(e) => setPatient({ currentWeight: parseFloat(e.target.value) })} placeholder="Ex: 10.5" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Escore Corporal (BCS 1-9) *</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>O Body Condition Score (BCS) é um método semiquantitativo. O ideal é 4/9 ou 5/9. Use o Guia BCS no menu para referência visual.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Slider 
                value={[patient.bcs || 5]} 
                min={1} max={9} step={1} 
                onValueChange={(v) => setPatient({ bcs: v[0] as BCS })}
                className="flex-1"
              />
              <span className="font-bold w-8 text-center">{patient.bcs}/9</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch id="neutered" checked={patient.isNeutered} onCheckedChange={(v) => setPatient({ isNeutered: v })} />
            <Label htmlFor="neutered">Paciente Castrado?</Label>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch id="hospitalized" checked={patient.isHospitalized} onCheckedChange={(v) => setPatient({ isHospitalized: v })} />
            <Label htmlFor="hospitalized" className="text-red-600 font-medium">Paciente Hospitalizado?</Label>
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Label>Comorbidades (Tags)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Estrutura pronta para regras futuras. Por enquanto, selecione para registro no histórico.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input placeholder="Ex: DRC, Pancreatite, Diabetes (separado por vírgula)" value={patient.clinicalNotes || ''} onChange={(e) => setPatient({ clinicalNotes: e.target.value })} />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button onClick={handleNext} className="gap-2">
            Próximo <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EnergyStep() {
  const navigate = useNavigate();
  const { patient, energy, setEnergy } = useCalculationStore();
  const [selectedFactor, setSelectedFactor] = useState<number>(110);

  const factors = patient.species === 'dog' ? DOG_MER_FACTORS : CAT_MER_FACTORS;
  const weight = patient.currentWeight || 0;
  const rer = calculateRER(weight);
  
  const mer = patient.species === 'dog' 
    ? calculateDogMER(weight, selectedFactor) 
    : calculateCatMER(weight, selectedFactor);

  const handleNext = () => {
    setEnergy({
      rer,
      merFactor: selectedFactor,
      mer,
      weightUsed: weight,
      isIdealWeight: false,
    });
    navigate(`${NEW_ROUTE}/target`);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Calculo Energetico</CardTitle>
        <CardDescription>Cálculo de RER e MER baseado no FEDIAF 2025.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">RER (Resting Energy Requirement)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>A fórmula base utilizada é: RER = 70 x (peso em kg)^0.75. Esta é a energia necessária para manter a homeostase em repouso.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="font-mono bg-background p-4 rounded border text-sm">
            RER = 70 × ({weight} kg) ^ 0.75<br/>
            RER = 70 × {(Math.pow(weight, 0.75)).toFixed(2)}<br/>
            <span className="text-lg font-bold text-primary mt-2 block">RER = {rer.toFixed(0)} kcal/dia</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-lg font-semibold">Estado Fisiológico (MER)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>MER (Maintenance Energy Requirement). Fatores extraídos das tabelas do FEDIAF 2025. Cães usam peso^0.75 e Gatos usam peso^0.67.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Select value={selectedFactor.toString()} onValueChange={(v) => setSelectedFactor(parseFloat(v))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o estado fisiológico" />
            </SelectTrigger>
            <SelectContent>
              {factors.map((f) => (
                <SelectItem key={f.label} value={f.value.toString()}>
                  {f.label} (Fator: {f.value})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-primary-foreground dark:text-primary">Necessidade Energética Diária Estimada (MER)</h3>
          <div className="font-mono bg-background p-4 rounded border text-sm">
            {patient.species === 'dog' ? (
              <>
                MER = {selectedFactor} × ({weight} kg) ^ 0.75<br/>
                MER = {selectedFactor} × {(Math.pow(weight, 0.75)).toFixed(2)}<br/>
              </>
            ) : (
              <>
                MER = {selectedFactor} × ({weight} kg) ^ 0.67<br/>
                MER = {selectedFactor} × {(Math.pow(weight, 0.67)).toFixed(2)}<br/>
              </>
            )}
            <span className="text-2xl font-bold text-primary mt-2 block">MER = {mer.toFixed(0)} kcal/dia</span>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Aviso: Estimativas energéticas são pontos de partida. Devem ser monitoradas e ajustadas de acordo com a evolução do peso e BCS do paciente.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/patient`)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2">
            Próximo <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TargetStep() {
  const navigate = useNavigate();
  const { patient, energy, target, setTarget } = useCalculationStore();
  const [goal, setGoal] = useState<TargetGoal>(target.goal || 'maintenance');
  const [isCustomRule, setIsCustomRule] = useState(target.isCustomClinicalRule || false);

  const weight = patient.currentWeight || 0;
  const bcs = patient.bcs || 5;
  
  let targetWeight = weight;
  if (goal !== 'maintenance' && isCustomRule) {
    targetWeight = calculateIdealWeightCustom(weight, bcs, goal);
  } else if (goal !== 'maintenance' && !isCustomRule) {
    // Official reference layer - just educational, we might need manual input for ideal weight
    // For prototype, we'll just use a simple 10% per BCS point above/below 5 as a rough estimate for the official layer if not custom
    const diff = bcs - 5;
    targetWeight = weight * (1 - (diff * 0.1));
  }

  const targetEnergy = goal === 'maintenance' ? (energy.mer || 0) : 
    (patient.species === 'dog' ? calculateDogMER(targetWeight, energy.merFactor || 110) : calculateCatMER(targetWeight, energy.merFactor || 100));

  const handleNext = () => {
    setTarget({
      goal,
      isCustomClinicalRule: isCustomRule,
      currentWeight: weight,
      targetWeight,
      targetEnergy
    });
    navigate(`${NEW_ROUTE}/food`);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Meta Nutricional</CardTitle>
        <CardDescription>Defina o objetivo do plano alimentar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="grid grid-cols-3 gap-4">
          {(['maintenance', 'weight_loss', 'weight_gain'] as TargetGoal[]).map((g) => (
            <Button 
              key={g} 
              variant={goal === g ? 'default' : 'outline'} 
              onClick={() => setGoal(g)}
              className="h-auto py-4 flex flex-col gap-2"
            >
              <span className="font-bold">
                {g === 'maintenance' ? 'Manutenção' : g === 'weight_loss' ? 'Perda de Peso' : 'Ganho de Peso'}
              </span>
            </Button>
          ))}
        </div>

        {goal !== 'maintenance' && (
          <div className="space-y-6 border p-6 rounded-lg bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-lg font-semibold">Modo de Cálculo</Label>
                <p className="text-sm text-muted-foreground">Escolha entre a referência oficial ou a regra da clínica.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="custom-rule" className={!isCustomRule ? "font-bold" : "text-muted-foreground"}>Oficial</Label>
                <Switch id="custom-rule" checked={isCustomRule} onCheckedChange={setIsCustomRule} />
                <Label htmlFor="custom-rule" className={isCustomRule ? "font-bold text-primary" : "text-muted-foreground"}>Modo Clínica</Label>
              </div>
            </div>

            {isCustomRule ? (
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded border border-orange-200 dark:border-orange-900">
                <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Regra Clínica Customizada
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-400 mt-2">
                  {goal === 'weight_loss' 
                    ? `BCS ${bcs}/9 = Redução de ${bcs === 6 ? 15 : bcs === 7 ? 20 : bcs === 8 ? 30 : bcs === 9 ? 40 : 0}% do peso atual.`
                    : `BCS ${bcs}/9 = Aumento de ${bcs === 4 ? 15 : bcs === 3 ? 20 : bcs === 2 ? 30 : bcs === 1 ? 40 : 0}% do peso atual.`}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded border border-blue-200 dark:border-blue-900">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Referência Educativa
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                  O BCS é um método semiquantitativo. Estima-se que cada ponto acima de 5 represente 10% a mais de peso em relação ao ideal.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Peso Atual</p>
                <p className="text-2xl font-bold">{weight.toFixed(2)} kg</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Peso Alvo Estimado</p>
                <p className="text-2xl font-bold text-primary">{targetWeight.toFixed(2)} kg</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-sm text-muted-foreground">Diferença</p>
                <p className="text-lg font-medium">{Math.abs(weight - targetWeight).toFixed(2)} kg ({(Math.abs(weight - targetWeight) / weight * 100).toFixed(1)}%)</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card border p-6 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Energia Alvo (Kcal/dia)</h3>
            <p className="text-sm text-muted-foreground">Baseado no {goal === 'maintenance' ? 'peso atual' : 'peso alvo'}.</p>
          </div>
          <div className="text-3xl font-bold text-primary">
            {targetEnergy.toFixed(0)} kcal
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/energy`)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2">
            Próximo <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FoodStep() {
  const navigate = useNavigate();
  const { target, diet, setDiet } = useCalculationStore();
  
  const [dietType, setDietType] = useState<'commercial' | 'natural' | 'hybrid'>(diet.dietType || 'commercial');
  const [kcalPerKg, setKcalPerKg] = useState<number>(3800);
  const [mealsPerDay, setMealsPerDay] = useState<number>(diet.mealsPerDay || 2);

  const targetEnergy = target.targetEnergy || 0;
  const kcalPerGram = kcalPerKg / 1000;
  const gramsPerDay = targetEnergy / kcalPerGram;
  const gramsPerMeal = gramsPerDay / mealsPerDay;

  const handleNext = () => {
    setDiet({
      dietType,
      targetEnergy,
      gramsPerDay,
      mealsPerDay,
      gramsPerMeal
    });
    navigate(`${NEW_ROUTE}/summary`);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de Alimento</CardTitle>
        <CardDescription>Selecione o tipo de dieta e calcule a quantidade diária.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="space-y-4">
          <Label>Tipo de Dieta</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant={dietType === 'commercial' ? 'default' : 'outline'} 
              onClick={() => setDietType('commercial')}
              className="h-auto py-4 flex flex-col gap-2"
            >
              <span className="font-semibold">Comercial</span>
              <span className="text-xs font-normal opacity-80">Rações secas ou úmidas</span>
            </Button>
            <Button 
              variant={dietType === 'natural' ? 'default' : 'outline'} 
              onClick={() => setDietType('natural')}
              className="h-auto py-4 flex flex-col gap-2"
            >
              <span className="font-semibold">100% Natural</span>
              <span className="text-xs font-normal opacity-80">Ingredientes frescos</span>
            </Button>
            <Button 
              variant={dietType === 'hybrid' ? 'default' : 'outline'} 
              onClick={() => setDietType('hybrid')}
              className="h-auto py-4 flex flex-col gap-2"
            >
              <span className="font-semibold">Híbrida</span>
              <span className="text-xs font-normal opacity-80">Comercial + Natural</span>
            </Button>
          </div>
        </div>

        {dietType === 'commercial' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
              <Label>Alimento Comercial</Label>
              <Select defaultValue="mock1">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um alimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mock1">Ração Super Premium Cães Adultos (3800 kcal/kg)</SelectItem>
                  <SelectItem value="mock2">Ração Light Cães (3200 kcal/kg)</SelectItem>
                  <SelectItem value="mock3">Ração Úmida Sachê (900 kcal/kg)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Energia do Alimento (kcal/kg)</Label>
                <Input type="number" value={kcalPerKg} onChange={(e) => setKcalPerKg(parseFloat(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Refeições por dia</Label>
                <Select value={mealsPerDay.toString()} onValueChange={(v) => setMealsPerDay(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} refeições</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Quantidade Total Diária</p>
                <p className="text-3xl font-bold text-primary">{gramsPerDay.toFixed(0)} g</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Quantidade por Refeição</p>
                <p className="text-3xl font-bold text-primary">{gramsPerMeal.toFixed(0)} g</p>
              </div>
            </div>
          </div>
        )}

        {dietType === 'natural' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 p-6 border rounded-lg bg-muted/50 text-center">
            <p className="text-muted-foreground">Módulo de Dieta Natural em desenvolvimento.</p>
            <p className="text-sm">Em breve você poderá formular dietas com ingredientes frescos aqui.</p>
          </div>
        )}

        {dietType === 'hybrid' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 p-6 border rounded-lg bg-muted/50 text-center">
            <p className="text-muted-foreground">Módulo de Dieta Híbrida em desenvolvimento.</p>
            <p className="text-sm">Em breve você poderá combinar alimentos comerciais e naturais.</p>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/target`)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="gap-2" disabled={dietType !== 'commercial'}>
            Ver Resumo <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Download, Printer, Save, CheckCircle2, AlertTriangle, Utensils } from 'lucide-react';
import { Badge } from '../components/ui/badge';

function SummaryStep() {
  const navigate = useNavigate();
  const store = useCalculationStore();

  const mockNutrients = {
    proteinPercent: 28,
    fatPercent: 15,
    carbPercent: 45,
    fiberPercent: 4,
    moisturePercent: 8,
  };

  const macroData = [
    { name: 'Proteína', value: mockNutrients.proteinPercent, color: '#f97316' }, // orange-500
    { name: 'Gordura', value: mockNutrients.fatPercent, color: '#eab308' }, // yellow-500
    { name: 'Carboidratos', value: mockNutrients.carbPercent, color: '#3b82f6' }, // blue-500
  ];

  return (
    <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Resumo do Plano Nutricional
            </CardTitle>
            <CardDescription className="mt-1">Revise os dados antes de salvar e gerar o PDF.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => alert('Imprimindo... (Mock)')}>
              <Printer className="w-4 h-4" /> Imprimir
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => alert('Baixando PDF... (Mock)')}>
              <Download className="w-4 h-4" /> PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-muted/20 p-5 rounded-xl border border-muted/50">
            <h3 className="font-bold text-lg border-b border-muted-foreground/20 pb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Dados do Paciente
            </h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Nome</p>
                <p className="font-medium text-base">{store.patient.name || 'Não informado'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Espécie</p>
                <p className="font-medium text-base">{store.patient.species === 'dog' ? 'Cão' : 'Gato'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Peso Atual</p>
                <p className="font-medium text-base">{store.patient.currentWeight} kg</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">ECC (BCS)</p>
                <p className="font-medium text-base">{store.patient.bcs}/9</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 bg-muted/20 p-5 rounded-xl border border-muted/50">
            <h3 className="font-bold text-lg border-b border-muted-foreground/20 pb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Energia & Meta
            </h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">RER</p>
                <p className="font-medium text-base">{store.energy.rer?.toFixed(0)} kcal</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">MER</p>
                <p className="font-medium text-base">{store.energy.mer?.toFixed(0)} kcal</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Objetivo</p>
                <p className="font-medium text-base">{store.target.goal === 'maintenance' ? 'Manutenção' : store.target.goal === 'weight_loss' ? 'Perda de Peso' : 'Ganho de Peso'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Peso Alvo</p>
                <p className="font-medium text-base">{store.target.targetWeight?.toFixed(2)} kg</p>
              </div>
              <div className="col-span-2 bg-primary/10 p-3 rounded-lg border border-primary/20 mt-2 flex justify-between items-center">
                <p className="text-primary-foreground dark:text-primary font-semibold">Energia Alvo Diária</p>
                <p className="text-2xl font-bold text-primary">{store.target.targetEnergy?.toFixed(0)} kcal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl border-b pb-2">Plano Alimentar Prescrito</h3>
          <div className="bg-gradient-to-r from-secondary/50 to-muted/30 p-6 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="outline" className="mb-2 capitalize">
                Dieta {store.diet.dietType === 'commercial' ? 'Comercial' : store.diet.dietType === 'natural' ? 'Natural' : 'Híbrida'}
              </Badge>
              <p className="text-xl font-bold">{store.diet.dietType === 'commercial' ? 'Ração Super Premium (Mock)' : 'Dieta Personalizada'}</p>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                <Utensils className="w-4 h-4" /> Dividido em {store.diet.mealsPerDay} refeições por dia
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div className="bg-background p-4 rounded-xl border shadow-sm min-w-[120px]">
                <p className="text-sm text-muted-foreground mb-1">Total Diário</p>
                <p className="text-3xl font-bold text-primary">{store.diet.gramsPerDay?.toFixed(0)}<span className="text-lg text-muted-foreground font-normal ml-1">g</span></p>
              </div>
              <div className="bg-background p-4 rounded-xl border shadow-sm min-w-[120px]">
                <p className="text-sm text-muted-foreground mb-1">Por Refeição</p>
                <p className="text-3xl font-bold text-primary">{store.diet.gramsPerMeal?.toFixed(0)}<span className="text-lg text-muted-foreground font-normal ml-1">g</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-xl border-b pb-2">Análise Nutricional Estimada</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-card p-6 rounded-xl border">
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `${value}%`} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Energia</p>
                  <p className="font-bold text-lg">{store.target.targetEnergy?.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-muted pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-muted-foreground">Proteína Bruta</span>
                    </div>
                    <span className="font-medium text-base">{mockNutrients.proteinPercent}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-muted pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-muted-foreground">Extrato Etéreo</span>
                    </div>
                    <span className="font-medium text-base">{mockNutrients.fatPercent}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-muted pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-muted-foreground">Carboidratos</span>
                    </div>
                    <span className="font-medium text-base">{mockNutrients.carbPercent}%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-muted pb-2">
                    <span className="text-muted-foreground">Matéria Fibrosa</span>
                    <span className="font-medium text-base">{mockNutrients.fiberPercent}%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-muted pb-2">
                    <span className="text-muted-foreground">Umidade</span>
                    <span className="font-medium text-base">{mockNutrients.moisturePercent}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                  <strong>Aviso Clínico:</strong> A análise nutricional completa (vitaminas, minerais, aminoácidos) requer o cadastro completo do alimento no banco de dados. Os valores acima são estimativas baseadas nos macronutrientes principais.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8 border-t">
          <Button variant="outline" onClick={() => navigate(`${NEW_ROUTE}/food`)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Voltar para Alimento
          </Button>
          <Button size="lg" className="gap-2" onClick={() => { alert('Salvo com sucesso!'); navigate(MODULE_ROUTE); }}>
            <Save className="w-5 h-5" />
            Salvar Paciente e Plano
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NewCalculation() {
  const location = useLocation();
  
  let currentStep = 1;
  if (location.pathname.includes('/energy')) currentStep = 2;
  if (location.pathname.includes('/target')) currentStep = 3;
  if (location.pathname.includes('/food')) currentStep = 4;
  if (location.pathname.includes('/summary')) currentStep = 5;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Novo Cálculo Nutricional</h1>
        <p className="text-muted-foreground mt-2">Siga os passos para gerar o plano alimentar.</p>
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


