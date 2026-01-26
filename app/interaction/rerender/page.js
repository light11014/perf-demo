'use client';

import Link from 'next/link';
import { useState } from 'react';

function expensiveCalculation(items, filters) {
  let result = 0;
  for (let i = 0; i < 50000000; i++) {
    result += i;
  }
  return items.filter(item => 
    item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.category === 'all' || item.category === filters.category)
  );
}

export default function ProductSearchPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
    price: Math.floor(Math.random() * 500) + 50
  }));

  const filteredProducts = expensiveCalculation(products, { search, category });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-2xl font-bold mt-2">Product Search</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          Found {filteredProducts.length} products
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 20).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <div className="aspect-square bg-gray-200 rounded mb-3"></div>
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="text-blue-600 font-bold">${product.price}</div>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
