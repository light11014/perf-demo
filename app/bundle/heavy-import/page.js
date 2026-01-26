'use client';

import Link from 'next/link';
import _ from 'lodash';

export default function AnalyticsDashboard() {
  const salesData = [
    { month: 'Jan', sales: 4200, target: 4000 },
    { month: 'Feb', sales: 3800, target: 4000 },
    { month: 'Mar', sales: 5100, target: 4500 },
    { month: 'Apr', sales: 4600, target: 4500 },
    { month: 'May', sales: 5400, target: 5000 },
    { month: 'Jun', sales: 6200, target: 5500 }
  ];

  const totalSales = _.sumBy(salesData, 'sales');
  const avgSales = _.meanBy(salesData, 'sales');
  const maxSales = _.maxBy(salesData, 'sales');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <button className="text-sm text-blue-600">Export Report</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Total Sales</div>
            <div className="text-3xl font-bold">${totalSales.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-2">↑ 12.5% from last period</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Average Sales</div>
            <div className="text-3xl font-bold">${Math.round(avgSales).toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-2">↑ 8.3% from last period</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-2">Best Month</div>
            <div className="text-3xl font-bold">{maxSales.month}</div>
            <div className="text-sm text-gray-600 mt-2">${maxSales.sales.toLocaleString()} in sales</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-6">Monthly Performance</h2>
          <div className="space-y-4">
            {salesData.map((data) => (
              <div key={data.month}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-gray-600">${data.sales.toLocaleString()} / ${data.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${data.sales >= data.target ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${(data.sales / data.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Products</h2>
            <div className="space-y-3">
              {['Product A', 'Product B', 'Product C', 'Product D'].map((product, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{product}</span>
                  <span className="font-semibold">${(5000 - i * 500).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                'New order #1234',
                'Payment received #1233',
                'Shipment delivered #1232',
                'New customer registered'
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
