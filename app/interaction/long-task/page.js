'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function DataTablePage() {
  const data = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      amount: Math.floor(Math.random() * 10000),
      status: ['Active', 'Pending', 'Inactive'][i % 3],
      date: new Date(2026, 0, Math.floor(Math.random() * 26) + 1).toLocaleDateString()
    })),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-2xl font-bold">Customer Data</h1>
          <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded">
            Export CSV
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow mb-6 p-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-2xl font-bold">{data.length.toLocaleString()}</div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search customers..."
              className="px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${row.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        row.status === 'Active' ? 'bg-green-100 text-green-800' :
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
