'use client';

import { useBooleanFlag, useNumberFlag, useStringFlag } from "@/configcat";

export default function ConfigCatDemoPage() {
  // 1. Feature flags evaluados en tiempo real
  const showNewFeature = useBooleanFlag('show_new_feature', false);
  const buttonColor = useStringFlag('button_color', '#000000');
  const maxItems = useNumberFlag('max_items', 3);

  const dummyItems = Array.from({ length: maxItems }, (_, i) => `Elemento de prueba #${i + 1}`);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Unidad 5: Panel de Pruebas Feature Flags 🐱</h1>
      <p style={{ color: '#666' }}>Modifica los valores en tu dashboard de ConfigCat, publica los cambios y refresca para ver la magia.</p>
      
      <hr style={{ margin: '30px 0' }} />

      {/* Flag 1: Booleano */}
      <section style={{ marginBottom: '30px' }}>
        <h2>1. Flag Booleano (`show_new_feature`)</h2>
        <p>Estado actual: <strong>{showNewFeature ? '🟢 ACTIVADO' : '🔴 DESACTIVADO'}</strong></p>
        
        {showNewFeature ? (
          <div style={{ padding: '20px', background: '#d4edda', color: '#155724', borderRadius: '6px' }}>
            🎉 ¡Enhorabuena! Estás viendo esta funcionalidad exclusiva porque el flag está activo.
          </div>
        ) : (
          <div style={{ padding: '20px', background: '#e2e3e5', color: '#383d41', borderRadius: '6px' }}>
            La nueva funcionalidad oculta está bloqueada por el flag.
          </div>
        )}
      </section>

      {/* Flag 2: String */}
      <section style={{ marginBottom: '30px' }}>
        <h2>2. Flag de Texto (`button_color`)</h2>
        <p>Color inyectado desde la nube: <code style={{ background: '#eee', padding: '2px 6px' }}>{buttonColor}</code></p>
        <button style={{
          backgroundColor: buttonColor,
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>
          Botón Dinámico
        </button>
      </section>

      {/* Flag 3: Número */}
      <section style={{ marginBottom: '30px' }}>
        <h2>3. Flag Numérico (`max_items`)</h2>
        <p>Cantidad de elementos permitidos a renderizar: <strong>{maxItems}</strong></p>
        <ul style={{ background: '#f8f9fa', padding: '20px 40px', borderRadius: '6px' }}>
          {dummyItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}