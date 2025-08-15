import React from 'react';
import { Button } from './ui/button';
import { NavigationMenu } from './ui/navigation-menu';
import { Calculator, Heart, BookOpen, Activity } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import UserMenu from './UserMenu';
import { useAuth } from './AuthProvider';
import Logo from './Logo';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  title?: string;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, title, showHeader = true }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-foreground hover:text-foreground/80"
                >
                  ← Voltar
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <Logo className="h-12 w-12 rounded-lg object-contain" />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Vetius</h1>
                  {title ? (
                    <p className="text-sm text-muted-foreground">{title}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Seu companheiro clínico, anestésico e cirúrgico, sempre que precisar, na palma das mãos!</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="ml-auto flex items-center space-x-4">
              {/* Categorias removido conforme pedido */}
              <ThemeToggle />
              {!isAuthenticated && (
                <Button size="sm" variant="default" onClick={() => {
                  const el = document.getElementById('signup') || document.getElementById('login');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}>Cadastrar</Button>
              )}
              {isAuthenticated ? (
                <UserMenu />
              ) : null}
            </div>
          </div>
        </header>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
