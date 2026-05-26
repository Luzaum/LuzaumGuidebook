import React, { useEffect, useState } from 'react';
import { InterpretationResult } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Activity } from 'lucide-react';

interface ResultDisplayProps {
  result: InterpretationResult;
  scaleName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, scaleName }) => {
  const { totalScore, maxScore, displayScore, needsRescue, severity, recommendation, subscores } = result;

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalScore;
    if (start === end) {
      setCounter(end);
      return;
    }
    const duration = 1.2; // seconds
    const stepTime = Math.abs(Math.floor((duration * 1000) / (end || 1)));
    
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCounter(end);
        clearInterval(timer);
      } else {
        setCounter(start);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [totalScore]);

  // Color Mapping
  const severityColors = {
    none: {
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/40',
      label: 'Dor Ausente / Controle Clínico Ideal',
      ring: 'stroke-emerald-500 dark:stroke-emerald-400',
    },
    mild: {
      text: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/20',
      border: 'border-teal-200 dark:border-teal-900/40',
      label: 'Dor Leve',
      ring: 'stroke-teal-500 dark:stroke-teal-400',
    },
    moderate: {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/40',
      label: 'Dor Moderada',
      ring: 'stroke-amber-500 dark:stroke-amber-400',
    },
    severe: {
      text: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-900/40',
      label: 'Dor Severa / Dor Grave',
      ring: 'stroke-rose-500 dark:stroke-rose-400',
    },
    extreme: {
      text: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-900/40 animate-pulse',
      label: 'Dor Extrema / Sofrimento Intolerável',
      ring: 'stroke-red-600 dark:stroke-red-550',
    },
  };

  const style = severityColors[severity] || severityColors.none;
  const percent = Math.min(Math.max((totalScore / (maxScore || 1)) * 100, 0), 100);
  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Animated Circular Gauge and Info */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/50 p-6 backdrop-blur-md">
        
        {/* SVG gauge */}
        <div className="relative flex items-center justify-center w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background track circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated progression stroke */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              className={style.ring}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Score text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-850 dark:text-white leading-none">
              {counter}
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">
              de {maxScore} pts
            </span>
          </div>
        </div>

        {/* Clinical Interpretation Detail */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Resultado da Avaliação • {scaleName}
          </span>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
            <span className={`inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-xs font-black uppercase tracking-wider ${style.bg} ${style.text} ${style.border}`}>
              {style.label}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350 pr-4">
            {recommendation}
          </p>
        </div>
      </div>

      {/* Pulsing Analgesic Rescue Alert Banner */}
      <AnimatePresence>
        {needsRescue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3.5 rounded-2xl border border-red-200 bg-red-500/10 dark:border-red-900/40 dark:bg-red-500/5 p-4 text-red-600 dark:text-red-400 ring-1 ring-red-500/25 animate-pulse shadow-md"
          >
            <AlertTriangle className="h-6 w-6 shrink-0 text-red-500 dark:text-red-400" />
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-widest leading-none">
                🚨 RESGATE ANALGÉSICO INDICADO 🚨
              </h4>
              <p className="text-[11px] font-semibold leading-relaxed mt-1 opacity-90">
                O paciente ultrapassou o limiar ético de intervenção clínica. Aplique a medicação de resgate imediatamente e proceda à reavaliação.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimension Subscores */}
      {subscores && subscores.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Activity className="h-4.5 w-4.5 text-slate-400" />
            <span>Detalhamento por Subescores / Dimensões</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subscores.map((sub, index) => {
              const hasAlert = sub.needsRescue;
              return (
                <div
                  key={index}
                  className={`rounded-xl border p-4 bg-white/50 dark:bg-slate-900/40 ${
                    hasAlert
                      ? 'border-red-200 dark:border-red-950/40 shadow-sm shadow-red-500/5'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    {sub.name}
                  </span>

                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-black text-slate-800 dark:text-teal-50">
                      {sub.score} <span className="text-xs font-bold text-slate-400">/ {sub.maxScore}</span>
                    </span>

                    {sub.threshold && (
                      <span className="text-[10px] font-bold text-slate-400">
                        Limiar: ≥{sub.threshold}
                      </span>
                    )}
                  </div>

                  {sub.threshold && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wide">
                        Status
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${
                        hasAlert
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 ring-1 ring-rose-500/10'
                          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                      }`}>
                        {hasAlert ? '⚠️ Elevado' : '✓ Normal'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
