import { Hono } from 'hono';
import { contextStorage } from 'hono/context-storage';
import { reactRenderer } from '@hono/react-renderer';
import { useStore } from '@nanostores/react';
import { routes } from 'virtual:routes';
import { $router } from 'virtual:router';

// Import the API server
import api from './server';

const app = new Hono();

app.use(contextStorage());

// Map for quick component lookup by route name
const routeComponents: Record<string, any> = {};
routes.forEach((r: any) => {
  routeComponents[r.name] = r.component;
});

// Mount the API server on the root
// UI routes will be handled after this if they don't match API endpoints
app.route('/', api);

app.use(
  '*',
  reactRenderer(({ children }) => {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Hono Fullstack Template</title>
        </head>
        <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
          {children}
        </body>
      </html>
    );
  }),
);

// Central routing component: Simple and Automatic
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

  // Find the component directly by active route name
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

app.get('*', (c) => {
  // Sync the router with the current URL (SSR)
  $router.open(c.req.path);
  return c.render(<RouterRenderer />);
});

export default app;
