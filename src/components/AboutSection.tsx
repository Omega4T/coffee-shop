'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section 
      id="about"
      className="py-20 bg-stone-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <Image
                src="/image/coffe/menu-espresso.jpg"
                alt="About our Coffee Shop"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl object-cover w-full h-full"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-xl z-[-1]"></div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
            >
              Our Story
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 mb-6"
            >
              Founded in 2010, Aroma Coffee Co. began as a small dream in the heart of the city. What started as a modest corner shop has grown into a beloved community hub where the aroma of freshly ground beans mingles with warm conversations and the gentle hum of creativity.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              We source our beans from sustainable farms around the world, ensuring that every cup not only tastes exceptional but also supports ethical farming practices. Our baristas are artisans who take pride in their craft, creating each drink with precision and passion.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <div className="bg-amber-100 px-6 py-4 rounded-lg">
                <h3 className="font-bold text-neutral-800">Sustainable Sourcing</h3>
                <p className="text-sm text-gray-600">Ethically sourced beans</p>
              </div>
              <div className="bg-amber-100 px-6 py-4 rounded-lg">
                <h3 className="font-bold text-neutral-800">Artisan Craft</h3>
                <p className="text-sm text-gray-600">Expertly prepared drinks</p>
              </div>
              <div className="bg-amber-100 px-6 py-4 rounded-lg">
                <h3 className="font-bold text-neutral-800">Community Focus</h3>
                <p className="text-sm text-gray-600">Local gathering place</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;