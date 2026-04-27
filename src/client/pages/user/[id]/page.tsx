import { useStore } from '@nanostores/react';
import { $router } from 'virtual:router';

export default function UserPage() {
  const page = useStore($router);

  // NanoStores uses the generated route name (r0, r1, etc.)
  // We check if we are on the correct route by comparing the path
  if (!page || !page.path.startsWith('/user/')) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Profile (Custom Router)</h1>
      <p>
        User ID: <strong>{page.params.id}</strong>
      </p>
      <a href="/">Go Back Home</a>
    </div>
  );
}
