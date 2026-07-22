import { ClientDemoSection } from './ClientDemoSection';
import { SsrDemoSection } from './SsrDemoSection';
import { Suspense } from 'react';

export default function ConfigCatDemoPage() {
  const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY || '';

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Unidad 5: Feature Flags (CSR vs SSR & Targeting) 🐱</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <ClientDemoSection sdkKey={sdkKey} />

        <Suspense fallback={<div>Cargando evaluación del servidor...</div>}>
          <SsrDemoSection userEmail="ana@masorange.com" />
        </Suspense>
      </div>
    </div>
  );
}