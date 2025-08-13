import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface AppIntegrationProps {
  appName: string;
  description: string;
  icon: React.ReactNode;
  externalUrl: string;
  status: 'available' | 'coming-soon' | 'beta';
  category: string;
  features?: string[];
}

const AppIntegration: React.FC<AppIntegrationProps> = ({
  appName,
  description,
  icon,
  externalUrl,
  status,
  category,
  features = []
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'available':
        return 'bg-primary/10 text-primary';
      case 'coming-soon':
        return 'bg-accent text-foreground';
      case 'beta':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'coming-soon':
        return 'Em breve';
      case 'beta':
        return 'Beta';
      default:
        return 'Indisponível';
    }
  };

  const handleOpenApp = () => {
    if (status === 'available' || status === 'beta') {
      window.open(externalUrl, '_blank');
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/40">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {appName}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          <Badge className={cn("text-xs", getStatusColor())}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Funcionalidades:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {(status === 'available' || status === 'beta') && (
          <Button
            onClick={handleOpenApp}
            variant="outline"
            size="sm"
            className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/40 group"
          >
            <span>Abrir Aplicativo</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
        
        {status === 'coming-soon' && (
          <div className="text-center py-2 text-sm text-muted-foreground">
            Em desenvolvimento
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppIntegration;
