import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Mail, Save, ShieldUser, UserRound } from 'lucide-react';
import { useClinicAuth } from '../context/ClinicAuthContext';

type StoredAccountState = {
  login: string;
  email: string;
  password?: string;
};

function accountStorageKey(userId: string) {
  return `dv:account:${userId}`;
}

function defaultEmailFromName(name: string) {
  const slug = name.trim().toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');
  return `${slug || 'usuario'}@vetius.local`;
}

export const AccountSettings = () => {
  const { currentUser } = useClinicAuth();
  const [login, setLogin] = useState(currentUser.name);
  const [email, setEmail] = useState(defaultEmailFromName(currentUser.name));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const storageKey = useMemo(() => accountStorageKey(currentUser.id), [currentUser.id]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredAccountState;
      setLogin(parsed.login || currentUser.name);
      setEmail(parsed.email || defaultEmailFromName(currentUser.name));
      setStoredPassword(parsed.password);
    } catch {
      setError('Nao foi possivel carregar os dados da conta local.');
    }
  }, [storageKey, currentUser.name]);

  const saveProfile = () => {
    setError('');
    setMessage('');
    try {
      const data: StoredAccountState = { login, email, password: storedPassword };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setMessage('Dados da conta salvos com sucesso.');
    } catch {
      setError('Falha ao salvar dados da conta.');
    }
  };

  const changePassword = () => {
    setError('');
    setMessage('');

    if (!newPassword || newPassword.length < 6) {
      setError('A nova senha deve ter no minimo 6 caracteres.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('A confirmacao da nova senha nao confere.');
      return;
    }
    if (storedPassword && currentPassword !== storedPassword) {
      setError('A senha atual informada esta incorreta.');
      return;
    }

    try {
      const data: StoredAccountState = { login, email, password: newPassword };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setStoredPassword(newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setMessage('Senha alterada com sucesso. Integracao por e-mail sera adicionada depois.');
    } catch {
      setError('Falha ao atualizar senha.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Conta</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Gerencie login e senha da conta dentro do app.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 backdrop-blur p-6 md:p-8 space-y-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldUser size={18} className="text-primary" />
          Dados de acesso
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Login</span>
            <div className="relative">
              <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/25 outline-none"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">E-mail de acesso</span>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/25 outline-none"
              />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveProfile}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            <Save size={16} />
            Salvar dados
          </button>
          <button
            type="button"
            disabled
            className="rounded-xl border border-gray-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
          >
            Enviar e-mail de recuperacao (em breve)
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 backdrop-blur p-6 md:p-8 space-y-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <KeyRound size={18} className="text-primary" />
          Alterar senha
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Senha atual</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder={storedPassword ? 'Informe sua senha atual' : 'Primeiro cadastro de senha'}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/25 outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Nova senha</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/25 outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Confirmar nova senha</span>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/25 outline-none"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={changePassword}
          className="rounded-xl border border-primary/35 bg-primary/10 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary/15 transition-colors"
        >
          Atualizar senha
        </button>

        {message ? <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p> : null}
        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      </section>
    </motion.div>
  );
};
