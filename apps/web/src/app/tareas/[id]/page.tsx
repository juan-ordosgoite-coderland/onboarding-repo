import { MyAccordion } from '@org/ui-components';
import { cacheTag } from 'next/cache';

interface Tarea {
  id: number;
  title: string;
  status: string;
  description: string;
}

const TASKS_DB: Record<string, Tarea> = {
  '1': {
    id: 1,
    title: 'Monorepo Setup',
    status: 'completed',
    description:
      'Configuración inicial del espacio de trabajo con Nx, estructuras de carpetas de apps y modules.',
  },
  '2': {
    id: 2,
    title: 'UI Components',
    status: 'completed',
    description:
      'Creación de componentes compuestos (Tabs, Accordion, Dialog) utilizando Base UI y pruebas unitarias con Vitest.',
  },
  '3': {
    id: 3,
    title: 'Rendering & Cache',
    status: 'in_progress',
    description:
      'Implementación de estrategias SSG, SSR, ISR y optimización del Data Cache en Next.js.',
  },
};

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// Creamos un Cache Component específico para los detalles de la tarea
async function getTaskPageData(id: string) {
  'use cache';
  cacheTag('tasks-cache', `task-${id}`);

  const tarea = TASKS_DB[id];

  return {
    tarea,
    serverRenderTime: new Date().toLocaleTimeString('es-ES'),
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TareaDinamicaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { tarea, serverRenderTime } = await getTaskPageData(id);

  if (!tarea) {
    return (
      <main style={{ padding: '24px', fontFamily: 'sans-serif' }}>
        <h2>Tarea no encontrada</h2>
        <p>El ID {id} no corresponde a ninguna tarea del onboarding.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: '24px',
        fontFamily: 'sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          padding: '16px',
          background: '#f3e5f5',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #e1bee7',
        }}
      >
        <h2>Estrategia: Dynamic Route + Cache Components</h2>
        <p>
          <strong>🆔 ID de la Tarea consultada:</strong> {id}
        </p>
        <p suppressHydrationWarning>
          <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
        </p>
        <small style={{ color: '#555' }}>
          * Los IDs 1, 2 y 3 usan Cache Components pre-generados en el build.
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
              <div
                style={{
                  padding: '12px',
                  background: '#fafafa',
                  borderRadius: '4px',
                }}
              >
                <p>{tarea.description}</p>
              </div>
            </MyAccordion.Panel>
          </MyAccordion.Item>
        </MyAccordion>
      </div>
    </main>
  );
}
