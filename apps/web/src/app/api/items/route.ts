import { NextResponse } from 'next/server';

// endpoint de la API siempre dinámico
export const dynamic = 'force-dynamic';

export async function GET() {
  // retraso de red de 100ms
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockData = {
    timestamp: new Date().toLocaleTimeString('es-ES'),
    items: [
      { id: 1, title: 'Completar Unidad 1: Monorepo Setup', status: 'completed' },
      { id: 2, title: 'Completar Unidad 2: UI Components', status: 'completed' },
      { id: 3, title: 'Completar Unidad 3: Rendering & Cache', status: 'in_progress' },
    ],
  };

  return NextResponse.json(mockData);
}