import React from 'react';
import { cn } from '../../../../lib/utils';
import { useLocation, Link } from 'react-router-dom';
import { 
  Activity, 
  History, 
  GraduationCap, 
  FileText, 
  Settings, 
  BookOpen,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';

export function HemoSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const mainLinks = [
    { path: '/hemogasovet', label: 'Interpretador', icon: Activity },
    { path: '/hemogasovet/history', label: 'Histórico', icon: History }
  ];

  const guideLinks = [
    { path: '/hemogasovet/parameter-guide', label: 'Guia de Parâmetros', icon: BookOpen },
    { path: '/hemogasovet/guidelines', label: 'Boas Práticas', icon: FileText },
    { path: '/hemogasovet/quiz', label: 'Casos Clínicos & Quiz', icon: GraduationCap }
  ];

  const configLinks = [
    { path: '/hemogasovet/references', label: 'Valores de Referência', icon: Settings }
  ];

  const renderLinks = (links: typeof mainLinks) => {
    return links.map(link => {
      const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
      const Icon = link.icon;
      return (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
            isActive 
              ? "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-100" 
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
          )}
          title={collapsed ? link.label : undefined}
        >
          <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
          {!collapsed && <span>{link.label}</span>}
        </Link>
      );
    });
  };

  return (
    <div className={cn(
      "flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 h-full",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header / Logo Component */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
              <img src="/apps/hemogasovetzx.png" alt="HemoGasoVet" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">HemoGasoVet</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400">Pro</span>
            </div>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("shrink-0", collapsed && "mx-auto")}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        <div className="px-3 space-y-1">
          {!collapsed && <p className="px-3 text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Clínica</p>}
          {renderLinks(mainLinks)}
        </div>

        <div className="px-3 space-y-1">
          {!collapsed && <p className="px-3 text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Educação</p>}
          {renderLinks(guideLinks)}
        </div>

        <div className="px-3 space-y-1">
          {!collapsed && <p className="px-3 text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Configurações</p>}
          {renderLinks(configLinks)}
        </div>
      </div>
      
      {/* Footer Area - for future app icon or user info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-600">
                <img src="/apps/hemogasovetzx.png" alt="HemoGasoVet" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <Activity className="w-4 h-4 text-slate-400 absolute" />
             </div>
             <div className="text-xs text-slate-500 dark:text-slate-400">
               Versão 2.0 (Enriquecida)
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
