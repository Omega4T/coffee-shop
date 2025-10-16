'use client';

import Lenis from '@studio-freight/lenis';

const SmoothScroller = () => {
  const scrollToTop = () => {
    // Fungsi untuk scroll ke atas dengan animasi yang lembut
    const start = window.pageYOffset;
    const distance = 0 - start;
    const duration = 1500; // Durasi dalam ms
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Fungsi easing yang lebih lembut (easeInOutCubic)
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, start + distance * easeProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        className="bg-amber-600 hover:bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default SmoothScroller;