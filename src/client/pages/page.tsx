export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-900">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600 mb-2">
            Hono + Tailwind
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your fullstack template with automatic file-based routing.
          </p>
        </header>

        <main className="space-y-6">
          <section className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-900 mb-2">Getting Started</h2>
            <p className="text-indigo-800 opacity-90">
              Tailwind CSS 4 is now configured and ready to use. This page is a simple demonstration of what you can build.
            </p>
          </section>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="/user/123" 
              className="flex items-center justify-center p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 shadow-sm font-medium"
            >
              View User Profile
            </a>
            <a 
              href="/api/hello" 
              className="flex items-center justify-center p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 shadow-sm font-medium"
            >
              Test API Endpoint
            </a>
          </nav>
        </main>

        <footer className="mt-10 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          Built with Hono, Vite, and React (via @hono/react-compat)
        </footer>
      </div>
    </div>
  )
}
