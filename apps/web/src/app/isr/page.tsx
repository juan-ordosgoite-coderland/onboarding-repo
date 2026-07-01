import { MyDialog } from '@org/ui-components';

interface ApiResponse {
    timestamp: string;
    items: Array<{ id: number; title: string; status: string }>;
}

async function getIsrData(): Promise<ApiResponse> {
    try {
    const res = await fetch('http://localhost:3000/api/items', {
      next: { revalidate: 10 }, 
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (error) {
    // Datos de contingencia si la API está apagada durante el build
    return {
      timestamp: new Date().toLocaleTimeString('es-ES') + ' (Build Fallback)',
      items: [{ id: 1, title: 'Cargando tareas del monorepo...', status: 'pending' }]
    };
  }
}

export default async function IsrPage() {
    const data = await getIsrData();
    const serverRenderTime = new Date().toLocaleTimeString('es-ES');

    return (
        <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>

            {/* Indicador Visual requerido */}
            <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '8px', marginBottom: '24px', border: '1px solid #c8e6c9' }}>
                <h2>Estrategia: Incremental Static Regeneration (ISR)</h2>
                <p><strong>⏱️ Ventana de Revalidación:</strong> 10 segundos</p>
                <p><strong>🕒 Hora de los Datos (API):</strong> {data.timestamp}</p>
                <p suppressHydrationWarning>
                    <strong>⏰ Hora del Render en Servidor:</strong> {serverRenderTime}
                </p>
                <small style={{ color: '#555' }}>
                    * Los datos se recalculan en segundo plano cada 10 segundos tras un refresh.
                </small>
            </div>

            <h3>Contenido con Regeneración Incremental</h3>
            <p>Pulsa el botón de abajo para abrir el Modal:</p>

            <div suppressHydrationWarning>
                <MyDialog>
                    <MyDialog.Trigger>
                        <span style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            background: '#2e7d32',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                            Ver Resumen de Tareas
                        </span>
                    </MyDialog.Trigger>

                    <MyDialog.Portal>
                        <MyDialog.Popup>
                            <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                <MyDialog.Title>Estado del Onboarding</MyDialog.Title>

                                <ul style={{ paddingLeft: '20px', margin: '16px 0' }}>
                                    {data.items.map((item) => (
                                        <li key={item.id} style={{ marginBottom: '8px' }}>
                                            {item.title} — <strong>{item.status}</strong>
                                        </li>
                                    ))}
                                </ul>

                                <MyDialog.Close>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '6px 12px',
                                        background: 'transparent',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>
                                        Cerrar Ventana
                                    </span>
                                </MyDialog.Close>
                            </div>
                        </MyDialog.Popup>
                    </MyDialog.Portal>
                </MyDialog>
            </div>
        </main>
    );
}