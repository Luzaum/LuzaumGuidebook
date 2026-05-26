import React, { useState } from 'react';
import { PAIN_GUIDE_SECTIONS } from '../data/pain-guide';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

interface GuideScreenProps {
  onBack: () => void;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ onBack }) => {
  const [activeTabId, setActiveTabId] = useState(PAIN_GUIDE_SECTIONS[0].id);

  const activeSection = PAIN_GUIDE_SECTIONS.find((sec) => sec.id === activeTabId) || PAIN_GUIDE_SECTIONS[0];

  const getAlertStyles = (type: string | undefined) => {
    switch (type) {
      case 'danger':
        return 'bg-red-500/10 border-red-200 text-red-700 dark:border-red-950/40 dark:text-red-400 ring-1 ring-red-500/10';
      case 'warning':
        return 'bg-amber-500/10 border-amber-200 text-amber-700 dark:border-amber-950/40 dark:text-amber-400 ring-1 ring-amber-500/10';
      case 'info':
      default:
        return 'bg-teal-500/10 border-teal-200 text-teal-700 dark:border-teal-950/40 dark:text-teal-400 ring-1 ring-teal-500/10';
    }
  };

  const getAlertIcon = (type: string | undefined) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Activity className="h-5 w-5 text-teal-500" />;
    }
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="h-4 w-4" />;
      case 'ListChecks':
        return <Activity className="h-4 w-4" />;
      case 'AlertTriangle':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Stethoscope':
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          📖 Guia Clínico de Manejo de Dor
        </h3>
      </div>

      {/* Tab bar header */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-150 dark:border-slate-800/60">
        {PAIN_GUIDE_SECTIONS.map((section) => {
          const isActive = section.id === activeTabId;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTabId(section.id)}
              className={`relative shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors border ${
                isActive
                  ? 'border-teal-500 bg-teal-50/60 text-teal-600 dark:border-teal-450 dark:bg-teal-950/20 dark:text-teal-450'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350'
              }`}
            >
              {getSectionIcon(section.icon)}
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content display */}
      <div className="border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60 rounded-2xl p-6 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {activeSection.content.map((block, index) => {
              switch (block.type) {
                case 'alert':
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded-2xl border p-4 ${getAlertStyles(
                        block.alertType
                      )}`}
                    >
                      {getAlertIcon(block.alertType)}
                      <div>
                        {block.title && (
                          <h4 className="text-xs font-black uppercase tracking-widest leading-none mb-1">
                            {block.title}
                          </h4>
                        )}
                        <p className="text-xs leading-relaxed font-semibold opacity-90">
                          {block.body}
                        </p>
                      </div>
                    </div>
                  );

                case 'text':
                  return (
                    <div key={index} className="space-y-2">
                      {block.title && (
                        <h4 className="text-sm font-black text-slate-800 dark:text-teal-50">
                          {block.title}
                        </h4>
                      )}
                      {block.body && (
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                          {block.body}
                        </p>
                      )}
                    </div>
                  );

                case 'list':
                  return (
                    <div key={index} className="space-y-2">
                      {block.title && (
                        <h4 className="text-sm font-black text-slate-800 dark:text-teal-50">
                          {block.title}
                        </h4>
                      )}
                      {block.items && (
                        <ul className="list-none space-y-2 pl-1 text-xs text-slate-650 dark:text-slate-300">
                          {block.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-1.5 shrink-0" />
                              <span className="font-semibold leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );

                case 'table':
                  return (
                    <div key={index} className="space-y-3">
                      {block.title && (
                        <h4 className="text-sm font-black text-slate-800 dark:text-teal-50">
                          {block.title}
                        </h4>
                      )}
                      
                      {/* Responsive Table Container with Horizontal Scroll */}
                      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                        <table className="w-full border-collapse text-left text-xs text-slate-700 dark:text-slate-300">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                              {block.headers?.map((header, hIdx) => (
                                <th key={hIdx} className="px-4 py-3">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows?.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="border-b border-slate-150 dark:border-slate-800/60 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-950/20"
                              >
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 leading-relaxed font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GuideScreen;
