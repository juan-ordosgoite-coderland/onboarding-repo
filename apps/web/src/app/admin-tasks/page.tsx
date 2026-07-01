import { actualizarEstadoOnboarding } from '../actions';

export default async function AdminTasksPage() {
  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Panel de Control: Mutación con Server Actions</h2>
      
      <div style={{ padding: '24px', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #ddd' }}>
        <form action={actualizarEstadoOnboarding} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Selecciona la Tarea a Modificar:
            </label>
            <select name="taskId" style={{ padding: '8px', width: '100%', borderRadius: '4px' }}>
              <option value="1">Unidad 1: Monorepo Setup</option>
              <option value="2">Unidad 2: UI Components</option>
              <option value="3">Unidad 3: Rendering & Cache</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Nuevo Estado:
            </label>
            <select name="status" style={{ padding: '8px', width: '100%', borderRadius: '4px' }}>
              <option value="completed">Completado (completed)</option>
              <option value="in_progress">En Progreso (in_progress)</option>
              <option value="pending">Pendiente (pending)</option>
            </select>
          </div>

          <button 
            type="submit" 
            style={{ 
              padding: '12px', 
              background: '#0070f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            Ejecutar Server Action & Purgar Caché
          </button>
        </form>
      </div>
    </main>
  );
}