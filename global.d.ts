declare module 'hono' {
  interface ContextVariableMap {
    // test: string
  }
}

declare module 'virtual:routes' {
  export const routes: Array<{
    name: string;
    component: React.ComponentType<any>
  }>;
}

declare module 'virtual:router' {
  import { ReadableAtom } from 'nanostores';

  interface RouterState {
    path: string;
    route: string;
    params: Record<string, string>;
  }

  export const $router: ReadableAtom<RouterState> & {
    open: (path: string) => void;
  };
}