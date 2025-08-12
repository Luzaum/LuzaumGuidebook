import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface AppCardProps {
  name: string;
  icon: React.ReactNode;
  implemented: boolean;
  description?: string;
  category: string;
  onClick: () => void;
  className?: string;
}

const AppCard: React.FC<AppCardProps> = ({
  name,
  icon,
  implemented,
  description,
  category,
  onClick,
  className
}) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2",
        implemented 
          ? "hover:border-green-300 hover:bg-green-50/50" 
          : "opacity-60 border-gray-200",
        className
      )}
      onClick={implemented ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              implemented ? "bg-green-100 group-hover:bg-green-200" : "bg-gray-100"
            )}>
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                {name}
              </CardTitle>
              {description && (
                <CardDescription className="text-sm text-gray-600 mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge 
            variant={implemented ? "default" : "secondary"}
            className={cn(
              "text-xs",
              implemented ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
            )}
          >
            {implemented ? "Disponível" : "Em breve"}
          </Badge>
        </div>
      </CardHeader>
      
      {implemented && (
        <CardContent className="pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
          >
            Abrir Aplicativo
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AppCard;
