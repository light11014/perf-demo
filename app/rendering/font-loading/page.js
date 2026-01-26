'use client';

import Link from 'next/link';

export default function PortfolioSite() {
  return (
    <>
      {/* 렌더링 차단하는 폰트 - display=block (FOIT 발생) */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600;700;900&family=Crimson+Text:wght@400;600;700&family=Cinzel:wght@400;700;900&family=Bodoni+Moda:wght@400;700&display=block"
      />
      
      <div className="min-h-screen bg-black text-white">
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              ← Home
            </Link>
            <div className="space-x-8 text-sm">
              <a href="#work" className="hover:text-gray-300">Work</a>
              <a href="#about" className="hover:text-gray-300">About</a>
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </nav>

        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl text-center">
            <h1 className="text-8xl md:text-9xl font-bold mb-6">
              Creative Designer
            </h1>
            <p className="text-2xl text-gray-400 mb-8">
              Crafting beautiful digital experiences that inspire and engage audiences worldwide
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition font-semibold">
              View My Work
            </button>
          </div>
        </section>

        <section id="work" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Brand Transformation', color: 'from-purple-500 to-pink-500' },
                { name: 'Digital Experience', color: 'from-blue-500 to-cyan-500' },
                { name: 'Product Innovation', color: 'from-orange-500 to-red-500' },
                { name: 'Creative Direction', color: 'from-green-500 to-teal-500' }
              ].map((project, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-900 rounded-lg mb-4">
                    <div className={`aspect-video bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-500`}></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-400">
                    Brand Identity • Web Design • Art Direction • Strategy
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-6 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">
              About Me
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              I'm a creative designer with a passion for creating meaningful digital experiences. 
              With over 10 years of experience, I've worked with startups and global brands to 
              bring their visions to life through thoughtful design and strategic thinking.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              My approach combines strategic thinking with beautiful aesthetics to create work 
              that not only looks great but achieves real business results and connects with 
              audiences on an emotional level.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              I believe that great design is not just about making things look pretty—it's about 
              solving problems, telling stories, and creating experiences that people love.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center">
              Skills & Expertise
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'Brand Strategy',
                'Visual Design',
                'Art Direction',
                'Digital Products',
                'User Experience',
                'Creative Direction',
                'Typography',
                'Motion Design'
              ].map((skill, i) => (
                <div key={i} className="text-center p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition">
                  <h3 className="text-lg font-semibold">{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Have a project in mind? I'd love to hear about it and discuss how we can collaborate.
            </p>
            <a 
              href="mailto:hello@designer.com" 
              className="inline-block bg-white text-black px-12 py-4 rounded-full hover:bg-gray-200 transition text-lg font-semibold"
            >
              Get In Touch
            </a>
          </div>
        </section>

        <footer className="border-t border-gray-800 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-400">
            <p>© 2026 Designer Portfolio. All rights reserved.</p>
            <div className="space-x-6">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
