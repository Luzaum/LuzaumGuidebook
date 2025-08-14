import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';

const LoginCard: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!email.includes('@')) throw new Error('Informe um e-mail válido');
      await login(email, password);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [email, password, login]);

  return (
    <Card className="max-w-md w-full mx-auto border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/dwta1roq1/image/upload/w_64,q_auto/LOGOAPP"
            alt="Logo"
            className="h-10 w-10"
          />
          <div>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Acesse para integrar com seus outros apps</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">E-mail</label>
            <input
              className="w-full h-11 px-3 rounded-md border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Senha</label>
            <input
              className="w-full h-11 px-3 rounded-md border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Dica: use qualquer e-mail válido. Este login é local e serve para passagem segura aos seus outros apps.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;


