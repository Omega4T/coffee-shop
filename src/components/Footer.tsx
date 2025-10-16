'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  // Fungsi untuk smooth scroll ke section tertentu
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
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
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-amber-500 font-serif mb-4">Aroma Coffee Co.</h3>
            <p className="text-gray-400 mb-4">
              Experience the finest handcrafted coffee in town. Where every cup tells a story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="text-lg">𝕏</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a 
                href="#home" 
                onClick={(e) => scrollToSection(e, 'home')}
                className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                Home
              </a></li>
              <li><a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                About
              </a></li>
              <li><a 
                href="#menu" 
                onClick={(e) => scrollToSection(e, 'menu')}
                className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                Menu
              </a></li>
              <li><a 
                href="#gallery" 
                onClick={(e) => scrollToSection(e, 'gallery')}
                className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                Gallery
              </a></li>
              <li><a 
                href="#location" 
                onClick={(e) => scrollToSection(e, 'location')}
                className="text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                Location
              </a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday-Friday: 7:00 AM - 9:00 PM</li>
              <li>Saturday: 8:00 AM - 10:00 PM</li>
              <li>Sunday: 8:00 AM - 10:00 PM</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Coffee Street</li>
              <li>City Center, CC 10001</li>
              <li>(123) 456-7890</li>
              <li>info@aromacoffee.co</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500"
        >
          <p>© {new Date().getFullYear()} Aroma Coffee Co. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;