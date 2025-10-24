'use client';

import dynamic from 'next/dynamic';

// Import the App component with SSR disabled
// The character builder is client-side only and doesn't need server-side rendering
const App = dynamic(
  () => import('@emporium/app/app').then((mod) => ({ default: mod.App })),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading Character Builder...
      </div>
    )
  }
);

export default function EmporiumPage() {
  return <App />;
}
