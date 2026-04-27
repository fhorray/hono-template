import * as React from 'react';
import { cn } from '~/client/lib/utils';
import { XIcon } from 'lucide-react';
import type { JSX, Child } from 'hono/jsx';

const SheetContext = React.createContext<{ id: string } | undefined>(undefined);

interface SheetProps {
  children?: Child;
  id?: string;
}

function Sheet({ children, id }: SheetProps) {
  // Use a fallback if useId is not available in the environment
  const generatedId = React.useId ? React.useId() : Math.random().toString(36).substring(2, 9);
  const sheetId = id || `sheet-${generatedId.replace(/:/g, '')}`;

  return (
    <SheetContext.Provider value={{ id: sheetId }}>
      <input type="checkbox" id={sheetId} className="peer hidden" />
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['label']) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error('SheetTrigger must be used within Sheet');

  return (
    <label
      htmlFor={context.id}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </label>
  );
}

function SheetClose({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['label']) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error('SheetClose must be used within Sheet');

  return (
    <label
      htmlFor={context.id}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </label>
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: JSX.IntrinsicElements['div'] & {
  side?: 'left' | 'right';
  showCloseButton?: boolean;
}) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error('SheetContent must be used within Sheet');

  return (
    <>
      <label
        htmlFor={context.id}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300 peer-checked:opacity-100 peer-checked:pointer-events-auto"
      />
      <aside
        className={cn(
          'fixed top-0 z-50 h-full w-[350px] max-w-[80vw] bg-card border-border shadow-2xl transition-transform duration-300 ease-in-out peer-checked:translate-x-0',
          side === 'right'
            ? 'right-0 border-l translate-x-full'
            : 'left-0 border-r -translate-x-full',
          className,
        )}
        {...props}
      >
        <div className="flex flex-col h-full relative">
          {showCloseButton && (
            <SheetClose className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors text-foreground z-10">
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          )}
          {children}
        </div>
      </aside>
    </>
  );
}

function SheetHeader({
  className,
  ...props
}: JSX.IntrinsicElements['div']) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-0.5 p-6', className)}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  ...props
}: JSX.IntrinsicElements['div']) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-6', className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: JSX.IntrinsicElements['h3']) {
  return (
    <h3
      data-slot="sheet-title"
      className={cn('text-lg font-bold text-foreground font-sans', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: JSX.IntrinsicElements['p']) {
  return (
    <p
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground font-sans', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
