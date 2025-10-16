'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk smooth scroll ke section tertentu dengan durasi yang lebih panjang
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset untuk navbar
      
      // Implementasi smooth scroll manual dengan animasi yang lebih lembut
      const start = window.pageYOffset;
      const distance = offsetTop - start;
      // Gunakan durasi yang berbeda untuk section About untuk efek yang lebih halus
      const duration = sectionId === 'about' ? 2000 : 1500; // Durasi lebih lama untuk About
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Fungsi easing yang lebih lembut (easeInOutQuart)
        const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        const easeProgress = easeInOutQuart(progress);
        
        window.scrollTo(0, start + distance * easeProgress);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="text-2xl font-bold text-amber-600 font-serif"
        >
          Aroma Coffee Co.
        </a>
        
        <div className="hidden md:flex space-x-8">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-white hover:text-amber-500 transition-colors"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-white hover:text-amber-500 transition-colors"
          >
            About
          </a>
          <a 
            href="#menu" 
            onClick={(e) => scrollToSection(e, 'menu')}
            className="text-white hover:text-amber-500 transition-colors"
          >
            Menu
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => scrollToSection(e, 'gallery')}
            className="text-white hover:text-amber-500 transition-colors"
          >
            Gallery
          </a>
          <a 
            href="#location" 
            onClick={(e) => scrollToSection(e, 'location')}
            className="text-white hover:text-amber-500 transition-colors"
          >
            Location
          </a>
        </div>
        
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition-colors">
          Order Now
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;