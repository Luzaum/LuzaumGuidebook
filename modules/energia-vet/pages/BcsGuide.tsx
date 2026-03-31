import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Info, ZoomIn } from 'lucide-react';

export default function BcsGuide() {
  return (
    <div className="space-y-8 w-full pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guia de Escore Corporal (BCS)</h1>
        <p className="text-muted-foreground mt-2">Referência visual para avaliação nutricional baseada no FEDIAF 2025.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              O que é o BCS?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">O Body Condition Score (BCS) é um método semiquantitativo para avaliar a composição corporal, especificamente o percentual de gordura, e estimar o grau de sobrepeso ou baixo peso.</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-muted-foreground" />
              Por que importa?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">O peso corporal isolado não é suficiente. O BCS ajuda a definir o peso ideal e a meta nutricional. O escore ideal é 4/9 ou 5/9, correspondendo a 15-25% de gordura em cães e 20-30% em gatos.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Escala de 9 Pontos</CardTitle>
          <CardDescription>Selecione a espécie para ver os detalhes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dog">Cães</TabsTrigger>
              <TabsTrigger value="cat">Gatos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dog" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
              <div className="lg:col-span-7 space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-muted rounded-2xl overflow-hidden border border-border shadow-sm cursor-zoom-in group relative hover:ring-2 ring-orange-500/50 transition-all">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 flex items-center justify-center">
                        <ZoomIn className="origin-center scale-0 group-hover:scale-150 text-white/80 transition-transform duration-300 drop-shadow-md" />
                      </div>
                      <img src="/apps/bcs/dog_bcs.jpg" alt="Guia BCS Canino" className="w-full h-auto object-contain" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] lg:max-w-[1400px] h-[90vh] p-0 overflow-hidden bg-[#141010] border-white/10 flex flex-col">
                    <div className="w-full flex-1 overflow-auto p-4 cursor-move">
                      <img src="/apps/bcs/dog_bcs.jpg" alt="Guia BCS Canino Ampliado" className="w-full min-w-[1000px] h-auto object-contain" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Critérios de Avaliação
                </h3>
                <div className="grid gap-3">
                  <div className="p-4 border rounded-xl border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-950/10">
                    <p className="font-bold text-red-600 mb-1">1-3: Muito Magro</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas, vértebras lombares e ossos pélvicos visíveis à distância. Nenhuma gordura palpável. Perda evidente de massa muscular.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <p className="font-bold text-emerald-600 mb-1">4-5: Peso Ideal</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas palpáveis sem excesso de gordura. Cintura visível quando visto de cima. Abdômen retraído ("esgalgado") lateralmente.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/10">
                    <p className="font-bold text-amber-600 mb-1">6-7: Sobrepeso</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas palpáveis com dificuldade sob moderada camada de gordura. Cintura visível mas não proeminente.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-red-600 bg-red-50/30 dark:bg-red-950/10">
                    <p className="font-bold text-red-700 mb-1">8-9: Obeso</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas não palpáveis sob espessa camada de gordura. Depósitos de gordura sobre a lombar e base da cauda. Cintura ausente.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cat" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
              <div className="lg:col-span-7 space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-muted rounded-2xl overflow-hidden border border-border shadow-sm cursor-zoom-in group relative hover:ring-2 ring-orange-500/50 transition-all">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 flex items-center justify-center">
                        <ZoomIn className="origin-center scale-0 group-hover:scale-150 text-white/80 transition-transform duration-300 drop-shadow-md" />
                      </div>
                      <img src="/apps/bcs/cat_bcs.jpg" alt="Guia BCS Felino" className="w-full h-auto object-contain" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] lg:max-w-[1400px] h-[90vh] p-0 overflow-hidden bg-[#141010] border-white/10 flex flex-col">
                    <div className="w-full flex-1 overflow-auto p-4 cursor-move">
                      <img src="/apps/bcs/cat_bcs.jpg" alt="Guia BCS Felino Ampliado" className="w-full min-w-[1000px] h-auto object-contain" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Critérios de Avaliação
                </h3>
                <div className="grid gap-3">
                  <div className="p-4 border rounded-xl border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-950/10">
                    <p className="font-bold text-red-600 mb-1">1-3: Muito Magro</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas visíveis em gatos de pelo curto. Nenhuma gordura abdominal palpável. Acentuado esgalgamento abdominal.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <p className="font-bold text-emerald-600 mb-1">4-5: Peso Ideal</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas palpáveis com leve cobertura de gordura. Cintura visível atrás das costelas. Leve camada de gordura abdominal.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/10">
                    <p className="font-bold text-amber-600 mb-1">6-7: Sobrepeso</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas palpáveis com dificuldade. Cintura ausente ou pouco visível. Moderado coxim de gordura abdominal.</p>
                  </div>
                  <div className="p-4 border rounded-xl border-l-4 border-l-red-600 bg-red-50/30 dark:bg-red-950/10">
                    <p className="font-bold text-red-700 mb-1">8-9: Obeso</p>
                    <p className="text-sm leading-relaxed text-foreground/80">Costelas não palpáveis sob espessa camada de gordura. Grande distensão abdominal com coxim de gordura proeminente.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

