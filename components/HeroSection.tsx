import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calculator, Heart, BookOpen, Activity, Brain, TestTube, Stethoscope, Zap } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const features = [
    { icon: Calculator, title: "Calculadoras", description: "Fluidoterapia, transfusão e mais" },
    { icon: Heart, title: "Emergências", description: "Protocolos de emergência" },
    { icon: BookOpen, title: "Guias", description: "Referências e formulários" },
    { icon: Activity, title: "Avaliações", description: "Escalas e avaliações clínicas" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 dark:opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Content */}
        <div className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo and Title */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/w_120,q_auto/LOGOAPP"
                  alt="Logo Luzaum's Guidebook"
                  className="h-24 w-24 mx-auto"
                />
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Luzaum's{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Guidebook
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Seu companheiro clínico, anestésico e cirúrgico. 
              Ferramentas essenciais para a prática veterinária moderna.
            </p>

            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explorar Aplicativos
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted/50 backdrop-blur-sm border-t">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6+</div>
                <div className="text-muted-foreground">Aplicativos Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Gratuito</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
