import Image from 'next/image';

const PARTNERS = [
  { name: 'Veranda Learning', src: '/VerandaLearning.png', width: 125, height: 26 },
  { name: 'Unacademy', src: '/Unacademy.png', width: 120, height: 26 },
  { name: 'Great Learning', src: '/GreatLearning.png', width: 130, height: 28 },
  { name: 'Anarock', src: '/Anarock.png', width: 110, height: 26 },
  { name: 'CIEL HR', src: '/CIEL.png', width: 90, height: 26 },
  { name: 'Motilal Oswal', src: '/MotilalOswal.png', width: 120, height: 28 },
  { name: 'Razorpay', src: '/Razorpay.svg', width: 110, height: 26 },
  { name: 'Swiggy', src: '/Swiggy.webp', width: 95, height: 26 },
];

export default function PartnerMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBF7] pt-8 pb-20 border-b border-[#E4D9BC]/40">
      <div className="mx-auto mb-10 flex max-w-[1200px] items-center gap-6 px-6 lg:px-8">
        <div className="h-px w-full bg-[#E4D9BC] flex-1" />
        <span className="shrink-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">
          Trusted by developer teams at
        </span>
        <div className="h-px w-full bg-[#E4D9BC] flex-1" />
      </div>

      <div
        className="marquee group relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max">
          {/* Track 1 */}
          <ul className="flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNERS.map((partner, idx) => (
              <li key={`p1-${idx}`} className="flex h-10 items-center justify-center shrink-0">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-6 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all"
                />
              </li>
            ))}
          </ul>
          {/* Track 2 (Seamless clone) */}
          <ul aria-hidden="true" className="flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNERS.map((partner, idx) => (
              <li key={`p2-${idx}`} className="flex h-10 items-center justify-center shrink-0">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-6 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
