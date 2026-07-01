import { MyAccordion } from '@org/ui-components';

interface ApiResponse {
  timestamp: string;
  items: Array<{ id: number; title: string; status: string }>;
}

async function getStaticData(): Promise<ApiResponse> {
  try {
    const res = await fetch('http://localhost:3000/api/items', {
      cache: 'force-cache', 
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    return {
      timestamp: new Date().toLocaleTimeString('es-ES') + ' (Build Fallback)',
      items: [{ id: 1, title: 'Cargando tareas del monorepo...', status: 'pending' }]
    };
  }
}

export default async function EstaticaPage() {
  const data = await getStaticData();
  
  const serverRenderTime = new Date().toLocaleTimeString('es-ES');

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      <div style={{ padding: '16px', background: '#e0f7fa', borderRadius: '8px', marginBottom: '24px' }}>
        <h2>Estrategia: Static Rendering (SSG)</h2>
        <p><strong>🕒 Hora de los Datos (API):</strong> {data.timestamp}</p>
        
        {/* Ignora  la diferencia de segundos entre servidor y cliente en el texto del reloj */}
        <p suppressHydrationWarning>
          <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
        </p>
      </div>

      <h3>Contenido renderizado desde la Caché</h3>
      <p>Despliega el Accordion de tu librería:</p>

      {/* Para evitar que los IDs aleatorios de Base UI causen conflictos en el mismatch de hidratación */}
      <div suppressHydrationWarning>
        <MyAccordion>
          {data.items.map((item) => (
            <MyAccordion.Item key={item.id} value={`item-${item.id}`}>
              <MyAccordion.Trigger>
                {item.title} — <strong>{item.status}</strong>
              </MyAccordion.Trigger>
              <MyAccordion.Panel>
                <p style={{ padding: '8px', color: '#666' }}>
                  Este contenido fue recuperado de la API simulada e indexado de forma estática.
                </p>
              </MyAccordion.Panel>
            </MyAccordion.Item>
          ))}
        </MyAccordion>
      </div>
    </main>
  );
}