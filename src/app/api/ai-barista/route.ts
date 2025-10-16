// src/app/api/ai-barista/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

// Data menu contoh - dalam implementasi nyata, ini akan dari database
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

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Inisialisasi Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });

    // Format data menu untuk konteks AI
    const menuContext = menuData.map(item => 
      `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Category: ${item.category}, Tags: [${item.tags.join(', ')}], Best Seller: ${item.isBestSeller ? 'Yes' : 'No'}`
    ).join('\n');

    // Prompt untuk AI
    const prompt = `
    You are an AI Barista helping customers find menu items based on their preferences.
    Here is our menu data:
    ${menuContext}
    
    Customer request: "${query}"
    
    Instructions:
    1. Analyze the customer's request carefully
    2. Find the most relevant menu items based on their preferences
    3. Respond in JSON format with an array of menu items that match their request
    4. Limit your response to maximum 6 items
    5. Only return the JSON array, nothing else
    
    Example response format:
    [
      {
        "id": 1,
        "name": "Espresso",
        "description": "Rich and bold espresso shot with a creamy crema on top",
        "price": 3.5,
        "category": "coffee",
        "tags": ["strong", "classic"],
        "isBestSeller": true
      }
    ]
    `;

    // Generate content dari Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Ekstrak JSON dari response
    // Cari bagian JSON dalam teks (karena AI mungkin menambahkan penjelasan)
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    let jsonStr = text;
    
    if (jsonStart !== -1 && jsonEnd !== 0) {
      jsonStr = text.substring(jsonStart, jsonEnd);
    }
    
    let results: MenuItem[] = [];
    try {
      results = JSON.parse(jsonStr) as MenuItem[];
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response was:', text);
      
      // Fallback ke pencarian sederhana jika parsing JSON gagal
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('not too bitter') || lowerQuery.includes('not bitter')) {
        results = menuData.filter(item => 
          item.tags.some(tag => tag.includes('smooth') || tag.includes('milky'))
        );
      } else if (lowerQuery.includes('best seller') || lowerQuery.includes('bestseller')) {
        results = menuData.filter(item => item.isBestSeller);
      } else if (lowerQuery.includes('cheap') || lowerQuery.includes('affordable') || lowerQuery.includes('inexpensive')) {
        results = menuData.filter(item => item.price < 5);
      } else if (lowerQuery.includes('fresh') || lowerQuery.includes('non-coffee') || lowerQuery.includes('without coffee')) {
        results = menuData.filter(item => item.tags.includes('refreshing') || item.category !== 'coffee');
      } else if (lowerQuery.includes('vegetarian') || lowerQuery.includes('vegan')) {
        results = menuData.filter(item => item.tags.includes('vegetarian') || item.tags.includes('vegan-option'));
      } else {
        results = [...menuData];
      }
    }

    // Batasi hasil menjadi maksimal 6 item
    const limitedResults = results.slice(0, 6);

    return NextResponse.json({ 
      menuItems: limitedResults,
      query: query,
      message: `Found ${limitedResults.length} items based on your request: "${query}"`
    });
  } catch (error) {
    console.error('Error processing AI Barista request:', error);
    
    // Fallback jika API Gemini gagal
    const { query } = await request.json();
    const lowerQuery = query.toLowerCase();
    let results: MenuItem[] = [];
    
    if (lowerQuery.includes('not too bitter') || lowerQuery.includes('not bitter')) {
      results = menuData.filter(item => 
        item.tags.some(tag => tag.includes('smooth') || tag.includes('milky'))
      );
    } else if (lowerQuery.includes('best seller') || lowerQuery.includes('bestseller')) {
      results = menuData.filter(item => item.isBestSeller);
    } else if (lowerQuery.includes('cheap') || lowerQuery.includes('affordable') || lowerQuery.includes('inexpensive')) {
      results = menuData.filter(item => item.price < 5);
    } else if (lowerQuery.includes('fresh') || lowerQuery.includes('non-coffee') || lowerQuery.includes('without coffee')) {
      results = menuData.filter(item => item.tags.includes('refreshing') || item.category !== 'coffee');
    } else if (lowerQuery.includes('vegetarian') || lowerQuery.includes('vegan')) {
      results = menuData.filter(item => item.tags.includes('vegetarian') || item.tags.includes('vegan-option'));
    } else {
      results = [...menuData];
    }
    
    const limitedResults = results.slice(0, 6);
    
    return NextResponse.json({ 
      menuItems: limitedResults,
      query: query,
      message: `Found ${limitedResults.length} items based on your request: "${query}" (fallback response due to API error)`
    });
  }
}