import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Home, Calculator, Heart, BookOpen, Activity, Brain, TestTube, Stethoscope } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  title?: string;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, title, showHeader = true }) => {
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
                <img
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/w_40,h_40,c_fit,q_auto,f_auto/LOGOAPP"
                  alt="Logo Luzaum's Guidebook"
                  className="h-10 w-10"
                />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Luzaum's Guidebook</h1>
                  {title && (
                    <p className="text-sm text-muted-foreground">{title}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="ml-auto flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground">
                      Categorias
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-primary to-primary/80 p-6 no-underline outline-none focus:shadow-md shadow-sm"
                              href="#"
                            >
                              <Calculator className="h-6 w-6 text-primary-foreground" />
                              <div className="mb-2 mt-4 text-lg font-medium text-primary-foreground">
                                Calculadoras
                              </div>
                              <p className="text-sm leading-tight text-primary-foreground/80">
                                Ferramentas de cálculo para fluidoterapia, transfusão e mais.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </div>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none flex items-center space-x-2">
                              <Heart className="h-4 w-4" />
                              <span>Emergências</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Protocolos de emergência veterinária.
                            </p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none flex items-center space-x-2">
                              <BookOpen className="h-4 w-4" />
                              <span>Guias</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Guias de referência e formulários.
                            </p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="#"
                          >
                            <div className="text-sm font-medium leading-none flex items-center space-x-2">
                              <Activity className="h-4 w-4" />
                              <span>Avaliações</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Escalas de dor e avaliações clínicas.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <ThemeToggle />
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
