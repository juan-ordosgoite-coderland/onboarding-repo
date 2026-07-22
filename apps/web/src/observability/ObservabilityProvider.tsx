'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { initializeFaro, getWebInstrumentations, Faro } from '@grafana/faro-web-sdk';

interface ObservabilityContextValue {
  faro: Faro | null;
  isReady: boolean;
}

const ObservabilityContext = createContext<ObservabilityContextValue>({
  faro: null,
  isReady: false,
});

export function ObservabilityProvider({ children }: { children: React.ReactNode }) {
  const faroRef = useRef<Faro | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL || 'https://faro-collector-prod-us-east-3.grafana.net/collect/d1da80947250574a14fb0d3dca43de2e';
    const enabled = process.env.NEXT_PUBLIC_FARO_ENABLED !== 'false'; // Activo por defecto si hay URL

    console.log('[Faro Init Check]', { enabled, url });

    if (enabled && url && !faroRef.current) {
      try {
        faroRef.current = initializeFaro({
          url,
          app: {
            name: process.env.NEXT_PUBLIC_FARO_APP_NAME || 'masorange-onboarding-web',
            environment: process.env.NEXT_PUBLIC_FARO_APP_ENV || 'development',
          },
          instrumentations: [
            ...getWebInstrumentations(),
          ],
        });
        console.log('[Faro Initialized Successfully]');
      } catch (error) {
        console.error('[Faro Observability] Error de inicialización:', error);
      }
    }
  }, []);

  return (
    <ObservabilityContext.Provider value={{ faro: faroRef.current, isReady: !!faroRef.current }}>
      {children}
    </ObservabilityContext.Provider>
  );
}

export const useObservabilityContext = () => useContext(ObservabilityContext);