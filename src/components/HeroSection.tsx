'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ParallaxText } from './Parallax';

const HeroSection = () => {
  // Fungsi untuk smooth scroll ke section tertentu
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset untuk navbar
      
      // Implementasi smooth scroll manual dengan animasi yang lebih lembut
      const start = window.pageYOffset;
      const distance = offsetTop - start;
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
    }
  };
  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background dengan efek sinematik */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/coffee-hero-bg.jpg"
          alt="Coffee Shop Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
      </div>
      
      {/* Konten Hero */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <ParallaxText offset={-100}>
          Crafted with Passion
        </ParallaxText>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Discover the finest handcrafted coffee experience. Where every cup tells a story.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={() => scrollToSection('menu')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg transition-colors"
          >
            Explore Our Menu
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg transition-colors"
          >
            Our Story
          </button>
        </motion.div>
      </div>
      
      {/* Indikator scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;