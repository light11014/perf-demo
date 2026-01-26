'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NewsWebsite() {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // 800ms 후 이미지 로드 → CLS 발생
    setTimeout(() => setShowImages(true), 800);
  }, []);

  const articles = [
    { id: 1, title: 'Breaking: Major Technology Announcement', category: 'Technology' },
    { id: 2, title: 'Markets Reach New Heights', category: 'Business' },
    { id: 3, title: 'Climate Summit Concludes', category: 'World' },
    { id: 4, title: 'Sports Championship Results', category: 'Sports' },
    { id: 5, title: 'New Scientific Discovery', category: 'Science' },
    { id: 6, title: 'Cultural Festival This Weekend', category: 'Culture' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
            <div className="text-sm text-gray-600">Monday, January 26, 2026</div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-center">The Daily News</h1>
          <nav className="flex justify-center space-x-8 mt-4 text-sm">
            <a href="#" className="hover:underline">World</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">Technology</a>
            <a href="#" className="hover:underline">Sports</a>
            <a href="#" className="hover:underline">Culture</a>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <article className="mb-12">
              <span className="text-sm text-blue-600 font-semibold">BREAKING NEWS</span>
              <h2 className="text-4xl font-serif font-bold mt-2 mb-4">
                Technology Giants Announce Major Partnership
              </h2>
              <div className="text-sm text-gray-600 mb-6">
                By John Doe • 2 hours ago
              </div>
              
              {/* CLS 유발: 크기 미지정 → 500px 높이 차지 */}
              <div className="mb-6">
                {showImages ? (
                  <div 
                    className="w-full rounded bg-gradient-to-br from-blue-400 to-purple-500"
                    style={{ height: '500px' }}
                  />
                ) : null}
              </div>

              <div className="text-lg leading-relaxed space-y-4">
                <p>
                  In a groundbreaking announcement today, leading technology companies have revealed 
                  plans for an unprecedented collaboration that could reshape the industry landscape.
                </p>
                <p>
                  The partnership, which brings together some of the biggest names in tech, aims to 
                  develop next-generation solutions that will benefit consumers worldwide.
                </p>
                <p>
                  Industry analysts are calling this move a game-changer, with potential implications 
                  reaching far beyond the technology sector itself.
                </p>
              </div>
            </article>

            <div className="border-t pt-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Latest Stories</h3>
              <div className="space-y-6">
                {articles.map((article) => (
                  <div key={article.id} className="flex gap-4 pb-6 border-b">
                    {/* CLS 유발: 썸네일도 크기 미지정 */}
                    {showImages ? (
                      <div 
                        className="rounded bg-gradient-to-br from-green-400 to-blue-500"
                        style={{ width: '150px', height: '150px', flexShrink: 0 }}
                      />
                    ) : null}
                    <div>
                      <span className="text-xs text-blue-600 font-semibold">{article.category}</span>
                      <h4 className="text-xl font-serif font-semibold mt-1 mb-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-8 space-y-8">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="font-bold mb-4">Trending Now</h3>
                <ol className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex">
                      <span className="text-2xl font-bold text-gray-300 mr-3">{i}</span>
                      <a href="#" className="hover:underline text-sm">
                        Trending story headline about important events happening today
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="font-bold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the day's top stories delivered to your inbox every morning.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border rounded mb-2"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
