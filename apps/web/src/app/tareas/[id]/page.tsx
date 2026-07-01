import { MyAccordion } from '@org/ui-components';

interface Tarea {
  id: number;
  title: string;
  status: string;
  description: string;
}

// Simulación de una base de datos de detalles de tareas
const TASKS_DB: Record<string, Tarea> = {
  '1': { id: 1, title: 'Monorepo Setup', status: 'completed', description: 'Configuración inicial del espacio de trabajo con Nx, estructuras de carpetas de apps y modules.' },
  '2': { id: 2, title: 'UI Components', status: 'completed', description: 'Creación de componentes compuestos (Tabs, Accordion, Dialog) utilizando Base UI y pruebas unitarias con Vitest.' },
  '3': { id: 3, title: 'Rendering & Cache', status: 'in_progress', description: 'Implementación de estrategias SSG, SSR, ISR y optimización del Data Cache en Next.js.' },
};

// 1. GENERATE STATIC PARAMS 
export async function generateStaticParams() {
  // Genera estáticamente /tareas/1, /tareas/2 y /tareas/3
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TareaDinamicaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const tarea = TASKS_DB[id];
  const serverRenderTime = new Date().toLocaleTimeString('es-ES');

  // Fallback Si el ID no existe
  if (!tarea) {
    return (
      <main style={{ padding: '24px', fontFamily: 'sans-serif' }}>
        <h2>Tarea no encontrada</h2>
        <p>El ID {id} no corresponde a ninguna tarea del onboarding.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Indicador Visual del tipo de Render */}
      <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e1bee7' }}>
        <h2>Estrategia: Dynamic Route + generateStaticParams</h2>
        <p><strong>🆔 ID de la Tarea consultada:</strong> {id}</p>
        <p suppressHydrationWarning>
          <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
        </p>
        <small style={{ color: '#555' }}>
          * Los IDs 1, 2 y 3 se pre-generaron en el build. Cualquier otro ID se renderizará de forma dinámica bajo demanda.
        </small>
      </div>

      <h3>Detalle de la Tarea</h3>
      
      <div suppressHydrationWarning style={{ marginTop: '16px' }}>
        <MyAccordion>
          <MyAccordion.Item value="detalle">
            <MyAccordion.Trigger>
              {tarea.title} — <strong>{tarea.status}</strong>
            </MyAccordion.Trigger>
            <MyAccordion.Panel>
              <div style={{ padding: '12px', background: '#fafafa', borderRadius: '4px' }}>
                <p>{tarea.description}</p>
              </div>
            </MyAccordion.Panel>
          </MyAccordion.Item>
        </MyAccordion>
      </div>
    </main>
  );
}