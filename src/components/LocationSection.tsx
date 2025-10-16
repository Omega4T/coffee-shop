'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const LocationSection = () => {
  return (
    <section 
      id="location"
      className="py-20 bg-neutral-900 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Visit Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Find us in the heart of the city for your daily coffee fix
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-amber-400">Address</h4>
                  <p className="text-gray-300">123 Coffee Street, City Center, CC 10001</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-amber-400">Hours</h4>
                  <p className="text-gray-300">Monday-Friday: 7:00 AM - 9:00 PM</p>
                  <p className="text-gray-300">Saturday-Sunday: 8:00 AM - 10:00 PM</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-amber-400">Contact</h4>
                  <p className="text-gray-300">Phone: (123) 456-7890</p>
                  <p className="text-gray-300">Email: info@aromacoffee.co</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-bold text-amber-400 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Instagram</span>
                    <span className="text-lg">📷</span>
                  </a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Facebook</span>
                    <span className="text-lg">f</span>
                  </a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <span className="sr-only">Twitter</span>
                    <span className="text-lg">𝕏</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-gray-800 rounded-xl h-96 flex items-center justify-center shadow-2xl overflow-hidden">
              <Image
                src="/image/coffe/menu-espresso.jpg"
                alt="Coffee Shop Location"
                width={400}
                height={360}
                className="object-cover opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;