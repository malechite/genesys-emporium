'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import client from '@/lib/feathers';

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('feathers-jwt');

        if (token) {
          // Try to authenticate with the stored token
          await client.authenticate({
            strategy: 'jwt',
            accessToken: token
          });

          // If successful, redirect to dashboard
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        // Token is invalid or expired, clear it
        console.log('No valid token found, showing login');
        localStorage.removeItem('feathers-jwt');
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-zinc-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Genesys Emporium
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Character Manager for Genesys RPG
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <a
            href={`${API_URL}/oauth/discord`}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-[#5865F2] text-white rounded-lg font-semibold hover:bg-[#4752C4] transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Sign in with Discord
          </a>
        </div>

        <div className="text-sm text-zinc-400 mt-8">
          You&apos;ll be redirected to Discord to authorize access
        </div>
      </main>
    </div>
  );
}
