'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    console.log('Callback page - received token:', token);
    console.log('Callback page - received error:', errorParam);

    // Check for errors first
    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      setError(`Discord OAuth error: ${decodedError}`);
      return;
    }

    if (!token) {
      setError('No authentication token received');
      return;
    }

    // Decode the token (it was URL encoded)
    const decodedToken = decodeURIComponent(token);
    console.log('Callback page - decoded token:', decodedToken);

    // Store the token in localStorage
    localStorage.setItem('feathers-jwt', decodedToken);
    console.log('Token stored successfully, redirecting to emporium...');

    // Redirect to the emporium page immediately
    router.push('/emporium');
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-2">Authentication Error</h2>
          <p className="text-red-300">{error}</p>
          <a
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Return to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Authenticating...</h2>
        <p className="text-zinc-300">Please wait while we log you in</p>
      </div>
    </div>
  );
}
