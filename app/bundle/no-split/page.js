'use client';

import Link from 'next/link';
import { useState } from 'react';

function DocumentationContent() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
      <p className="text-gray-700 mb-4">
        Welcome to our comprehensive documentation. This guide will help you get up and running quickly.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-3">Installation</h3>
      <div className="bg-gray-900 text-green-400 p-4 rounded mb-4">
        <code>npm install awesome-package</code>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-3">Quick Example</h3>
      <div className="bg-gray-900 text-gray-300 p-4 rounded mb-4 text-sm">
        <pre>{`import { Component } from 'awesome-package';

function App() {
  return <Component />;
}`}</pre>
      </div>
    </div>
  );
}

function APIReference() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold mb-4">API Reference</h2>
      <p className="text-gray-700 mb-6">
        Complete API documentation for all available methods and properties.
      </p>
      
      {['Component', 'useHook', 'Provider', 'Context'].map((item) => (
        <div key={item} className="mb-8 p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{item}</h3>
          <p className="text-gray-600 mb-4">Description of {item} and its usage.</p>
          <div className="bg-gray-50 p-3 rounded">
            <code className="text-sm">function {item}(props): JSX.Element</code>
          </div>
        </div>
      ))}
    </div>
  );
}

function Examples() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold mb-4">Examples</h2>
      <p className="text-gray-700 mb-6">
        Real-world examples to help you understand common use cases.
      </p>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Example {i}: Basic Usage</h3>
          <div className="bg-gray-900 text-gray-300 p-4 rounded text-sm">
            <pre>{`// Example code here
const result = doSomething();
console.log(result);`}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DocumentationSite() {
  const [activeTab, setActiveTab] = useState('docs');

  return (
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Home
          </Link>
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="text-blue-100 mt-2">Everything you need to know</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-2">
              <button
                onClick={() => setActiveTab('docs')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'docs' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'
                }`}
              >
                Getting Started
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'api' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'
                }`}
              >
                API Reference
              </button>
              <button
                onClick={() => setActiveTab('examples')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'examples' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'
                }`}
              >
                Examples
              </button>
            </nav>
          </aside>

          <main className="flex-1">
            {activeTab === 'docs' && <DocumentationContent />}
            {activeTab === 'api' && <APIReference />}
            {activeTab === 'examples' && <Examples />}
          </main>
        </div>
      </div>
    </div>
  );
}
