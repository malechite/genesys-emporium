'use client';

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    // Dynamically import the store only on the client side
    // Import from the dedicated store file to avoid executing main.tsx render code
    import('@emporium/redux/store').then((mod) => {
      setStore(mod.store);
    });
  }, []);

  // Show loading state until store is initialized
  if (!store) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Initializing...
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
