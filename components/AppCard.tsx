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
          ? "hover:border-primary/30 hover:bg-accent/50" 
          : "opacity-60 border-muted",
        className
      )}
      onClick={implemented ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              implemented ? "bg-primary/10 group-hover:bg-primary/20" : "bg-muted"
            )}>
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
              {description && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge 
            variant={implemented ? "default" : "secondary"}
            className={cn(
              "text-xs",
              implemented ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
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
            className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30"
          >
            Abrir Aplicativo
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AppCard;
