'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    async function load() {
      const res1 = await fetch('/api/data');
      const result1 = await res1.json();
      setProduct({ name: 'Premium Headphones', price: 299, ...result1 });
      
      const res2 = await fetch('/api/data');
      const result2 = await res2.json();
      setReviews({ count: 1247, rating: 4.8, ...result2 });
      
      const res3 = await fetch('/api/data');
      const result3 = await res3.json();
      setRecommendations({ items: 4, ...result3 });
    }
    load();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-xl font-bold">TechShop</h1>
          <div className="flex space-x-4">
            <button className="text-gray-600">Cart (0)</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="text-yellow-500 mr-2">★★★★★</div>
              <span className="text-gray-600">{reviews?.rating} ({reviews?.count} reviews)</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-6">${product.price}</div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-full bg-black border-2 border-blue-600"></button>
                <button className="w-10 h-10 rounded-full bg-white border-2 border-gray-300"></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-gray-300"></button>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 mb-4">
              Add to Cart
            </button>
            <button className="w-full border border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50">
              Add to Wishlist
            </button>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Active Noise Cancellation</li>
                  <li>• 30-hour battery life</li>
                  <li>• Premium sound quality</li>
                  <li>• Comfortable design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {recommendations && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                  <h3 className="font-semibold mb-1">Product {i}</h3>
                  <div className="text-blue-600 font-bold">$199</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
