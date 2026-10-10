export default function TechOrbFallback() {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      role="img"
      aria-label="Technology stack visualization"
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Central orb */}
        <div className="absolute inset-1/4 rounded-full bg-primary/20 border border-primary/30 animate-pulse" />
        <div className="absolute inset-[30%] rounded-full bg-primary/10 border border-primary/20" />
        
        {/* Orbital rings */}
        <div className="absolute inset-0 rounded-full border border-primary/10" />
        <div className="absolute inset-[10%] rounded-full border border-primary/8" />
        <div className="absolute inset-[20%] rounded-full border border-primary/5" />
        
        {/* Tech dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#61DAFB]" />
        <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-[#3178C6]" />
        <div className="absolute bottom-1/4 right-[10%] w-3 h-3 rounded-full bg-[#539E43]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8650A]" />
        <div className="absolute bottom-1/4 left-[10%] w-3 h-3 rounded-full bg-[#336791]" />
        <div className="absolute top-1/4 left-0 w-3 h-3 rounded-full bg-[#FF9900]" />
      </div>
    </div>
  );
}
