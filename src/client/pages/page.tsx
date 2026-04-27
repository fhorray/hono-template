import { Button, buttonVariants } from "~/client/components/ui/button"
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "~/client/components/ui/sheet"
import { cn } from "~/client/lib/utils"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-sans overflow-x-hidden">
      <div className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl p-10 border border-border relative z-10">
        <header className="mb-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full font-sans">
            Lightweight & Native
          </div>
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4 font-sans">
            Hono <span className="text-primary">+</span> Native UI
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-sans">
            Refactored UI components to work perfectly with Hono SSR using CSS-only interactivity.
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-muted/30 rounded-2xl p-8 border border-border/50 text-center font-sans">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground font-sans">Interactivity Test</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-lg shadow-primary/20 font-sans">
                Regular Button
              </Button>
              
              {/* Using the new Native Sheet component */}
              <Sheet>
                <SheetTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), "font-sans")}>
                  Open Native Sheet
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Native Sheet</SheetTitle>
                    <SheetDescription>
                      This component now lives in <strong>ui/sheet.tsx</strong> and uses the native checkbox hack for state management.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="p-6 space-y-6 text-foreground font-sans">
                    <section className="space-y-3">
                      <h4 className="font-semibold text-primary uppercase text-xs tracking-widest font-sans">Architecture</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                        By moving the logic to the component folder, we keep the pages clean and reusable.
                      </p>
                    </section>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
                          <span className="block text-2xl font-bold font-sans">100%</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-sans">SSR Safe</span>
                       </div>
                       <div className="p-4 bg-muted/50 rounded-xl border border-border/50 text-center">
                          <span className="block text-2xl font-bold font-sans">0kb</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-sans">JS Loaded</span>
                       </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </section>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="/user/123" 
              className="group flex flex-col p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors font-sans">User Profile</span>
              <span className="text-sm text-muted-foreground mt-1 font-sans">Check dynamic routing with parameters.</span>
            </a>
            <a 
              href="/api/hello" 
              className="group flex flex-col p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors font-sans">API Endpoint</span>
              <span className="text-sm text-muted-foreground mt-1 font-sans">Test the Hono backend response.</span>
            </a>
          </nav>
        </main>

        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground font-sans">
          Built with <span className="font-bold">Hono</span>, <span className="font-bold">Tailwind CSS 4</span>, and <span className="font-bold">Native UI</span>
        </footer>
      </div>
    </div>
  )
}
