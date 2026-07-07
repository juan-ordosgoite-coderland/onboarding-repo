import { Suspense } from 'react';
import { MyTabs } from '@org/ui-components';

interface ApiResponse {
  timestamp: string;
  items: Array<{ id: number; title: string; status: string }>;
}

async function getDynamicData(): Promise<ApiResponse> {
  try {
    const res = await fetch('http://localhost:3000/api/items');
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    return {
      timestamp: new Date().toLocaleTimeString('es-ES') + ' (Live Request)',
      items: [
        { id: 1, title: 'Monorepo Setup', status: 'completed' },
        { id: 2, title: 'UI Components', status: 'completed' },
        { id: 3, title: 'Rendering & Cache', status: 'in_progress' }
      ]
    };
  }
}

async function DynamicTasksContent() {
  const data = await getDynamicData();
  const serverRenderTime = new Date().toLocaleTimeString('es-ES');

  return (
    <>
      <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffe0b2' }}>
        <h2>Estrategia: Dynamic Rendering (SSR via Cache Components)</h2>
        <p><strong>🕒 Hora de los Datos (API):</strong> {data.timestamp}</p>
        <p suppressHydrationWarning>
          <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
        </p>
      </div>

      <h3>Contenido Dinámico (Fresco en cada Request)</h3>
      <p>Navega por las pestañas de tu librería:</p>

      <div suppressHydrationWarning>
        <MyTabs defaultValue="item-1">
          <MyTabs.List>
            {data.items.map((item) => (
              <MyTabs.Trigger key={item.id} value={`item-${item.id}`}>
                Tarea {item.id}
              </MyTabs.Trigger>
            ))}
          </MyTabs.List>

          {data.items.map((item) => (
            <MyTabs.Panel key={item.id} value={`item-${item.id}`}>
              <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
                <h4>{item.title}</h4>
                <p>Estado actual: <strong>{item.status}</strong></p>
              </div>
            </MyTabs.Panel>
          ))}
        </MyTabs>
      </div>
    </>
  );
}

export default function DinamicaPage() {
  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Suspense fallback={<div>Cargando panel dinámico asíncrono...</div>}>
        <DynamicTasksContent />
      </Suspense>
    </main>
  );
}