import { Button, buttonVariants } from '~/client/components/ui/button';
import { authClient } from '~/client/lib/auth';
import { cn } from '~/lib/utils';

export default function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-sans overflow-x-hidden">
      <div className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl p-10 border border-border relative z-10">
        <header className="mb-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full font-sans">
            Lightweight & Native
          </div>
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4 font-sans">
            Hono <span className="text-primary">+</span> Shadcn UI
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-sans">
            Authenticated Hono Stack with Better Auth and Cloudflare D1.
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-muted/30 rounded-2xl p-8 border border-border/50 text-center font-sans">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground font-sans">
              Estado da Sessão
            </h2>

            {isPending ? (
              <p>Carregando...</p>
            ) : session ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                    {session.user.name?.[0] ||
                      session.user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">Você não está logado.</p>
                <a
                  href="/auth"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'w-full max-w-xs',
                  )}
                >
                  Ir para Login
                </a>
              </div>
            )}
          </section>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/api/hello"
              className="group flex flex-col p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors font-sans">
                API Endpoint
              </span>
              <span className="text-sm text-muted-foreground mt-1 font-sans">
                Test the Hono backend response.
              </span>
            </a>
            <div className="group flex flex-col p-6 bg-card border border-border rounded-2xl shadow-sm opacity-50">
              <span className="font-bold text-lg text-foreground font-sans">
                Admin Area
              </span>
              <span className="text-sm text-muted-foreground mt-1 font-sans">
                {session?.user.role === 'admin'
                  ? 'Acesso liberado'
                  : 'Apenas para admins'}
              </span>
            </div>
          </nav>
        </main>

        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground font-sans">
          Built with <span className="font-bold">Hono</span>,{' '}
          <span className="font-bold">Better Auth</span> and{' '}
          <span className="font-bold">D1</span>
        </footer>
      </div>
    </div>
  );
}
