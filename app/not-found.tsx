import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>
        <p className="text-text-muted mb-8">Page not found.</p>
        <Link
          href="/"
          className="text-sm bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
