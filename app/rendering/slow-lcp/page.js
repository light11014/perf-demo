'use client';

import Link from 'next/link';

export default function TravelLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero - 거대한 배경 이미지 */}
      <section className="relative h-screen">
        <img 
          src="/images/hero-large.jpg"
          alt="Travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative h-full flex items-center justify-center text-white px-4">
          <div className="text-center max-w-4xl">
            <Link href="/" className="inline-block text-white/80 hover:text-white mb-8">
              ← Home
            </Link>
            <h1 className="text-7xl font-bold mb-6">
              Discover Paradise
            </h1>
            <p className="text-2xl mb-8 text-gray-100">
              Unforgettable journeys to the world's most beautiful destinations
            </p>
            <div className="space-x-4">
              <button className="bg-white text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
                Explore Destinations
              </button>
              <button className="bg-transparent border-2 border-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white/10">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Popular Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Bali, Indonesia', 'Santorini, Greece', 'Maldives'].map((dest, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src="/images/hero-large.jpg"
                    alt={dest}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-bold">{dest}</h3>
                    <p className="text-lg">Starting from $999</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Best Prices', desc: 'Guaranteed lowest rates' },
              { title: '24/7 Support', desc: 'Always here to help' },
              { title: 'Expert Guides', desc: 'Local professionals' },
              { title: 'Safe Travel', desc: 'Fully insured trips' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="text-4xl">✓</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Travel Inspiration
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-square">
                <img 
                  src="/images/hero-large.jpg"
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover rounded-lg hover:opacity-80 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Book now and save up to 30% on select destinations
          </p>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2026 Travel Paradise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
