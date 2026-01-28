'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

// 상품 재고 확인 함수 (외부 API 시뮬레이션)
function checkInventoryStatus(productId, allProducts) {
  // 실제로는 API 호출이어야 하지만, 로컬에서 "확인" 로직 수행
  // 모든 상품을 순회하며 관련 재고 정보 계산 (비효율적)
  let totalRelatedStock = 0;

  allProducts.forEach(product => {
    // 같은 카테고리 상품들의 재고 합산
    if (product.category === allProducts.find(p => p.id === productId)?.category) {
      // 가상의 재고 계산 (복잡한 로직)
      const baseStock = 100 - (product.id % 50);
      const seasonalFactor = Math.sin(product.id * 0.1) * 20;
      const demandFactor = Math.log(product.price + 1) * 5;
      totalRelatedStock += baseStock + seasonalFactor + demandFactor;
    }
  });

  return totalRelatedStock > 500 ? 'In Stock' : 'Low Stock';
}

// 할인가 계산 (복잡한 가격 정책)
function calculateDiscountedPrice(product, allProducts) {
  let discount = 0;

  // 카테고리별 기본 할인율
  const categoryDiscounts = {
    'Electronics': 0.05,
    'Clothing': 0.15,
    'Books': 0.10,
    'Home': 0.08
  };

  discount += categoryDiscounts[product.category] || 0;

  // 가격대별 추가 할인 (비효율적인 조건 체크)
  allProducts.forEach(p => {
    if (p.id === product.id) {
      if (p.price > 400) discount += 0.05;
      if (p.price > 300) discount += 0.03;
      if (p.price > 200) discount += 0.02;
      if (p.price > 100) discount += 0.01;
    }
  });

  // 경쟁 상품 가격 분석 (불필요한 순회)
  const sameCategory = allProducts.filter(p => p.category === product.category);
  const avgPrice = sameCategory.reduce((sum, p) => sum + p.price, 0) / sameCategory.length;

  if (product.price > avgPrice) {
    discount += 0.02; // 평균보다 비싸면 추가 할인
  }

  return Math.round(product.price * (1 - discount));
}

// 상품 추천 점수 계산
function calculateRecommendationScore(product, cart, allProducts) {
  let score = 0;

  // 기본 인기도 점수
  score += Math.random() * 100;

  // 장바구니 상품과의 연관성 분석
  cart.forEach(cartItem => {
    // 같은 카테고리면 점수 추가
    if (cartItem.category === product.category) {
      score += 30;
    }

    // 가격대가 비슷하면 점수 추가
    const priceDiff = Math.abs(cartItem.price - product.price);
    if (priceDiff < 50) score += 20;
    if (priceDiff < 100) score += 10;

    // 모든 상품과의 관계 분석 (비효율적)
    allProducts.forEach(p => {
      if (p.category === cartItem.category && p.id !== product.id) {
        score += 1;
      }
    });
  });

  return score;
}

// 검색 결과 랭킹 함수
function rankSearchResults(products, searchTerm, cart) {
  if (!searchTerm) return products;

  // 각 상품에 대해 복잡한 점수 계산
  const scoredProducts = products.map(product => {
    let relevance = 0;

    // 이름 매칭 점수
    const nameLower = product.name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    if (nameLower === searchLower) relevance += 1000;
    if (nameLower.startsWith(searchLower)) relevance += 500;
    if (nameLower.includes(searchLower)) relevance += 100;

    // 각 글자별 매칭 (비효율적)
    for (let i = 0; i < searchLower.length; i++) {
      for (let j = 0; j < nameLower.length; j++) {
        if (searchLower[i] === nameLower[j]) {
          relevance += 1;
        }
      }
    }

    // 추천 점수 추가
    relevance += calculateRecommendationScore(product, cart, products);

    return { ...product, relevance };
  });

  // 정렬
  return scoredProducts.sort((a, b) => b.relevance - a.relevance);
}

// 분석 데이터 수집 함수
function collectAnalyticsData(action, product, allProducts) {
  const analytics = {
    action,
    timestamp: Date.now(),
    productId: product?.id,
    productCategory: product?.category,
  };

  // 세션 컨텍스트 수집 (불필요한 계산)
  analytics.sessionContext = {
    totalProducts: allProducts.length,
    categoryBreakdown: {},
    priceRanges: {}
  };

  // 카테고리별 집계
  allProducts.forEach(p => {
    if (!analytics.sessionContext.categoryBreakdown[p.category]) {
      analytics.sessionContext.categoryBreakdown[p.category] = 0;
    }
    analytics.sessionContext.categoryBreakdown[p.category]++;

    // 가격 범위별 집계
    const priceRange = Math.floor(p.price / 100) * 100;
    const rangeKey = `${priceRange}-${priceRange + 99}`;
    if (!analytics.sessionContext.priceRanges[rangeKey]) {
      analytics.sessionContext.priceRanges[rangeKey] = 0;
    }
    analytics.sessionContext.priceRanges[rangeKey]++;
  });

  // JSON 직렬화로 데이터 검증 (불필요)
  JSON.parse(JSON.stringify(analytics));

  return analytics;
}

