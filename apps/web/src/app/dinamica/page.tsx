import { MyTabs } from '@org/ui-components';

//RENDERIZADO DINÁMICO (SSR)
export const dynamic = 'force-dynamic';

interface ApiResponse {
  timestamp: string;
  items: Array<{ id: number; title: string; status: string }>;
}

async function getDynamicData(): Promise<ApiResponse> {
  // cache: 'no-store', no guarda este fetch en el Data Cache
  const res = await fetch('http://localhost:3000/api/items', {
    cache: 'no-store', 
  });
  
  if (!res.ok) {
    throw new Error('Error al consultar la API dinámica');
  }
  
  return res.json();
}

export default async function DinamicaPage() {
  const data = await getDynamicData();
  const serverRenderTime = new Date().toLocaleTimeString('es-ES');

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Indicador Visual requerido con marcador de tiempo */}
      <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffe0b2' }}>
        <h2>Estrategia: Dynamic Rendering (SSR)</h2>
        <p><strong>🕒 Hora de los Datos (API):</strong> {data.timestamp}</p>
        <p suppressHydrationWarning>
          <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
        </p>
        <small style={{ color: '#555' }}>
          * Refresca con (F5).
        </small>
      </div>

      <h3>Contenido Dinámico (Fresco en cada Request)</h3>

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
    </main>
  );
}