import { ClientDemoSection } from './ClientDemoSection';
import { SsrDemoSection } from './SsrDemoSection';

export default function ConfigCatDemoPage() {
  const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY || '';

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Unidad 5: Feature Flags (CSR vs SSR & Targeting) 🐱</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
        <ClientDemoSection sdkKey={sdkKey} />
        <SsrDemoSection userEmail="ana@masorange.com" />
      </div>
    </div>
  );
}