'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const GallerySection = () => {
  const galleryImages = [
    { id: 1, alt: 'Interior Coffee Shop' },
    { id: 2, alt: 'Coffee Brewing Process' },
    { id: 3, alt: 'Artisan Pastries' },
    { id: 4, alt: 'Outdoor Seating Area' },
    { id: 5, alt: 'Coffee Cup Details' },
    { id: 6, alt: 'Barista at Work' }
  ];

  // Fungsi untuk mendapatkan path gambar gallery berdasarkan ID
  const getGalleryImage = (id: number) => {
    const imageMap: { [key: number]: string } = {
      1: '/image/coffe/menu-cake.jpg',      // Interior Coffee Shop
      2: '/image/coffe/menu-espresso.jpg',  // Coffee Brewing Process
      3: '/image/coffe/menu-croissant.jpg', // Artisan Pastries
      4: '/image/coffe/menu-cappuccino.jpg', // Outdoor Seating Area
      5: '/image/coffe/menu-latte.jpg',     // Coffee Cup Details
      6: '/image/coffe/menu-matcha.jpg',    // Barista at Work
    };
    return imageMap[id] || '/image/coffe/menu-espresso.jpg'; // Default image
  };

  return (
    <section 
      id="gallery"
      className="py-20 bg-amber-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4"
          >
            Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Experience the warm and inviting atmosphere of our coffee shop
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-square overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={getGalleryImage(img.id)}
                alt={img.alt}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;