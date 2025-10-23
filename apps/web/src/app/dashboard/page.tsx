'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import client from '@/lib/feathers';

interface User {
  id: number;
  email: string;
  username: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('feathers-jwt');

        console.log('Dashboard - checking auth with token:', token);

        if (!token) {
          console.log('Dashboard - no token found, redirecting to home');
          router.push('/');
          return;
        }

        // Check if token looks like a JWT (should have 3 parts separated by dots)
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.error('Dashboard - token is not a valid JWT format:', token);
          setError('Invalid token format');
          localStorage.removeItem('feathers-jwt');
          router.push('/');
          return;
        }

        console.log('Dashboard - attempting to authenticate...');

        // Authenticate with the stored token
        const auth = await client.authenticate({
          strategy: 'jwt',
          accessToken: token
        });

        console.log('Dashboard - authentication successful:', auth);

        // Get the current user from the authentication result
        setUser(auth.user);
      } catch (error) {
        console.error('Authentication failed:', error);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        localStorage.removeItem('feathers-jwt');

        // Wait a bit before redirecting so user can see error
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('feathers-jwt');
    client.logout();
    router.push('/');
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Authentication Error</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <p className="text-zinc-400 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <nav className="bg-zinc-900/50 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Genesys Emporium</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-zinc-800/50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user?.username}!</h2>
          <p className="text-zinc-300">Email: {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Characters</h3>
            <p className="text-zinc-400">Manage your Genesys characters</p>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Create New</h3>
            <p className="text-zinc-400">Create a new character</p>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800/70 transition-colors cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Settings</h3>
            <p className="text-zinc-400">Configure your preferences</p>
          </div>
        </div>
      </main>
    </div>
  );
}
