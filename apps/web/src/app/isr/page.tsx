import { Suspense } from 'react';
import { MyDialog } from '@org/ui-components';
import { cacheLife, cacheTag } from 'next/cache'; 
import { ONBOARDING_TASKS } from '../api/items/route';

async function getIsrPageData() {
  'use cache';
  cacheLife('seconds');
  cacheTag('tasks-cache');

  const items = [...ONBOARDING_TASKS];

  return {
    items,
    serverRenderTime: new Date().toLocaleTimeString('es-ES')
  };
}

async function IsrTasksContent() {
  const { items, serverRenderTime } = await getIsrPageData();

  return (
    <>
      <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '8px', marginBottom: '24px' }}>
        <h2>Estrategia: Cache Component (ISR)</h2>
        <p><strong>🕒 Hora de los Datos/Render:</strong> {serverRenderTime}</p>
      </div>

      <div suppressHydrationWarning>
        <MyDialog>
          <MyDialog.Trigger>
            <span style={{ display: 'inline-block', padding: '10px 20px', background: '#2e7d32', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Resumen de Tareas
            </span>
          </MyDialog.Trigger>
          <MyDialog.Portal>
            <MyDialog.Popup>
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <MyDialog.Title>Estado en ISR</MyDialog.Title>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>{item.title} — <strong>{item.status}</strong></li>
                  ))}
                </ul>
                <MyDialog.Close><span style={{ cursor: 'pointer', color: 'red' }}>Cerrar</span></MyDialog.Close>
              </div>
            </MyDialog.Popup>
          </MyDialog.Portal>
        </MyDialog>
      </div>
    </>
  );
}

export default function IsrPage() {
  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Suspense fallback={<div>Cargando resumen estático asíncrono...</div>}>
        <IsrTasksContent />
      </Suspense>
    </main>
  );
}