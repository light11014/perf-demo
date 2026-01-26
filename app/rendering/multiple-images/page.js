'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PhotoGallery() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 고정된 값으로 변경
  const images = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
    author: `Photographer ${(i % 10) + 1}`,
    likes: 100 + (i * 23) // 고정 계산식
  }));

  const gradients = [
    'from-purple-400 to-pink-600',
    'from-blue-400 to-cyan-600',
    'from-green-400 to-teal-600',
    'from-orange-400 to-red-600',
    'from-indigo-400 to-purple-600',
    'from-yellow-400 to-orange-600',
    'from-pink-400 to-rose-600',
    'from-cyan-400 to-blue-600'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold">PhotoGallery</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Explore Amazing Photos</h2>
          <p className="text-xl opacity-90">Thousands of high-quality images from talented photographers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {isClient && (
                <div 
                  className={`w-full h-64 bg-gradient-to-br ${gradients[image.id % gradients.length]}`}
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${image.id}/800/600)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              )}
              {!isClient && (
                <div className={`w-full h-64 bg-gradient-to-br ${gradients[image.id % gradients.length]}`} />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {image.author}</p>
                <div className="flex justify-between items-center">
                  <button className="text-red-500 hover:text-red-600">
                    ❤️ {image.likes}
                  </button>
                  <button className="text-blue-500 hover:text-blue-600 text-sm">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Load More Photos
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 PhotoGallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}