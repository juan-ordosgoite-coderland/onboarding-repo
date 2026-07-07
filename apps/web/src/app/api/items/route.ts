import { NextResponse } from 'next/server';

export let ONBOARDING_TASKS = [
  { id: 1, title: 'Monorepo Setup', status: 'completed' },
  { id: 2, title: 'UI Components', status: 'completed' },
  { id: 3, title: 'Rendering & Cache', status: 'in_progress' },
];

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toLocaleTimeString('es-ES'),
    items: ONBOARDING_TASKS,
  });
}

// Permitimos que nuestra Server Action actualice este estado internamente
export function updateTaskStatusInDB(id: number, status: string) {
  ONBOARDING_TASKS = ONBOARDING_TASKS.map(task => 
    task.id === id ? { ...task, status } : task
  );
}