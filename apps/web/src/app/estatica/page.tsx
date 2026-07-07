import { MyAccordion } from '@org/ui-components';
import { cacheTag } from 'next/cache'; 
import { ONBOARDING_TASKS } from '../api/items/route';

async function getStaticPageData() {
  'use cache';
  cacheTag('tasks-cache');
  
  const items = [...ONBOARDING_TASKS];

  return {
    items,
    serverRenderTime: new Date().toLocaleTimeString('es-ES')
  };
}

export default async function EstaticaPage() {
  const { items, serverRenderTime } = await getStaticPageData();

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ padding: '16px', background: '#e0f7fa', borderRadius: '8px', marginBottom: '24px' }}>
        <h2>Estrategia: Cache Component (Static)</h2>
        <p><strong>🕒 Hora de los Datos/Render:</strong> {serverRenderTime}</p>
      </div>

      <div suppressHydrationWarning>
        <MyAccordion>
          {items.map((item) => (
            <MyAccordion.Item key={item.id} value={`item-${item.id}`}>
              <MyAccordion.Trigger>{item.title} — <strong>{item.status}</strong></MyAccordion.Trigger>
              <MyAccordion.Panel><p style={{ padding: '8px', color: '#666' }}>Recuperado directamente en Servidor.</p></MyAccordion.Panel>
            </MyAccordion.Item>
          ))}
        </MyAccordion>
      </div>
    </main>
  );
}