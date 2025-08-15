import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { generateDrLuzaumOpinion } from '../services/ai';
import { useToast } from './ToastProvider';

type Props = {
  buildCaseSummary: () => string; // função que extrai/resume os dados do app atual
};

const DrLuzaumOpinion: React.FC<Props> = ({ buildCaseSummary }) => {
  const [extra, setExtra] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const { show } = useToast();

  const onGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const summary = buildCaseSummary();
      const text = await generateDrLuzaumOpinion({ caseSummary: summary, extraNotes: extra });
      setOutput(text);
      show('Opinião do Dr. Luzaum gerada', 'success');
    } catch (e) {
      show((e as Error).message || 'Falha ao gerar opinião', 'error');
    } finally {
      setLoading(false);
    }
  }, [extra, buildCaseSummary, show]);

  return (
    <Card className="mt-6 border-primary/30">
      <CardHeader>
        <CardTitle>Gerar opinião do Dr. Luzaum</CardTitle>
        <CardDescription>Opinião clínica fundamentada em literatura veterinária</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          className="w-full min-h-24 rounded-lg border p-3 bg-background text-foreground"
          placeholder="Dados extras (opcional): sinais adicionais, comorbidades, achados..."
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
        />
        <Button onClick={onGenerate} disabled={loading}>{loading ? 'Gerando...' : 'Gerar opinião do Dr. Luzaum'}</Button>
        {output && (
          <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap text-sm">
            {output}
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Aviso: esta explicação não substitui o julgamento do médico-veterinário. O aplicativo é apenas um guia e não se responsabiliza por decisões clínicas.
        </div>
      </CardContent>
    </Card>
  );
};

export default DrLuzaumOpinion;


