import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Info } from 'lucide-react';

export default function BcsGuide() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
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
            
            <TabsContent value="dog" className="space-y-6">
              <div className="bg-muted p-8 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30 min-h-[200px]">
                <div className="text-center text-muted-foreground">
                  <p className="font-medium">Espaço para Imagem do Guia BCS (Cães)</p>
                  <p className="text-sm mt-2">Faça upload da imagem oficial do FEDIAF ou WSAVA aqui.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Critérios de Avaliação (Cães)</h3>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg border-l-4 border-l-red-500">
                    <span className="font-bold text-red-600">1-3 (Abaixo do Peso):</span> Costelas, vértebras lombares e ossos pélvicos facilmente visíveis. Nenhuma gordura palpável. Perda evidente de massa muscular.
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20">
                    <span className="font-bold text-green-600">4-5 (Ideal):</span> Costelas palpáveis sem excesso de cobertura de gordura. Cintura observada atrás das costelas quando visto de cima. Abdômen esgalgado quando visto de lado.
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-yellow-500">
                    <span className="font-bold text-yellow-600">6-7 (Sobrepeso):</span> Costelas palpáveis com leve a moderado excesso de gordura. Cintura não discernível ou pouco visível.
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-red-500">
                    <span className="font-bold text-red-600">8-9 (Obeso):</span> Costelas não palpáveis sob espessa camada de gordura. Depósitos de gordura sobre a área lombar e base da cauda. Abdômen distendido.
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cat" className="space-y-6">
              <div className="bg-muted p-8 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30 min-h-[200px]">
                <div className="text-center text-muted-foreground">
                  <p className="font-medium">Espaço para Imagem do Guia BCS (Gatos)</p>
                  <p className="text-sm mt-2">Faça upload da imagem oficial do FEDIAF ou WSAVA aqui.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Critérios de Avaliação (Gatos)</h3>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg border-l-4 border-l-red-500">
                    <span className="font-bold text-red-600">1-3 (Abaixo do Peso):</span> Costelas visíveis em gatos de pelo curto. Nenhuma gordura palpável. Acentuado esgalgamento abdominal.
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20">
                    <span className="font-bold text-green-600">4-5 (Ideal):</span> Costelas palpáveis com leve cobertura de gordura. Cintura observada atrás das costelas. Leve camada de gordura abdominal. (Nota: gatos castrados inativos podem ter ideal 4/9).
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-yellow-500">
                    <span className="font-bold text-yellow-600">6-7 (Sobrepeso):</span> Costelas palpáveis com dificuldade. Cintura ausente. Leve a moderado coxim de gordura abdominal.
                  </div>
                  <div className="p-4 border rounded-lg border-l-4 border-l-red-500">
                    <span className="font-bold text-red-600">8-9 (Obeso):</span> Costelas não palpáveis. Grande distensão abdominal com coxim de gordura proeminente. Depósitos de gordura na face e membros.
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

