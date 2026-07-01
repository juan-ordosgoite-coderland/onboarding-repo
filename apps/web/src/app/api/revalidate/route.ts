import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json(
      { message: 'Falta el parámetro "path". Ejemplo: ?path=/estatica' },
      { status: 400 }
    );
  }

  try {
    // Purgamos la caché de la página
    revalidatePath(path);
    console.log(`[API Revalidate] Caché purgada con éxito para el path: ${path}`);
    
    return NextResponse.json({ 
      revalidated: true, 
      path, 
      now: new Date().toLocaleTimeString('es-ES') 
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al revalidar la caché', error },
      { status: 500 }
    );
  }
}