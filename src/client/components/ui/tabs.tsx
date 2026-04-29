import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

// Context to manage the active tab state
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

function Tabs({
  defaultValue,
  className,
  orientation = 'horizontal',
  children,
  ...props
}: any) {
  // Use a state that works both on server and client
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Synchronize state if needed (optional)
  useEffect(() => {
    if (defaultValue) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(
          'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground bg-muted group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function TabsList({ className, variant = 'default', children, ...props }: any) {
  return (
    <div
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ className, value, children, ...props }: any) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => context?.setActiveTab(value)}
      data-slot="tabs-trigger"
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'relative inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, children, ...props }: any) {
  const context = useContext(TabsContext);

  // Only render children if the tab is active
  if (context?.activeTab !== value) return null;

  return (
    <div
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
