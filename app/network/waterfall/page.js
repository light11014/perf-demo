'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

async function fetchSequential() {
  const userRes = await fetch('/api/user');
  const user = await userRes.json();
  
  const postsRes = await fetch('/api/posts');
  const posts = await postsRes.json();
  
  const commentsRes = await fetch('/api/comments');
  const comments = await commentsRes.json();
  
  return { user, posts, comments };
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSequential().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Total Posts</div>
            <div className="text-3xl font-bold">{data.posts.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Total Comments</div>
            <div className="text-3xl font-bold">{data.comments.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Active User</div>
            <div className="text-3xl font-bold">1</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mr-4">
              {data.user.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-lg">{data.user.name}</div>
              <div className="text-gray-600">{data.user.email}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {data.posts.map(post => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
          <div className="space-y-3">
            {data.comments.map(comment => (
              <div key={comment.id} className="flex items-start">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-medium">{comment.author}</div>
                  <div className="text-sm text-gray-600">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
