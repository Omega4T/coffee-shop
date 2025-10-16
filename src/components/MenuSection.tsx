'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tipe data untuk menu item
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  isBestSeller?: boolean;
}

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<MenuItem[] | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Data menu contoh
  const menuData: MenuItem[] = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso shot with a creamy crema on top',
      price: 3.50,
      category: 'coffee',
      tags: ['strong', 'classic'],
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and a thick layer of foam',
      price: 4.25,
      category: 'coffee',
      tags: ['milky', 'balanced'],
      isBestSeller: true
    },
    {
      id: 3,
      name: 'Matcha Green Tea',
      description: 'Finely ground green tea powder whisked with hot water',
      price: 4.50,
      category: 'tea',
      tags: ['refreshing', 'non-coffee'],
      isBestSeller: true
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery, flaky pastry baked fresh daily',
      price: 3.75,
      category: 'pastry',
      tags: ['vegan-option', 'breakfast'],
      isBestSeller: true
    },
    {
      id: 5,
      name: 'Cold Brew',
      description: 'Smooth coffee concentrate steeped for 18 hours',
      price: 4.75,
      category: 'coffee',
      tags: ['smooth', 'less-acidic']
    },
    {
      id: 6,
      name: 'Avocado Toast',
      description: 'Sourdough bread topped with smashed avocado and feta',
      price: 8.25,
      category: 'food',
      tags: ['healthy', 'vegetarian']
    }
  ];

  // Kategori menu
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'tea', name: 'Tea' },
    { id: 'pastry', name: 'Pastries' },
    { id: 'food', name: 'Food' }
  ];

  // Filter menu berdasarkan kategori
  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  // Fungsi untuk mendapatkan path gambar berdasarkan nama menu
  const getMenuImage = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('espresso')) return '/image/coffe/menu-espresso.jpg';
    if (nameLower.includes('cappuccino')) return '/image/coffe/menu-cappuccino.jpg';
    if (nameLower.includes('matcha')) return '/image/coffe/menu-matcha.jpg';
    if (nameLower.includes('croissant')) return '/image/coffe/menu-croissant.jpg';
    if (nameLower.includes('latte')) return '/image/coffe/menu-latte.jpg';
    if (nameLower.includes('macchiato')) return '/image/coffe/menu-macchiato.jpg';
    if (nameLower.includes('choco')) return '/image/coffe/menu-choco.jpg';
    if (nameLower.includes('cake')) return '/image/coffe/menu-cake.jpg';
    // Default image jika tidak ditemukan
    return '/image/coffe/menu-espresso.jpg';
  };

  // AI Barista - Hubungi API backend
  const handleAiQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    
    try {
      const response = await fetch('/api/ai-barista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      setAiResponse(data.menuItems);
    } catch (error) {
      console.error('Error calling AI Barista API:', error);
      // Fallback ke data lokal jika API gagal
      const lowerQuery = aiQuery.toLowerCase();
      let results: MenuItem[] = [];
      
      if (lowerQuery.includes('not too bitter') || lowerQuery.includes('not bitter')) {
        results = menuData.filter(item => 
          item.tags.some(tag => tag.includes('smooth') || tag.includes('milky'))
        );
      } else if (lowerQuery.includes('best seller')) {
        results = menuData.filter(item => item.isBestSeller);
      } else if (lowerQuery.includes('cheap') || lowerQuery.includes('affordable')) {
        results = menuData.filter(item => item.price < 5);
      } else if (lowerQuery.includes('fresh') || lowerQuery.includes('non-coffee')) {
        results = menuData.filter(item => item.tags.includes('refreshing') || item.category !== 'coffee');
      } else {
        // Return all items if no specific match
        results = menuData;
      }
      
      setAiResponse(results);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section 
      id="menu"
      className="py-20 bg-neutral-50"
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
            Our Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our carefully curated selection of coffee, tea, and artisanal pastries
          </motion.p>
        </div>

        {/* Kategori Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full capitalize transition-colors ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Full */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Full Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={getMenuImage(item.name)}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-neutral-900">{item.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-amber-600">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.isBestSeller && (
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        Best Seller
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best Sellers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Best Sellers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuData
              .filter(item => item.isBestSeller)
              .map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <Image
                      src={getMenuImage(item.name)}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-neutral-900">{item.name}</h4>
                      <span className="text-lg font-bold text-amber-600">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* AI Barista Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Ask Our AI Barista</h3>
            <p className="text-gray-600">Get personalized recommendations based on your preferences</p>
          </div>
          
          <form onSubmit={handleAiQuery} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Try asking: 'What's not too bitter?' or 'Show me best sellers'"
                className="flex-grow px-6 py-4 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              />
              <button
                type="submit"
                disabled={isAiLoading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full transition-colors disabled:opacity-50"
              >
                {isAiLoading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
          </form>
          
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h4 className="text-xl font-bold text-neutral-900 mb-6 text-center">AI Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiResponse.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-36 bg-gray-200 relative">
                      <Image
                        src={getMenuImage(item.name)}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="font-bold text-lg text-neutral-900">{item.name}</h5>
                      <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-amber-600">${item.price.toFixed(2)}</span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;