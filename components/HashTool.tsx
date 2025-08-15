import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { hashSha256 } from '../utils/crypto';

const HashTool: React.FC = () => {
  const [plain, setPlain] = useState('');
  const [hash, setHash] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const onGenerate = useCallback(async () => {
    setBusy(true);
    setCopied(false);
    try {
      const out = await hashSha256(plain);
      setHash(out);
    } finally {
      setBusy(false);
    }
  }, [plain]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [hash]);

  return (
    <Card className="mt-6 border-primary/20">
      <CardHeader>
        <CardTitle>Gerar SHA-256</CardTitle>
        <CardDescription>Para preencher a coluna passwordHash na planilha</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <input
          className="w-full h-11 px-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
          type="text"
          placeholder="Digite a senha em texto plano"
          value={plain}
          onChange={(e) => setPlain(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={onGenerate} disabled={!plain || busy}>{busy ? 'Gerando...' : 'Gerar hash'}</Button>
          <Button variant="outline" onClick={onCopy} disabled={!hash}>{copied ? 'Copiado!' : 'Copiar'}</Button>
        </div>
        {hash && (
          <div className="break-all text-xs text-muted-foreground">{hash}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default HashTool;


