'use server';

import { revalidateTag } from 'next/cache';
import { updateTaskStatusInDB } from './api/items/route';

export async function actualizarEstadoOnboarding(formData: FormData) {
  const taskId = parseInt(formData.get('taskId') as string, 10);
  const nuevoEstado = formData.get('status') as string;

  // 1. Mutamos el estado en memoria
  updateTaskStatusInDB(taskId, nuevoEstado);

  console.log(`[Server Action] Revalidando por Tag 'tasks-cache'`);

  revalidateTag('tasks-cache', 'default');
}