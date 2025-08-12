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
        return 'bg-green-100 text-green-800';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'beta':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                {appName}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Funcionalidades:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
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
            className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 group"
          >
            <span>Abrir Aplicativo</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
        
        {status === 'coming-soon' && (
          <div className="text-center py-2 text-sm text-gray-500">
            Em desenvolvimento
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppIntegration;
