import { Hono } from 'hono';
import { contextStorage } from 'hono/context-storage';
import { reactRenderer } from '@hono/react-renderer';
import { useStore } from '@nanostores/react';
import { routes } from 'virtual:routes';
import { $router } from 'virtual:router';

// Get the stylesheet URL automatically (works in dev and prod)
import styleSheet from './client/style.css?url';

// Import the API server
import api from './server';

// Map for quick component lookup by route name
const routeComponents: Record<string, any> = {};
routes.forEach((r) => {
  routeComponents[r.name] = r.component;
});

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

const app = new Hono()

  // Global Middlewares
  .use(contextStorage())

  // Mount the API server on the root
  .route('/', api)

  // Use the React renderer for all other routes
  .use(
    '*',
    reactRenderer(({ children }) => {
      return (
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="stylesheet" href={styleSheet} />
            <title>Hono Fullstack Template</title>
          </head>
          <body className="antialiased">
            {children}
          </body>
        </html>
      );
    }),
  )

  // Sync the router with the current URL (SSR)
  .get('*', (c) => {
    $router.open(c.req.path);
    return c.render(<RouterRenderer />);
  });

export default app;
export type App = typeof app;
