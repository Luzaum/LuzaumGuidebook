import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calculator, Heart, BookOpen, Activity, Zap } from 'lucide-react';

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
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dwta1roq1/image/upload/w_120,q_auto/LOGOAPP"
                  alt="Logo Vetius"
                  className="h-32 w-32 md:h-40 md:w-40 mx-auto drop-shadow-xl"
                />
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-[oklch(0.68_0.18_150)] bg-clip-text text-transparent">
                Vetius
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              seu companheiro veterinário, sempre que precisar!
            </p>

            <div className="flex justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="group relative isolate overflow-hidden rounded-2xl px-12 py-6 text-xl font-semibold text-primary-foreground shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                bg-gradient-to-br from-[oklch(0.78_0.2_150)] via-[oklch(0.72_0.2_150)] to-[oklch(0.66_0.18_150)] hover:scale-[1.03]
                hover:shadow-2xl hover:shadow-[oklch(0.75_0.2_150)/25] active:scale-[0.98]"
              >
                <span className="relative z-10">Explorar aplicativos</span>
                <span className="pointer-events-none absolute inset-0 -z-0 opacity-100 transition-opacity duration-500 bg-[radial-gradient(120%_120%_at_50%_0%,white/25_0%,transparent_60%)]" />
                <span className="pointer-events-none absolute -inset-[200%] -z-10 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_340deg_360deg)]" />
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
