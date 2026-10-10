'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import TechOrbFallback from './TechOrbFallback';

const TechOrb = dynamic(() => import('./TechOrb'), {
  ssr: false,
  loading: () => <TechOrbFallback />,
});

export default function DynamicTechOrb() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check if device is likely low-powered mobile
    const isMobile = window.innerWidth < 768;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          canvas.getContext('webgl2') ||
          canvas.getContext('webgl')
        );
      } catch {
        return false;
      }
    })();

    setShouldRender3D(!prefersReducedMotion && hasWebGL && !isMobile);
  }, []);

  if (!shouldRender3D) {
    return <TechOrbFallback />;
  }

  return <TechOrb />;
}
