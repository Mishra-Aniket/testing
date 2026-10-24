import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
};

const DESTINATIONS = [
  { href: '/', label: 'Home', desc: 'Portfolio, projects & engineering overview' },
  { href: '/pricing', label: 'Pricing & Sprints', desc: 'Fixed-scope proposals within 48 hours' },
  { href: '/blog', label: 'Engineering Blog', desc: 'Case studies & technical deep-dives' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B33] flex items-center justify-center px-6 selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <main className="w-full max-w-[640px] py-24 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B45309] mb-5">
          Error 404 · Route Not Deployed
        </p>

        <h1 className="font-serif text-[clamp(3.5rem,10vw,6rem)] font-bold leading-none tracking-[-0.03em] text-[#4A3B33] m-0">
          404
        </h1>

        <p className="mt-5 text-[1.05rem] leading-relaxed text-[#57534E] max-w-md mx-auto">
          This page doesn&apos;t exist — or was decommissioned in a recent refactor.
          Everything still worth reading is one click below.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 text-left">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-xl border border-[#E4D9BC] bg-white p-4 no-underline transition-all duration-200 hover:border-[#B45309] hover:shadow-[var(--shadow-soft)]"
            >
              <span className="block font-serif text-[15px] font-bold text-[#4A3B33] group-hover:text-[#B45309] transition-colors">
                {d.label}
              </span>
              <span className="mt-1 block font-mono text-[10.5px] leading-relaxed text-[#78716C]">
                {d.desc}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] text-[#A8A29E]">
          full-stack &amp; AI systems engineer
        </p>
      </main>
    </div>
  );
}