export default function ProductSearchPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  // 상품 데이터 생성 (500개 - N² 연산으로 INP 600~700ms)
  const products = useMemo(() => Array.from({ length: 500 }, (_, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
    price: Math.floor(Math.random() * 500) + 50
  })), []);

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const value = e.target.value;

    // 검색 분석 데이터 수집
    collectAnalyticsData('search', null, products);

    // 검색어 정규화 및 검증
    const normalizedValue = value
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .split('')
      .map(char => char.charCodeAt(0) < 128 ? char : '')
      .join('');

    // 신입 개발자 실수: "검색할 때 미리 할인가 계산해두면 빠르겠지?"
    // 실제로는 불필요한 사전 계산으로 INP 발생
    products.forEach(p => {
      calculateDiscountedPrice(p, products);
      checkInventoryStatus(p.id, products);
    });

    setSearch(value);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;

    // 카테고리 변경 분석
    collectAnalyticsData('category_change', null, products);

    // 해당 카테고리 상품들의 재고 상태 미리 확인 (불필요한 사전 로딩)
    products
      .filter(p => newCategory === 'all' || p.category === newCategory)
      .forEach(p => checkInventoryStatus(p.id, products));

    setCategory(newCategory);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;

    // 정렬 변경 분석
    collectAnalyticsData('sort_change', null, products);

    // 정렬 미리보기 계산 (사용하지 않음)
    const previewSort = [...products].sort((a, b) => {
      if (newSortBy === 'price-low') return a.price - b.price;
      if (newSortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    // 정렬 결과 검증 (불필요)
    previewSort.forEach((p, i) => {
      if (i > 0) {
        const prev = previewSort[i - 1];
        if (newSortBy === 'price-low' && p.price < prev.price) {
          console.warn('Sort validation failed');
        }
      }
    });

    setSortBy(newSortBy);
  };

  // 장바구니 추가 핸들러
  const handleAddToCart = (product) => {
    // 장바구니 추가 분석
    collectAnalyticsData('add_to_cart', product, products);

    // 재고 확인
    const stockStatus = checkInventoryStatus(product.id, products);

    // 할인가 계산
    const discountedPrice = calculateDiscountedPrice(product, products);

    // 신입 개발자 실수: "장바구니 추가하면 모든 상품 가격이 바뀔 수 있으니 미리 다 계산해두자"
    products.forEach(p => {
      calculateDiscountedPrice(p, products);
      checkInventoryStatus(p.id, products);
      // 추천 점수도 미리 계산
      calculateRecommendationScore(p, [...cart, product], products);
    });

    // 장바구니에 추가
    setCart(prev => [...prev, { ...product, discountedPrice, stockStatus }]);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  // 필터링된 상품 목록
  const filteredProducts = useMemo(() => {
    let result = products;

    // 카테고리 필터링
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // 검색어 필터링 및 랭킹
    if (search) {
      result = rankSearchResults(result, search, cart);
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 각 상품에 대해 추가 정보 계산
    result = result.map(p => ({
      ...p,
      discountedPrice: calculateDiscountedPrice(p, products),
      stockStatus: checkInventoryStatus(p.id, products)
    }));

    // 정렬 적용
    return result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, search, category, sortBy, cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
            <h1 className="text-2xl font-bold mt-2">Product Search</h1>
          </div>
          <div className="flex items-center gap-4">
            {notification && (
              <span className="text-green-600 text-sm animate-pulse">{notification}</span>
            )}
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Cart: {cart.length} items
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                id="product-search-input"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                id="category-select"
                value={category}
                onChange={handleCategoryChange}
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
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
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
              <div className="aspect-square bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-400">
                {product.category}
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">{product.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${product.stockStatus === 'In Stock'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {product.stockStatus}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-600 font-bold">${product.discountedPrice}</span>
                {product.discountedPrice < product.price && (
                  <span className="text-gray-400 text-sm line-through">${product.price}</span>
                )}
              </div>
              <button
                id={`add-to-cart-btn-${product.id}`}
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 active:bg-blue-800"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
