'use client';

import React, { JSX, useState } from 'react';
import { useFaroEvent } from '@/observability';

// Componente que provoca un error de renderizado válido para TypeScript
function BuggyComponent(): JSX.Element {
  throw new Error('💥 Error provocado en React (Probando ErrorBoundary)');
}

export default function ErrorTestPage() {
  const [showBug, setShowBug] = useState(false);
  
  const { pushEvent } = useFaroEvent();

  // 1. Error capturado manualmente
  const handleLogException = () => {
    try {
      throw new Error('⚠️ Excepción capturada manualmente en un Try/Catch');
    } catch (err) {
      console.error('[Error Manual]', err);
    }
  };

  // 2. Evento personalizado de telemetría
  const handleCustomEvent = () => {
    pushEvent('button_clicked', {
      feature: 'test_demo',
      user_action: 'testing_grafana_faro',
    });
    alert('Evento personalizado enviado a Grafana Faro 🚀');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🧪 Panel de Pruebas de Observabilidad</h1>
      <p>Usa estos botones para verificar la captura de eventos y errores en Grafana Faro:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
        
        {/* Prueba 1: Evento Custom */}
        <button
          onClick={handleCustomEvent}
          style={{ padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          1. Enviar Evento Personalizado (`pushEvent`)
        </button>

        {/* Prueba 2: Excepción Manual */}
        <button
          onClick={handleLogException}
          style={{ padding: '12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          2. Generar Excepción en Try/Catch
        </button>

        {/* Prueba 3: Crash de React (ErrorBoundary) */}
        <button
          onClick={() => setShowBug(true)}
          style={{ padding: '12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          3. Romper Componente (Probar ErrorBoundary)
        </button>

      </div>

      {/* Si se activa, monta el componente que explota */}
      {showBug && (
        <div style={{ marginTop: '20px' }}>
          <BuggyComponent />
        </div>
      )}
    </div>
  );
}