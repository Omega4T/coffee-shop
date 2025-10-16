'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  useEffect(() => {
    // Inisialisasi Lenis untuk smooth scrolling
    const lenis = new Lenis({
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

    // Fungsi untuk mengupdate Lenis setiap frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Mulai loop animasi
    requestAnimationFrame(raf);

    // Cleanup saat komponen di-unmount
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

export default ClientWrapper;