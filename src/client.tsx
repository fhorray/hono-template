import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { useStore } from '@nanostores/react';
import { routes } from 'virtual:routes';
import { $router } from 'virtual:router';

// Map for quick component lookup by route name
const routeComponents: Record<string, any> = {};
routes.forEach((r: any) => {
  routeComponents[r.name] = r.component;
});

const RouterRenderer = () => {
  const page = useStore($router);

  if (!page) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
    );
  }

  const Component = routeComponents[page.route];

  if (Component) {
    return <Component />;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Mapping Error</h1>
      <p>
        Route <strong>{page.route}</strong> found, but component is missing.
      </p>
    </div>
  );
};

// Hydrate the application
hydrateRoot(document.getElementById('root')!, <RouterRenderer />);


