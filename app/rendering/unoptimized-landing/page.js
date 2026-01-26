'use client';

import Link from 'next/link';

export default function UnoptimizedLandingCase() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - 큰 배경 이미지 */}
      <section className="relative h-screen">
        {/* ❌ 나쁜 예: 거대한 배경 이미지, 크기 미지정 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-large.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative h-full flex items-center justify-center text-white px-4">
          <div className="text-center max-w-4xl">
            <Link href="/" className="inline-block text-white/80 hover:text-white mb-8">
              ← Home
            </Link>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Transform Your Business
            </h1>
            <p className="text-2xl mb-8 text-gray-200">
              The all-in-one platform for modern teams
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
                Start Free Trial
              </button>
              <button className="bg-white/20 backdrop-blur px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Powerful features to help your team succeed
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Analytics', desc: 'Deep insights into your data' },
              { title: 'Automation', desc: 'Save time with smart workflows' },
              { title: 'Collaboration', desc: 'Work together seamlessly' },
              { title: 'Security', desc: 'Enterprise-grade protection' },
              { title: 'Integration', desc: 'Connect with your tools' },
              { title: 'Support', desc: '24/7 expert assistance' }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                {/* ❌ 나쁜 예: 아이콘 이미지도 큼 */}
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Loved by thousands
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Customer {i}</div>
                    <div className="text-sm text-gray-600">CEO, Company {i}</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "This platform has completely transformed how our team works. 
                  The features are incredible and the support is outstanding."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            See it in action
          </h2>
          
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  {/* ❌ 나쁜 예: 큰 스크린샷 이미지 */}
                  <img 
                    src="/images/hero-large.jpg"
                    alt={`Screenshot ${i}`}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">
                    Feature Highlight {i}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Discover how our platform can help you achieve more with less effort.
                  </p>
                  <button className="text-blue-600 font-semibold hover:underline">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Join thousands of teams already using our platform
          </p>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
