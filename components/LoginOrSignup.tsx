import React, { useState } from 'react';
import LoginCard from './LoginCard';
import HashTool from './HashTool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { appendUserViaAppsScript } from '../services/sheets';
import { hashSha256 } from '../utils/crypto';
import { useToast } from './ToastProvider';

const LoginOrSignup: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const { show } = useToast();

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const passwordHash = await hashSha256(password);
      const ok = await appendUserViaAppsScript({ name, email, phone: (phone.match(/\d/g) || []).join(''), passwordHash });
      setMsg(ok ? 'Cadastro enviado com sucesso!' : 'Falha ao enviar cadastro');
      show(ok ? 'Cadastro enviado!' : 'Falha ao enviar cadastro', ok ? 'success' : 'error');
      if (ok) {
        setName(''); setEmail(''); setPhone(''); setPassword('');
      }
    } catch (err) {
      setMsg(String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <LoginCard />
        <HashTool />
      </div>
      <div>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Crie sua conta e enviaremos para aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={onSignup}>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Nome</label>
                <input className="w-full h-11 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" value={name} onChange={(e)=>setName(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">E-mail</label>
                <input className="w-full h-11 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Telefone</label>
                <input className="w-full h-11 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={(e)=>{
                  const only=(e.target.value.match(/\d/g)||[]).join('');
                  let masked=only; if(only.length>0) masked=`(${only.slice(0,2)}`; if(only.length>=3) masked+=`) ${only.slice(2,7)}`; if(only.length>=8) masked+=`-${only.slice(7,11)}`; setPhone(masked);
                }} />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Senha</label>
                <input className="w-full h-11 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              {msg && <div className="text-sm text-muted-foreground">{msg}</div>}
              <Button type="submit" disabled={busy}>{busy?'Enviando...':'Cadastrar'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginOrSignup;


