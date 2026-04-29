import * as React from 'react';
import { useState } from 'react';
import { authClient } from '~/client/lib/auth';
import { Button } from '~/client/components/ui/button';
import { Input } from '~/client/components/ui/input';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: '/',
        });
      } else {
        await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: '/',
        });
      }
    } catch (error) {
      alert(isLogin ? 'Erro ao entrar' : 'Erro ao cadastrar');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Entre com seus dados para acessar' : 'Preencha os campos abaixo'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome</label>
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Senha</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
          </button>
        </div>
      </div>
    </div>
  );
}
