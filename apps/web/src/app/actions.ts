'use server';

import { revalidatePath } from 'next/cache';

// Simulamos una base de datos temporal en memoria del servidor para poder cambiar el estado

export async function actualizarEstadoOnboarding(formData: FormData) {
  const taskId = formData.get('taskId') as string;
  const nuevoEstado = formData.get('status') as string;

  console.log(`[Server Action] Modificando tarea ${taskId} a estado: ${nuevoEstado}`);
  
  // 1. Limpiamos la caché de la página estática
  revalidatePath('/estatica');
  
  // 2. Limpiamos la caché de la página dinámica y del ISR
  revalidatePath('/dinamica');
  revalidatePath('/isr');

}