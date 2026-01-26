import Link from 'next/link';

export default function BlogArticle() {
  return (
    <>
      {/* 10개의 폰트 로드 - FCP 확실히 느려짐 */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,700;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;600;700&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,600;0,700;1,400&display=block" />
      
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Home
            </Link>
            <h1 className="text-2xl font-bold">The Literary Blog</h1>
            <nav className="space-x-6 text-sm">
              <a href="#" className="hover:underline">Articles</a>
              <a href="#" className="hover:underline">About</a>
            </nav>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <span className="text-sm text-blue-600 uppercase tracking-wide font-semibold">
              Technology
            </span>
            <h1 className="text-6xl mt-4 mb-6 leading-tight font-bold">
              The Future of Web Performance in Modern Applications
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <span>By Jane Smith</span>
              <span className="mx-2">•</span>
              <span>January 26, 2026</span>
              <span className="mx-2">•</span>
              <span>12 min read</span>
            </div>
          </div>

          <div className="mb-12 h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg"></div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              In the ever-evolving landscape of web development, performance has become 
              a critical factor in user experience. Today, we explore the cutting-edge 
              techniques that are shaping the future of fast, responsive web applications.
            </p>

            <h2 className="text-4xl font-bold mt-12 mb-4">
              Understanding Core Web Vitals
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Core Web Vitals are a set of metrics that Google considers essential for 
              measuring user experience on the web. These metrics focus on loading 
              performance, interactivity, and visual stability.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The three key metrics are LCP (Largest Contentful Paint), FID (First Input Delay), 
              and CLS (Cumulative Layout Shift). Each plays a crucial role in how users 
              perceive and interact with your website.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded my-8 border border-blue-200">
              <blockquote className="text-2xl italic text-gray-800">
                "Performance is not just a technical metric—it's a user experience metric 
                that directly impacts business outcomes and user satisfaction."
              </blockquote>
            </div>

            <h2 className="text-4xl font-bold mt-12 mb-4">
              Optimizing for Speed
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Speed optimization isn't just about making things faster—it's about creating 
              a seamless experience that keeps users engaged and satisfied. Modern tools 
              and frameworks provide numerous ways to achieve this goal.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              From code splitting to lazy loading, from optimizing images to reducing JavaScript 
              bundle sizes, there are countless strategies that developers can employ to 
              improve their application's performance.
            </p>

            <h2 className="text-4xl font-bold mt-12 mb-4">
              The Road Ahead
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As we look to the future, emerging technologies like edge computing, 
              progressive web apps, and advanced caching strategies are set to 
              revolutionize how we think about web performance.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              The key is to stay informed, continuously test and measure, and always 
              prioritize the user experience above all else. Performance is not a 
              one-time effort, but an ongoing commitment to excellence.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                'Understanding JavaScript Performance',
                'CSS Optimization Techniques',
                'Modern Image Formats Explained'
              ].map((title, i) => (
                <div key={i} className="border rounded overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{title}</h4>
                    <p className="text-sm text-gray-600">Learn more about this topic...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}