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
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border h-full flex flex-col",
        implemented 
          ? "hover:border-primary/40 hover:bg-accent/40" 
          : "opacity-60 border-muted",
        className
      )}
      onClick={implemented ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-md transition-colors shrink-0",
              implemented ? "bg-primary/10 group-hover:bg-primary/20" : "bg-muted"
            )}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {name}
              </CardTitle>
              {description && (
                <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-3">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge 
            variant={implemented ? "default" : "secondary"}
            className={cn(
              "text-xs whitespace-nowrap",
              implemented ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            {implemented ? "Disponível" : "Em breve"}
          </Badge>
        </div>
      </CardHeader>
      
      {implemented && (
        <CardContent className="pt-0 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/40"
          >
            Abrir
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AppCard;
