import React, { useCallback, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';
import GoogleSignIn from './GoogleSignIn';
import { verifyCredentials, normalizePhone } from '../services/sheets';
import { hashSha256 } from '../utils/crypto';

const LoginCard: React.FC = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const identifier = mode === 'email' ? email : phone;
      if (mode === 'email') {
        if (!email.includes('@')) throw new Error('Informe um e-mail válido');
      } else {
        const norm = normalizePhone(phone);
        if (!norm) throw new Error('Informe um telefone válido no formato (XX) XXXXX-XXXX');
      }
      if (!password) throw new Error('Informe sua senha');
      const passHash = await hashSha256(password);
      const user = await verifyCredentials(identifier, passHash);
      if (!user) throw new Error('Credenciais inválidas');
      await login(user.email || identifier, 'verified');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [mode, email, phone, password, login]);

  return (
    <Card id="login" className="max-w-md w-full mx-auto border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <img src="/logo-vetius.png" alt="Logo" className="h-10 w-10 rounded" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://res.cloudinary.com/dwta1roq1/image/upload/w_64,q_auto/LOGOAPP' }} />
          <div>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Acesse para integrar com seus outros apps</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex rounded-lg border bg-muted/30 p-1 text-sm">
          <button type="button" onClick={() => setMode('email')} className={`flex-1 rounded-md py-2 transition ${mode==='email'?'bg-background shadow':'text-muted-foreground'}`}>E-mail</button>
          <button type="button" onClick={() => setMode('phone')} className={`flex-1 rounded-md py-2 transition ${mode==='phone'?'bg-background shadow':'text-muted-foreground'}`}>Telefone</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'email' ? (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">E-mail</label>
              <input
                className="w-full h-11 px-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={mode==='email'}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Telefone</label>
              <input
                className="w-full h-11 px-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={phone}
                onChange={(e) => {
                  const only = (e.target.value.match(/\d/g) || []).join('');
                  let masked = only;
                  if (only.length > 0) masked = `(${only.slice(0,2)}`;
                  if (only.length >= 3) masked += `) ${only.slice(2,7)}`;
                  if (only.length >= 8) masked += `-${only.slice(7,11)}`;
                  setPhone(masked);
                }}
                required={mode==='phone'}
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Senha</label>
            <input
              className="w-full h-11 px-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-destructive">{error}</div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        <div className="my-4 text-center text-xs text-muted-foreground">ou</div>
        <GoogleSignIn />
      </CardContent>
    </Card>
  );
};

export default LoginCard;


