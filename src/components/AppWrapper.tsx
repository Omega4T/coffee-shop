'use client';

import { useEffect, ReactNode } from 'react';
import { useLenis } from '@studio-freight/lenis/react';
import { motion, motionValue, useScroll, useTransform } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: LayoutProps) => {
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();

  // Efek untuk update Lenis saat ada perubahan
  useEffect(() => {
    // Setup Lenis secara langsung di sini
    const lenis = new (require('@studio-freight/lenis').default)({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default AppWrapper;