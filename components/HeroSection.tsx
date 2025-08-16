import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calculator, Heart, BookOpen, Activity } from 'lucide-react';
import Logo from './Logo';

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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220%200%2060%2060%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 dark:opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Content */}
        <div className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo and Title */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative w-[85vw] max-w-[32rem] md:max-w-[40rem] lg:max-w-[44rem]">
                <Logo className="w-full h-auto mx-auto object-contain drop-shadow-xl" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-[oklch(0.68_0.18_150)] bg-clip-text text-transparent">
                Vetius
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed text-center">
              Seu companheiro clínico, anestésico e cirúrgico, sempre que precisar, na palma das mãos!
            </p>

            <div className="flex justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="relative overflow-hidden rounded-2xl px-14 py-7 text-2xl font-semibold text-primary-foreground shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                bg-gradient-to-b from-[oklch(0.78_0.2_150)] to-[oklch(0.68_0.18_150)] hover:shadow-[0_20px_50px_-10px_rgba(34,197,94,0.35)] hover:translate-y-[-1px]"
              >
                <span className="relative z-10">Explorar aplicativos</span>
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,white/15_0%,transparent_60%)]" />
                <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
              </Button>
            </div>
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

        {/* Stats Section removed as requested */}
      </div>
    </div>
  );
};

export default HeroSection;
