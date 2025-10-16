'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

export const ParallaxSection = ({ children, offset }: { children: React.ReactNode; offset: number }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};

export const ParallaxText = ({ children, offset }: { children: React.ReactNode; offset: number }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.h1 style={{ y }} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
      {children}
    </motion.h1>
  );
};