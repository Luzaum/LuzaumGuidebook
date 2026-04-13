import React from 'react';
import Icon from '../components/Icon';
import Importer from '../components/Importer';
import { AbvTab, AntibioticClass, DiseaseSystem } from '../types';
import AnimatedBackground from '../components/AnimatedBackground';

interface HomeProps {
  setPage: (page: AbvTab) => void;
  onMergeAB: (data: AntibioticClass) => void;
  onMergeDZ: (data: DiseaseSystem) => void;
}

const Home: React.FC<HomeProps> = ({ setPage, onMergeAB, onMergeDZ }) => (
  <div className="min-h-screen bg-slate-50 p-6 animate-fade-in relative overflow-hidden">
            <AnimatedBackground pillCount={150} />
    <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <header className="text-center mb-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold md:text-5xl" style={{ color: 'var(--foreground)' }}>
        Antibioticoterapia
      </h1>
      <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>
        Guia clínico de antibióticos e condições para medicina veterinária.
      </p>
    </header>
    <div className="grid gap-6 max-w-5xl mx-auto md:grid-cols-2">
      <button onClick={() => setPage('antibiotics')} className="abv-btn-primary group rounded-2xl p-7 shadow-lg transition hover:scale-105">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white/20"><Icon name="pill" className="h-8 w-8" /></div>
        <h2 className="text-2xl font-bold mb-1">Guia de Antibióticos</h2>
        <p className="text-white/90">Consulte fármacos, espectro, e use a calculadora de dose.</p>
      </button>
      <button onClick={() => setPage('syndrome')} className="abv-btn-primary group rounded-2xl p-7 shadow-lg transition hover:scale-105">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white/20"><Icon name="paw" className="h-8 w-8" /></div>
        <h2 className="text-2xl font-bold mb-1">Guia por Paciente</h2>
        <p className="text-white/90">Receba recomendações baseadas no paciente e condição.</p>
      </button>
    </div>
    <div className="max-w-5xl mx-auto mt-8">
      <Importer onMergeAB={onMergeAB} onMergeDZ={onMergeDZ} />
    </div>
    <footer className="mt-12 text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
      Ferramenta educacional. Para uso clínico: baseie-se em cultura/antibiograma e consensos atualizados.
    </footer>
    </div>
  </div>
);

export default Home;